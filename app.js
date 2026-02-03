let db = null;

// Step 1: Set up the database
async function setupDatabase() {
try {

const SQL = await initSqlJs({
locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
});

db = new SQL.Database();

// Create a table for tasks
db.run(`CREATE TABLE tasks (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT
)`);

document.getElementById('status').textContent = "✅ Ready to use!";
showAllTasks();
} catch (error) {
document.getElementById("status").textContent = "❌ Error loading database";
console.error(error);
}
}

// Step 2: Add a new task
function addTask() {
const input = document.getElementById(&#39;taskInput&#39;);
const taskName = input.value.trim();

if (taskName === "") {
alert("Please enter a task!");
return;
}

db.run("INSERT INTO tasks (name) VALUES (?)", [taskName]);
input.value = "";

showAllTasks();
}

// Step 3: Show all tasks
function showAllTasks() {
const results = db.exec("SELECT * FROM tasks");
const taskList = document.getElementById("taskList");

if (results.length === 0 || results[0].values.length === 0) {
taskList.innerHTML = "<li>No tasks yet. Add one above!</li>";
return;
}

const tasks = results[0].values;
let html = "";

tasks.forEach(task => {
html += `<li>✓ ${task[1]}</li>`;
});

taskList.innerHTML = html;
}

// Step 4: Register the service worker (makes app work offline)
if ("serviceWorker" in navigator) {
navigator.serviceWorker.register("/sw.js")
.then(() => console.log("Service Worker registered!"))
.catch(err => console.log("Service Worker failed:", err));
}

// Step 5: Set up button click
document.getElementById("addBtn").addEventListener("click", addTask);

// Allow Enter key to add task
document.getElementById("taskInput").addEventListener("keypress", (e) => {
if (e.key === "Enter") addTask();
});

// Start the database when page loads
setupDatabase();
