const API_BASE_URL = "http://localhost:5000";

// Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      document.getElementById("message").textContent =
        data.message || data.error;
    } catch (err) {
      console.error("Error during registration:", err);
    }
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "tasks.html";
      } else {
        document.getElementById("message").textContent = data.error;
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  });
}

// Tasks
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
if (taskForm) {
  const token = localStorage.getItem("token");

  // Load tasks
  const loadTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tasks = await response.json();
      taskList.innerHTML = tasks
        .map(
          (task) => `
            <li>
                <strong>${task.title}</strong> - ${task.priority}
                <p>${task.description}</p>
                <small>Deadline: ${new Date(
                  task.deadline
                ).toLocaleDateString()}</small>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            </li>
        `
        )
        .join("");
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  loadTasks();

  // Add task
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, deadline, priority }),
      });

      if (response.ok) {
        loadTasks();
        taskForm.reset();
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  });

  // Delete task
  window.deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        loadTasks();
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };
}
