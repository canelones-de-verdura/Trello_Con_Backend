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

// Lógica para el modal y agregar tareas
const addTaskButton = document.getElementById("add-task");
const modal = document.querySelector(".modal");
const cancelModalButton = modal.querySelector(".delete");
const acceptModalButton = modal.querySelector(".is-success");
const backlogColumn = document.getElementById("backlog");

// Mostrar el modal
addTaskButton.addEventListener("click", () => {
    modal.classList.add("is-active");
});

// Ocultar el modal
cancelModalButton.addEventListener("click", () => {
    modal.classList.remove("is-active");
});

modal.querySelector(".modal-background").addEventListener("click", () => {
    modal.classList.remove("is-active");
});

// Crear y agregar la nueva tarea
acceptModalButton.addEventListener("click", () => {
    const title = modal.querySelector("input").value;
    const description = modal.querySelectorAll("input")[1].value;

    const taskDiv = document.createElement("div");
    taskDiv.className = "tarea box has-background-info";
    taskDiv.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
    
    backlogColumn.appendChild(taskDiv);

    // Limpiar y cerrar el modal
    modal.querySelectorAll("input").forEach(input => input.value = "");
    modal.classList.remove("is-active");
});