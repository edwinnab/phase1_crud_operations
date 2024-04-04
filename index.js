/*
CRUD 
Update ---- PUT/PATCH /resource/id
Delete --- DELETE /resource/id 
*/
let baseUrl = 'http://localhost:3000'
//1. select the form 
let form = document.querySelector(".m-4")
// attach the event to the form 
form.addEventListener('submit', handleSubmit)

//create request ---REST APIS (http method, status code, /endpoints)
// POST /products 
function handleSubmit(e) {
    e.preventDefault()
    let formData = {
        name: e.target.name.value,
        description: e.target.desc.value,
        image: e.target.image.value,
        price: e.target.price.value

    }
    console.log(formData)
    e.target.reset()
    fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        } else {
            throw new Error("Failed to create a resource!!")
        }
    })
    .then(data =>{
        addItem(data)
    })
    .catch(err => console.error({
        "Error": err
    }))
}


//Read request
// GET /products 
function getProducts() {
    fetch(`${baseUrl}/products`)
    .then(res => {
        if(res.ok) {
            return res.json()
        } else {
            throw new Error("Failed to fetch resource")
        }
    })
    .then(data => {
        //array iteration 
        data.map((item) => {
            addItem(item)
        })
    })
}
getProducts()


function addItem(product) {
    //identify the element to attach the specific item form the database
    let listItem = document.querySelector("#item-list")
    //create the card 
    let card = document.createElement('li')
    card.className = "card col-2 m-2"
    card.innerHTML = `
        <img src="${product.image}" class="card-img-top mt-2" alt="${product.name}">
        <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}<span style="font-weight: bold">Ksh: ${product.price}</span></p>
        <button class="btn m-2" id="update">Edit</a>
        <button class="btn" id="delete">Delete</a>
        </div>
    `
    //append it to the actual html element 
    listItem.append(card)

    //select the delete button 
    let deleteBtn = card.querySelector('#delete')
    //attach an event 
    deleteBtn.addEventListener('click', (e) => {
        fetch(`${baseUrl}/products/${product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                alert("deleted successfully!!")
            }
        })
        e.target.parentNode.parentNode.remove()
    })

}


//edit 
//click 
// populate the form 











