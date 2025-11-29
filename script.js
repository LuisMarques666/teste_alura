
document.addEventListener("DOMContentLoaded", loadTasks);


function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText) {
    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";  
    displayTasks();        
  }
}


function loadTasks() {
  displayTasks();
}


function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";  

  const tasks = getTasksFromStorage();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-200 rounded p-2";

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = task.completed ? "line-through text-gray-500" : "text-gray-700";

    
    taskText.addEventListener("click", () => toggleComplete(index));

    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.className = "text-blue-500 hover:underline";
    editBtn.onclick = () => editTask(index);

    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.className = "text-red-500 hover:underline ml-2";
    deleteBtn.onclick = () => deleteTask(index);

    
    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}


function toggleComplete(index) {
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}


function editTask(index) {
  const tasks = getTasksFromStorage();
  const newTaskText = prompt("Edite a tarefa:", tasks[index].text);

  if (newTaskText) {
    tasks[index].text = newTaskText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }
}


function deleteTask(index) {
  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);  
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}


function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
