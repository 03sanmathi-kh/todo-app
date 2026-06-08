const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    taskCount.textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;
    completedCount.textContent = completed;
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
            <span class="task-text ${task.completed ? "completed" : ""}">
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

    updateStats();
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
        "Edit Task",
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

    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    renderTasks();
}

function clearAllTasks() {

    if (tasks.length === 0) return;

    if (confirm("Delete all tasks?")) {
        tasks = [];
        renderTasks();
    }
}

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
