document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const savedTasks = getCookie("tasks");
    if (savedTasks) {
        document.getElementById("ft_list").innerHTML = savedTasks;
    }
}

function createTask() {
    var divList = document.getElementById('ft_list');
    var newTask = document.createElement("div");
    var newtext = prompt("Enter new TODO", "wash the dishes");
    if (newtext != null && newtext != "") {
        newTask.classList.add("task");
        newTask.innerText = newtext;
        newTask.addEventListener("click", function () {
            const confirmRemove = confirm("Do you want to remove this task?");
            if (confirmRemove) {
                removeTask(newTask); 
            }
        });
        divList.insertBefore(newTask, divList.firstChild);
        saveTasks(); 
    }
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toUTCString();
    console.log(document.cookie);
}

function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(part => part.trim());
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function saveTasks() {
    const ftList = document.getElementById("ft_list");
    setCookie("tasks", ftList.innerHTML, 365);
}

function removeTask(task) {
    task.remove(); 
    saveTasks(); 
}

function clearTasksCookie() {
    document.cookie = "tasks=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
}
