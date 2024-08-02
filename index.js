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

    clearInputFieldEl()                                     //Make input clear

})

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.entries(snapshot.val())

         clearShoppingListEl()                              //added so that the list didn't repeat items
    
         for (let i = 0; i < itemsArray.length; i++){            //created a for loop 
         let currentItem = itemsArray[i]

         let currentItemID = currentItem[0]                   
         let currentItemValue = currentItem[1]
       
         addItemToShoppingListEl(currentItem) 
    }

})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""  
}



function clearInputFieldEl(){                     //added so that text input clears
    inputFieldEl.value = ""  
}

function addItemToShoppingListEl(item) {
        let itemID = item[0]                         //replaced with create item.
        let itemValue = item[1]
        let newEl = document.createElement("li")
        newEl.textContent = itemValue
        shoppingListEl.append(newEl)
}


