let userInput = document.querySelector("#userInput")
let form = document.querySelector("form")
let bigGrid = document.querySelector("#bigGrid")
let inputList = []
let label = document.querySelector("label")
let checkAll = document.querySelector("#checkAll")

form.addEventListener("submit", AddTodoElement )
bigGrid.addEventListener("click", removeTodoElement)
bigGrid.addEventListener("click", ifChecked)
checkAll.addEventListener("click", checkALL)

function AddTodoElement(event) {
    event.preventDefault()
    inputList.push(userInput.value)

    userInput.value=""

    createTodoElement()
}

function createTodoElement() {
    bigGrid.innerText = ""
    for (let i = 0; i < inputList.length; i++)
    {
        let todoDiv = document.createElement("div")
        let listItem = document.createElement("p")
        let checkBox  = document.createElement("input")
        let deleteButton = document.createElement("button");

        
        checkBox.type = "checkbox";
        listItem.innerText = inputList[i]
        deleteButton.innerText = "Delete";


        todoDiv.appendChild(checkBox)
        todoDiv.appendChild(listItem)
        todoDiv.appendChild(deleteButton);
        
        bigGrid.appendChild(todoDiv)
        
        deleteButton.addEventListener("click", function () {
            removeTodoElement(i);
        });

        // Add event listener to show/hide delete button on hover
        todoDiv.addEventListener("mouseover", function () {
            deleteButton.style.display = "inline-block";
        });

        todoDiv.addEventListener("mouseout", function () {
            deleteButton.style.display = "none";
        });
    }   
}

function removeTodoElement(index) {
    inputList.splice(index, 1);
    createTodoElement();
}

function ifChecked(){
    let checked = document.querySelectorAll("input[type=checkbox]:checked")
    for (let i = 0; i < checked.length; i++)
    {
        checked[i].nextElementSibling.style.textDecoration = "line-through"
    }
    let unchecked = document.querySelectorAll("input[type=checkbox]:not(:checked)")
    for (let i = 0; i < unchecked.length; i++)
    {
        unchecked[i].nextElementSibling.style.textDecoration = "none"
    }
}

function checkALL() {
    let allCheckBoxes = document.querySelectorAll("input[type=checkbox]")
    for (let i = 0; i < allCheckBoxes.length; i++)
    {
        allCheckBoxes[i].checked = true
    }
    ifChecked()
    checkAll.removeEventListener("click", checkALL)
    checkAll.addEventListener("click", uncheckAll)
}
function uncheckAll() {
    let allCheckBoxes = document.querySelectorAll("input[type=checkbox]")
    for (let i = 0; i < allCheckBoxes.length; i++)
    {
        allCheckBoxes[i].checked = false
    }
    ifChecked()
    checkAll.removeEventListener("click", uncheckAll)
    checkAll.addEventListener("click", checkALL)
}