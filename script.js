// Cambiar modo claro / modo oscuro
const theme_switch = document.getElementById("theme-switcher");
theme_switch.addEventListener("click", () => {
    // Cambiamos tema
    document.getElementsByTagName("html")[0].classList.toggle("theme-dark");

    // Cambiamos ícono
    const icon = theme_switch.getElementsByTagName("span")[0].innerText;
    if (icon == "dark_mode")
        theme_switch.getElementsByTagName("span")[0].innerText = "light_mode";
    else
        theme_switch.getElementsByTagName("span")[0].innerText = "dark_mode";

    // Esto es para el .css viejo
    // document.getElementsByTagName("html")[0].classList.toggle("dark-theme");
});


// Lógica para el modal y agregar tareas
const addTaskButton = document.getElementById("add-task");
const modal = document.querySelector(".modal");
const cancelModalButton = modal.querySelector(".delete");
const acceptModalButton = modal.querySelector(".is-success");
const backlogColumn = document.getElementById("backlog");
let currentTask = null; // Variable para guardar la tarea que se está editando. Cuando esta en "null" es porque se esta creando una tarea nueva.

// Mostrar el modal
addTaskButton.addEventListener("click", () => {
    modal.classList.add("is-active");
    clearModalFields(); //Limpia los campos del modal para que no queden datos de tareas anteriores cuando se añade una nueva.
    currentTask = null; //Cuando se agrega una tarea no se edita ninguna de las que ya existe. 
});

// Ocultar el modal
//Este codigo hace que cuando se haga click en el modal, se cierre el modal y todos los campos que hay adentro de el, volviendo al estado inicial.
cancelModalButton.addEventListener("click", () => {
    modal.classList.remove("is-active");
    clearModalFields();
});
/*
modal.querySelector(".modal-background").addEventListener("click", () => {
    modal.classList.remove("is-active");
    clearModalFields();
});
*/

// Crear y agregar la nueva tarea
acceptModalButton.addEventListener("click", () => {
    const titulo = modal.querySelectorAll("input")[0].value;
    const descripcion = modal.querySelectorAll("input")[1].value;
    const asignado = modal.querySelectorAll("input")[2].value;
    const prioridad = modal.querySelectorAll("input")[3].value;
    const estado = modal.querySelectorAll("input")[4].value;
    const fechaLimite = modal.querySelectorAll("input")[5].value;

    if (currentTask) {
        // Si estamos editando una tarea existente
        currentTask.querySelector(".task-titulo").innerText = titulo;
        currentTask.querySelector(".task-descripcion").innerText = descripcion;
        currentTask.querySelector(".task-asignado").innerText = asignado;
        currentTask.querySelector(".task-prioridad").innerText = prioridad;
        currentTask.querySelector(".task-estado").innerText = estado;
        currentTask.querySelector(".task-fecha-limite").innerText = fechaLimite;

        /*
        se usan clases para seleccionar los elementos específicos dentro de currentTask. 
        Esto es más fiable porque no depende del orden o del tipo de elemento, sino de la 
        clase asignada a cada uno. Así, el código es más claro y menos propenso a errores.
        */

    } else {
        // Si estamos creando una nueva tarea
        const taskDiv = document.createElement("div");
        taskDiv.className = "tarea box has-background-info";
        taskDiv.innerHTML = `
            <strong>${titulo}</strong>
            <p>${descripcion}</p>
            `;

        // Añadir evento de click para editar
        taskDiv.addEventListener("click", () => editTask(taskDiv));

        backlogColumn.appendChild(taskDiv);
    }

    modal.classList.remove("is-active");
    clearModalFields();
});

// Función para editar una tarea existente
function editTask(taskDiv) {
    modal.classList.add("is-active");
    currentTask = taskDiv; // Guardar la tarea que estamos editando

    // Rellenar los campos del modal con la información de la tarea
    modal.querySelectorAll("input")[0].value = taskDiv.querySelector(".task-titulo").innerText;
    modal.querySelectorAll("input")[1].value = taskDiv.querySelector(".task-descripcion").innerText;
}

// Función para limpiar los campos del modal
function clearModalFields() {
    modal.querySelectorAll("input").forEach(input => input.value = "");
}