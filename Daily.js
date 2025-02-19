let TaskInput = document.getElementById('main-task');
let TimeInput = document.getElementById('main-time');
let TaskList = document.getElementById('TaskList');

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    displayCurrentDate();
});

function AddTask() {
    let Task = TaskInput.value.trim();
    let Time = TimeInput.value.trim();

    if (Task.length === 0 || Time.length === 0) {
        alert('Enter the task and time!');
        return;
    }

    let newRow = TaskList.insertRow();
    let checkBoxCell = newRow.insertCell();
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    checkBox.addEventListener('change', function () {
        if (this.checked) {
            deleteTask(Task, Time, newRow);
        }
    });
    checkBoxCell.appendChild(checkBox);

    let TaskCell = newRow.insertCell();
    TaskCell.textContent = Task;

    let TimeCell = newRow.insertCell();
    TimeCell.textContent = Time;

    saveTaskToLocalStorage(Task, Time);

    TaskInput.value = '';
    TimeInput.value = '';
}

function saveTaskToLocalStorage(task, time) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, time });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        let newRow = TaskList.insertRow();
        let checkBoxCell = newRow.insertCell();
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        checkBox.addEventListener('change', function () {
            if (this.checked) {
                deleteTask(task.task, task.time, newRow);
            }
        });
        checkBoxCell.appendChild(checkBox);

        let TaskCell = newRow.insertCell();
        TaskCell.textContent = task.task;

        let TimeCell = newRow.insertCell();
        TimeCell.textContent = task.time;
    });
}

function deleteTask(task, time, row) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => !(t.task === task && t.time === time));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    row.remove();
}

function displayCurrentDate() {
    let dateElement = document.getElementById('new-Date');
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    dateElement.textContent = formattedDate;
}