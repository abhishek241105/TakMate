
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

console.log("TaskMate JavaScript is connected!");

// Fetch and display all tasks

async function fetchTasks() {

    try {

        const response = await fetch("/api/todos");

        const todos = await response.json();

        taskList.innerHTML = "";

        todos.forEach(todo => {
            displayTask(todo);
        });

    } catch (error) {

        console.log("Error fetching tasks:", error);

    }

}

// Display a task

function displayTask(todo) {

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const taskText = document.createElement("span");
    taskText.textContent = todo.task;
    taskText.style.textDecoration = todo.completed ? "line-through" : "none";

    // Edit button

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", async function() {

        const updatedTask = prompt("Enter updated task:", todo.task);

        if (updatedTask === null || updatedTask.trim() === "") {
            return;
        }

        try {

            const response = await fetch(`/api/todos/${todo._id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    task: updatedTask.trim()
                })

            });

            const updatedTodo = await response.json();

            if (response.ok) {

                taskText.textContent = updatedTodo.task;

                todo.task = updatedTodo.task;

            } else {

                alert("Task could not be updated!");

            }

        } catch (error) {

            console.log("Error updating task:", error);

        }

    });

    // Mark task as completed or pending

    checkbox.addEventListener("change", async function() {

        try {

            const response = await fetch(`/api/todos/${todo._id}/completed`, {

                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    completed: checkbox.checked
                })

            });

            if (response.ok) {
                todo.completed = checkbox.checked;
                taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
            }

        } catch (error) {

            console.log("Error updating task status:", error);

        }

    });

    // Delete button

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", async function() {

        try {

            const response = await fetch(`/api/todos/${todo._id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                li.remove();
            }

        } catch (error) {

            console.log("Error deleting task:", error);

        }

    });

    // Add elements to task list

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

}

// Add a new task

async function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    try {

        const response = await fetch("/api/todos", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ task: task })

        });

        const savedTodo = await response.json();

        if (response.ok) {

            displayTask(savedTodo);

            taskInput.value = "";

        } else {

            alert("Task could not be added!");

        }

    } catch (error) {

        console.log("Error adding task:", error);

    }

}

// Button click event

addTaskBtn.addEventListener("click", addTask);

// Enter key event

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Load existing tasks when page opens

fetchTasks();
