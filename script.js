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


form.addEventListener("submit", AddTodoElement )
bigGrid.addEventListener("click", ifChecked)
checkAll.addEventListener("click", function() {
    checkALL()
    checkCounter++
})

all.addEventListener("click", showAll)

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
        }

        deleteButton.innerText = "X";

        todoDiv.appendChild(checkBox);
        todoDiv.appendChild(listItem);
        todoDiv.appendChild(deleteButton);
        bigGrid.appendChild(todoDiv);

        todoDiv.style.display = "flex";

        deleteButton.addEventListener("click", function () {
            removeTodoElement(i);
        });

        todoDiv.addEventListener("mouseout", function () {
            deleteButton.style.display = "none";
        });

        todoDiv.addEventListener("mouseover", function () {
            deleteButton.style.display = "flex";
        });

        checkBox.addEventListener("change", function () {
            inputList[i].checked = checkBox.checked;
            ifChecked();
        });
    }

    displayBtns();
}

function removeTodoElement(index) {
    inputList.splice(index, 1);
    createTodoElement();
    displayBtns();
}

active.addEventListener("click", activeItems);

function displayBtns() {
    let allTodo = document.querySelectorAll("#allTodos");
    if (inputList.length > 0) {
        allTodo[0].style.display = "flex";
    }
}

function ifChecked() {

    let checked = document.querySelectorAll("input[type=checkbox]:checked");
    let unchecked = document.querySelectorAll("input[type=checkbox]:not(:checked)");

    for (let i = 0; i < checked.length; i++) {
        checked[i].nextElementSibling.style.textDecoration = "line-through";
    }

    for (let i = 0; i < unchecked.length; i++) {
        unchecked[i].nextElementSibling.style.textDecoration = "none";
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

    ifChecked()
}

function activeItems() {
    let todoDivs = document.querySelectorAll("#bigGrid div");

    for (let i = 0; i < inputList.length; i++) {
        if (inputList[i].checked) {
            todoDivs[i].style.display = "none";
        }
    }
}

function showAll() {
    let todoDivs = document.querySelectorAll("#bigGrid div");

    for (let i = 0; i < inputList.length; i++) {
        todoDivs[i].style.display = "flex";
    }
}
