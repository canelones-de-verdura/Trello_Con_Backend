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

// Modal
/*
const add_task = document.getElementById("add-task");
add_task.addEventListener("click", () => {
    document.getElementsByClassName("modal")[0].classList.add("is-active");
});

const exit_modal = document.getElementsByClassName("modal-background")[0];
exit_modal.addEventListener("click", () => {
    document.getElementsByClassName("modal")[0].classList.remove("is-active");
});
*/

// Obtener referencias a los elementos del DOM
const addTaskButton = document.getElementById("add-task");
const modal = document.getElementsByClassName("modal")[0];
const cancelModalButton = modal.querySelector(".delete");
const acceptModalButton = modal.querySelector(".is-success");
const backlogColumn = document.getElementById("backlog");

// Mostrar el modal cuando se haga clic en "agregar tarea"
addTaskButton.addEventListener("click", () => {
    modal.classList.add("is-active");
});

// Ocultar el modal al hacer clic en cancelar o fuera del modal
cancelModalButton.addEventListener("click", () => {
    modal.classList.remove("is-active");
});

modal.querySelector(".modal-background").addEventListener("click", () => {
    modal.classList.remove("is-active");
});

// Crear y agregar la nueva tarea cuando se haga clic en "Aceptar"
acceptModalButton.addEventListener("click", () => {
    const title = modal.querySelector("input[type='text']").value;
    const description = modal.querySelectorAll("input[type='text']")[1].value;
    
    // Crear un nuevo div para la tarea
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("tarea", "box", "has-background-info");
    
    // Añadir el título y la descripción a la tarea
    taskDiv.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
    
    // Añadir la tarea a la columna de Backlog
    backlogColumn.appendChild(taskDiv);

    /*
    // Limpiar y cerrar el modal
    modal.querySelectorAll("input[type='text']").forEach(input => input.value = "");
    modal.classList.remove("is-active");
    */
});
