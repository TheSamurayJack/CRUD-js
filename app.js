function showData() {
  let tasks;
  // --> Recuperacion || Inicializacion del LocalStorage
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let html = "";
  if (tasks.length === 0) {
    html = `
            <div class="alert alert-warning text-center" role="alert">
                No hay tareas agregadas
            </div>
        `;
  } else {
    tasks.forEach((element, index) => {
      html += `
            <li class="flex items-center justify-between m-0 w-full px-20 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">${element.task}
            <div>
                <button onclick='editData("${index}")' class='text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700'>Edit</button>
                <button onclick='deleteData("${index}")' class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
            </div>
            </li>
            `;
    });
  }

  document.querySelector("#appData").innerHTML = html;
}

function addData() {
  let task = document.getElementById("task").value;
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push({
    task: task,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // recarga la pagina
  showData();
  task.value = "";
}

function deleteData(index) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showData();
}

function editData(index) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  taskInput = document.getElementById("task");
  taskInput.value = tasks[index].task;

  document.getElementById("btnGuardar").classList.add("hidden")
  let editButton = document.getElementById("btnEdit");
  editButton.classList.remove("hidden");
  editButton.onclick = function () {
    editButton.classList.add("hidden");
    tasks[index].task = taskInput.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showData();
    taskInput.value = "";
  };
}

document.onload = showData();
