const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
    taskCount.textContent = tasks.length;
}

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<li class="empty">No tasks added yet.</li>';
    }

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div class="actions">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button
                    class="edit-btn"
                    onclick="editTask(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateCount();
    saveTasks();
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();
}

function editTask(index) {

    const updatedTask = prompt(
        "Edit your task:",
        tasks[index].text
    );

    if (
        updatedTask !== null &&
        updatedTask.trim() !== ""
    ) {
        tasks[index].text = updatedTask.trim();
        renderTasks();
    }
}

function deleteTask(index) {

    tasks.splice(index, 1);

    renderTasks();
}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    renderTasks();
}

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
