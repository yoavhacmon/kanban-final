const tasksObj = {
    "todo": [],
    "in-progress": [],
    "done": []
}

function addToToDoList() {
    if (document.getElementById("add-to-do-task").value == "") {
        alert("write somthing...")
        return
    }
    let list = document.getElementById("to-do-tasks-list");
    let newEl = document.createElement("li");
    const taskToAdd = document.getElementById("add-to-do-task").value;
    newEl.textContent = taskToAdd;
    newEl.setAttribute("id", "task")
    newEl.classList.add("task");
    newEl.setAttribute("tabindex", "-1")
    newEl.addEventListener("dblclick", editTask) //edit event
    newEl.addEventListener("mouseover", focusOnElement) // moving list event (alt + 1/2/3)
    list.append(newEl);

}
document.getElementById("submit-add-to-do").addEventListener("click", addToToDoList)

function addToInProgressList() {
    if (document.getElementById("add-in-progress-task").value == "") {
        alert("write somthing...")
        return
    }
    let list = document.getElementById("in-progress-tasks-list");
    let newEl = document.createElement("li");
    const taskToAdd = document.getElementById("add-in-progress-task").value;
    newEl.textContent = taskToAdd
    newEl.setAttribute("id", "task")
    newEl.classList.add("task");
    newEl.setAttribute("tabindex", "-1")
    newEl.addEventListener("mouseover", focusOnElement) // moving list event (alt + 1/2/3)
    newEl.addEventListener("dblclick", editTask)  //edit event
    list.append(newEl);

}
document.getElementById("submit-add-in-progress").addEventListener("click", addToInProgressList)

function addToDoneList() {
    if (document.getElementById("add-done-task").value == "") {
        alert("write somthing...")
        return
    }
    let list = document.getElementById("done-tasks-list");
    let newEl = document.createElement("li");
    const taskToAdd = document.getElementById("add-done-task").value;
    newEl.textContent = taskToAdd
    newEl.setAttribute("id", "task")
    newEl.classList.add("task");
    newEl.setAttribute("tabindex", "-1")
    newEl.addEventListener("mouseover", focusOnElement) // moving list event (alt + 1/2/3)
    newEl.addEventListener("dblclick", editTask)  //edit event
    list.append(newEl);
}
document.getElementById("submit-add-done").addEventListener("click", addToDoneList)




let saving = setInterval(function saveTasksInLocalStorage() {
    tasksObj["todo"].splice(0);
    tasksObj["in-progress"].splice(0);
    tasksObj["done"].splice(0);

    let allTasks = document.getElementsByClassName("task");
    for (task of allTasks) {
        if (task.parentElement.id === "to-do-tasks-list") {
            let taskText = task.innerText
            tasksObj["todo"].unshift(taskText)
        }
        if (task.parentElement.id === "in-progress-tasks-list") {
            let taskText = task.innerText
            tasksObj["in-progress"].unshift(taskText)
        }
        if (task.parentElement.id === "done-tasks-list") {
            let taskText = task.innerText
            tasksObj["done"].unshift(taskText)
        }

    }
    const strTasks = JSON.stringify(tasksObj);
    localStorage.setItem("tasks", strTasks);
}, 500);


function stopSaving() {
    clearInterval(saving)
}

document.getElementById("dont-save-button").addEventListener("click", stopSaving)

function loadTasksFromLocalStorage() {
    let toDoList = document.getElementById("to-do-tasks-list");
    while (toDoList.firstChild) {
        toDoList.removeChild(toDoList.lastChild);
    }
    let inProgressList = document.getElementById("in-progress-tasks-list");
    while (inProgressList.firstChild) {
        inProgressList.removeChild(inProgressList.lastChild);
    }
    let doneList = document.getElementById("done-tasks-list");
    while (doneList.firstChild) {
        doneList.removeChild(doneList.lastChild);
    }
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < savedTasks["todo"].length; i++) {
        let newEl = document.createElement("li");
        const taskToAdd = savedTasks["todo"][i];
        newEl.textContent = taskToAdd;
        newEl.setAttribute("id", "task")
        newEl.classList.add("task");
        newEl.setAttribute("tabindex", "-1")
        newEl.addEventListener("dblclick", editTask) //edit event
        newEl.addEventListener("mouseover", focusOnElement) // moving list event (alt + 1/2/3)
        toDoList.append(newEl);


    }
    for (let i = 0; i < savedTasks["in-progress"].length; i++) {
        let newEl = document.createElement("li");
        const taskToAdd = savedTasks["in-progress"][i];
        newEl.textContent = taskToAdd;
        newEl.setAttribute("id", "task")
        newEl.classList.add("task");
        newEl.setAttribute("tabindex", "-1")
        newEl.addEventListener("dblclick", editTask) //edit event
        newEl.addEventListener("mouseover", focusOnElement) // moving list event (alt + 1/2/3)
        inProgressList.append(newEl);

    }
    for (let i = 0; i < savedTasks["done"].length; i++) {
        let newEl = document.createElement("li");
        const taskToAdd = savedTasks["done"][i];
        newEl.textContent = taskToAdd;
        newEl.setAttribute("id", "task")
        newEl.classList.add("task");
        newEl.setAttribute("tabindex", "-1")
        newEl.addEventListener("dblclick", editTask) //edit event
        newEl.addEventListener("mouseover", focusOnElement) // moving list event (alt + 1/2/3)
        doneList.append(newEl);
    }
}

window.onload = loadTasksFromLocalStorage();
//edit function:

function editTask() {
    const val = this.innerHTML;
    const input = document.createElement("input");
    input.value = val;
    input.onblur = function () {
        const val = this.value;
        this.parentNode.innerHTML = val;
    }
    this.innerHTML = "";
    this.appendChild(input);
    input.focus();
    if (val == "") {
        this.removeChild(input)
    }

}

//moving list function:

function focusOnElement(event) {
    const eventEl = event.target;
    eventEl.focus()
    eventEl.addEventListener("keydown", moveList)
}

function moveList(event) {
    const el = event.target

    if (event.altKey && event.key === '1') {
        el.parentElement.removeChild(el);
        document.getElementById("to-do-tasks-list").appendChild(el);
    }
    if (event.altKey && event.key === '2') {
        el.parentElement.removeChild(el);
        document.getElementById("in-progress-tasks-list").appendChild(el);
    }
    if (event.altKey && event.key === '3') {
        el.parentElement.removeChild(el);
        document.getElementById("done-tasks-list").appendChild(el);
    }

    return
}

//search function:

function searchTask() {
    let input = document.getElementById("search").value.toUpperCase();
    let allTasks = document.getElementsByClassName("task");
    for (task of allTasks) {
        let textTask = task.innerText
        let upperCaseTask = textTask.toUpperCase()
        if (upperCaseTask.includes(input)) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    }
}

//clear lists functions:
function clearToDoList(){
    let toDoList = document.getElementById("to-do-tasks-list");
    while (toDoList.firstChild) {
        toDoList.removeChild(toDoList.lastChild);
    }
}
document.getElementById("clear-to-do").addEventListener("click", clearToDoList)

function clearInPrograssList(){
    let inProgressList = document.getElementById("in-progress-tasks-list");
    while (inProgressList.firstChild) {
        inProgressList.removeChild(inProgressList.lastChild);
    }   
}
document.getElementById("clear-in-progress").addEventListener("click", clearInPrograssList)

function clearDoneList(){
    let doneList = document.getElementById("done-tasks-list");
    while (doneList.firstChild) {
        doneList.removeChild(doneList.lastChild);
    }   
}
document.getElementById("clear-done").addEventListener("click", clearDoneList)

//clear all function:
function clearLocalStorage() {
    let toDoList = document.getElementById("to-do-tasks-list");
    while (toDoList.firstChild) {
        toDoList.removeChild(toDoList.lastChild);
    }
    let inProgressList = document.getElementById("in-progress-tasks-list");
    while (inProgressList.firstChild) {
        inProgressList.removeChild(inProgressList.lastChild);
    }
    let doneList = document.getElementById("done-tasks-list");
    while (doneList.firstChild) {
        doneList.removeChild(doneList.lastChild);
    }
    localStorage.clear()
}
document.getElementById("clear").addEventListener("click", clearLocalStorage);




