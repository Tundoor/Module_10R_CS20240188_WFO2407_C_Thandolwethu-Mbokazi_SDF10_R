import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"  //linked database

const appSettings = {
    databaseURL: "https://game-b4cc1-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)      //link to database 
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")   //Anything written in input field is console logged
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()//Make input clear

})

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val())
    shoppingListEl.innerHTML = ""                 //added so that the list didnt repeat items
    for (let i = 0; i < itemsArray.length; i++){   //created a for loop 
        addItemToShoppingListEl(itemsArray[i]) 
    }

})



function clearInputFieldEl(){
    inputFieldEl.value = ""  
}

function addItemToShoppingListEl(itemValue) {
     shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

