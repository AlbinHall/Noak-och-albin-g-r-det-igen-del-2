let userInput = document.querySelector("#userInput")
let form = document.querySelector("form")
let bigGrid = document.querySelector("#bigGrid")
let inputList = []
let label = document.querySelector("label")

form.addEventListener("submit", AddTodoElement )

function showOrHideLabel() {
    label.style.display = inputList.length > 0 ? "inline-block" : "none"
}

function showOrHideTasks() {
    bigGrid.style.display = bigGrid.style.display === "none" || bigGrid.style.display === "" ? "block" : "none"
}

label.addEventListener("click", showOrHideTasks)

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
        checkBox.type = "checkbox";
        listItem.innerText = inputList[i]

        todoDiv.appendChild(checkBox)
        todoDiv.appendChild(listItem)
        bigGrid.appendChild(todoDiv)
    }
    
}


