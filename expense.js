const form = document.querySelector("form")
form.addEventListener("submit",e =>{
    if(!form.checkValidity()){
        e.preventDefault()
    }
    form.classList.add('was-validated')
})

const amountInput =document.querySelector("#expense")
const description =document.querySelector("#description") 
const category =document.querySelector("#category")
const date = document.querySelector('#date') 
const userList = document.getElementById('users');


function showRegistered(){
    let ul = document.querySelector("#users")
    
    ul.innerHTML=""
    Object.keys(localStorage).forEach((key) => {
      stringfiedDetailsOfpeople = localStorage.getItem(key);
      detailsOfPeople = JSON.parse(stringfiedDetailsOfpeople)
      var newItem = `${detailsOfPeople.date} ₹ ${detailsOfPeople.amount} Description: ${detailsOfPeople.description} Category:${detailsOfPeople.category} `;
      var li = document.createElement('li')
     
      li.className = 'itemList';
      
      li.appendChild(document.createTextNode(newItem))
      //delete button 
      let deleteBtn = document.createElement('button')
       deleteBtn.className ='btn btn-danger btn-sm float-right delete'
       deleteBtn.appendChild(document.createTextNode('X')) //add text to button
       li.appendChild(deleteBtn)
       deleteBtn.addEventListener('click',(e)=>{removeItem(key,e)}) //ananamous arrow function
       
        userList.appendChild(li)
        
         
   //edit button
            let editBtn = document.createElement('button')
            editBtn.className = 'btn btn-warning btn btn-sm float-right delete'
            editBtn.appendChild(document.createTextNode('edit'))
            li.appendChild(editBtn)
            editBtn.addEventListener('click',(e)=>{edit(key,e)})
    })
    total()
  }
  showRegistered()
  form.addEventListener('submit',onSubmit)
  userList.addEventListener('click',removeItem)
  userList.addEventListener('click',edit)
  
  function onSubmit(e){
    e.preventDefault()
    if(description.value === ""){
        alert("Please Enter All Fields")
    }else{
        const userDetails = {
            date: date.value,
            amount : amountInput.value,
            description: description.value,
            category:category.value
        }
        userDetails_toString = JSON.stringify(userDetails)
        localStorage.setItem(description.value,userDetails_toString)
      showRegistered()

    // Clear fields
    amountInput.value = '';
    date.value = '';
    description.value = "";
    category.value='';
    total()
    }
  }


function total(){
         let totalExpense=0;
        Object.keys(localStorage).forEach((key) => {
        stringfiedDetailsOfpeople = localStorage.getItem(key);
        detailsOfPeople = JSON.parse(stringfiedDetailsOfpeople)
        totalExpense+=parseInt(detailsOfPeople.amount)
        })
// Change element content
    let span = document.getElementById("span")
    span.textContent = `Total Expense is:₹ ${totalExpense}/-`
}

function removeItem(key,e){
   // e.preventDefault()
    localStorage.removeItem(key) 
   
   if(key.target.classList.contains('delete')){
     
        var li = key.target.parentElement;
         userList.removeChild(li)   
     }
     total()
 }
function edit(key,e){
    e.preventDefault()
     
        let data = localStorage.getItem(`${key}`)
        let dataNew = JSON.parse(data)
        document.getElementById('description').value = dataNew.description
        document.getElementById('date').value = dataNew.date
        document.getElementById('expense').value = dataNew.amount
        document.getElementById('category').value = dataNew.category
        total()
        removeItem(key,e)
}