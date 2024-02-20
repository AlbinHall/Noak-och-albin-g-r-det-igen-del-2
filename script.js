let userInput = document.querySelector("#userInput")
let form = document.querySelector("form")
let bigGrid = document.querySelector("#bigGrid")
let inputList = []
let label = document.querySelector("label")
let checkAll = document.querySelector("#checkAll")
let all = document.querySelector("#all")
let active = document.querySelector("#active")
let completed = document.querySelector("#completed")
let checkCounter = 0
let itemsLeft = document.querySelector("#itemsLeft")


form.addEventListener("submit", AddTodoElement )
checkAll.addEventListener("click", function() {
    checkALL()
    checkCounter++
})

all.addEventListener("click", showAll)
completed.addEventListener("click", completedItems)

function AddTodoElement(event) {
    event.preventDefault()
    inputList.push({ text: userInput.value, checked: false })

    userInput.value=""

    createTodoElement()
}

function createTodoElement() {
    bigGrid.innerHTML = ""; 

    for (let i = 0; i < inputList.length; i++) {
        let todoDiv = document.createElement("div");
        let listItem = document.createElement("p");
        let checkBox = document.createElement("input");
        let deleteButton = document.createElement("button");

        checkBox.type = "checkbox";
        checkBox.checked = inputList[i].checked;
        listItem.innerText = inputList[i].text;

        if (inputList[i].checked) {
            listItem.style.textDecoration = "line-through";
            listItem.style.color = "grey";
        }

        deleteButton.innerText = "X";

        todoDiv.appendChild(checkBox);
        todoDiv.appendChild(listItem);
        todoDiv.appendChild(deleteButton);
        bigGrid.appendChild(todoDiv);
        let allActiveComplete = document.querySelector("#allTodos")
        allActiveComplete.style.display = "flex"

        todoDiv.classList.add("todoItemDiv")

        listItem.classList.add("todoListItem")

        checkBox.classList.add("todoCheckBox")

        deleteButton.classList.add("todoDeleteButton")

        


        deleteButton.addEventListener("click", function () {
            removeTodoElement(i);
        });

        checkBox.addEventListener("change", function () {
            inputList[i].checked = checkBox.checked;
            if (inputList[i].checked) {
                listItem.style.textDecoration = "line-through";
                listItem.style.color = "grey";
                
            } else {
                listItem.style.textDecoration = "none";
                listItem.style.color = "black";
            }
            itemCounter();
        });
    }
    displayBtns();
    itemCounter();
}

function itemCounter() {
    let counter = inputList.length;
    for(let i = 0; i < inputList.length; i++){
        if(inputList[i].checked){
            counter--;
        }
    }
    if (inputList.length > 1) {
        itemsLeft.innerText = counter + " items left"

    }
    if (counter === 1) {
        itemsLeft.innerText = counter + " item left"
    }
}


function removeTodoElement(index) {
    inputList.splice(index, 1);
    createTodoElement();
    displayBtns();
}

active.addEventListener("click", activeItems);

function displayBtns() {
    let allTodo = document.querySelectorAll("#allTodos");
    let check = document.querySelectorAll("#checkAll");
    if (inputList.length > 0) {
        allTodo[0].style.display = "flex";
        check[0].style.visibility = "visible";
    }
    else {
        allTodo[0].style.display = "none";
        check[0].style.visibility = "hidden";
    }
}

function checkALL() {
    for (let i = 0; i < inputList.length; i++)
    {
        if (checkCounter % 2 === 0) {
            inputList[i].checked = true
        }
        else {
            inputList[i].checked = false
        }
    }
    createTodoElement()
}

function activeItems() {
    let todoDivs = document.querySelectorAll("#bigGrid div");

    for (let i = 0; i < inputList.length; i++) {
        if (inputList[i].checked) {
            todoDivs[i].style.display = "none";
        }
        else {
            todoDivs[i].style.display = "flex";
        }
    }
}

function showAll() {
    let todoDivs = document.querySelectorAll("#bigGrid div");

    for (let i = 0; i < inputList.length; i++) {
        todoDivs[i].style.display = "flex";
    }
}

function completedItems() {
    let todoDivs = document.querySelectorAll("#bigGrid div");

    for (let i = 0; i < inputList.length; i++) {
        if (inputList[i].checked) {
            todoDivs[i].style.display = "flex";
        }
        else {
            todoDivs[i].style.display = "none";
        }
    }
}
