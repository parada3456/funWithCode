$(document).ready(function () {
    loadTasks();

    function loadTasks() {
        const savedTasks = getCookie("tasks");
        if (savedTasks) {
            $("#ft_list").html(savedTasks);
        }
    }
});

function createTask() {
    var newtext = prompt("Enter new TODO", "wash the dishes");
    if (newtext != null && newtext != "") {
        var newTask = $("<div class='task'></div>").text(newtext);
        newTask.click(function () {
            const confirmRemove = confirm("Do you want to remove this task?");
            if (confirmRemove) {
                removeTask($(this));
            }
        });
        $("#ft_list").prepend(newTask);
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
    const ftList = $("#ft_list").html();
    setCookie("tasks", ftList, 365);
}

function removeTask(task) {
    task.remove();
    saveTasks();
}

function clearTasksCookie() {
    document.cookie = "tasks=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
}
