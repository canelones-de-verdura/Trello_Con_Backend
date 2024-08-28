// Recuperamos elementos
const dashboard = new taskDashboard(document.getElementById("task-dashboard"));
const menu = new taskMenu(document.getElementById("task-menu"));
const theme_switch = document.getElementById("theme_switcher_btn");
const add_task_btn = document.getElementById("add_task_btn");

dashboard.createColumns(["Backlog", "To-Do", "In Progress", "Blocked", "Done"]);
dashboard.setColumns();

// Eventos
theme_switch.addEventListener("click", () => {
    // Cambiar tema en el HTML
    document.getElementsByTagName("html")[0].classList.toggle("theme-dark");

    // Cambiar el ícono del botón
    const iconSpan = theme_switch.querySelector("span");
    iconSpan.innerText = (iconSpan.innerText === "dark_mode") ? "light_mode" : "dark_mode";
});

add_task_btn.addEventListener("click", () => {
    const new_task = new taskCard();
    menu.spawn(new_task, dashboard); // Rellenamos la tarea

<<<<<<< HEAD
// Modal
const add_task = document.getElementById("add-task");
add_task.addEventListener("click", () => {
    document.getElementsByClassName("modal")[0].classList.add("is-active");
=======
    // AGREGAR TARJETA A COLUMNA
    //dashboard.columns[new_task.priority].placeCard(new_task);

    // Agregamos el listener en la tarjeta nueva
    new_task.element.addEventListener("click", () => menu.spawn(new_task));
>>>>>>> b4a64723aaf1ed58a6571c5768cc44e93b8eed1f
});

// Cerrar el modal al hacer clic en el fondo
const exit_modal = document.getElementsByClassName("modal-background")[0];
exit_modal.addEventListener("click", closeModal);

// Cerrar el modal al hacer clic en el botón (x)
const close_button = document.getElementsByClassName("delete")[0];
close_button.addEventListener("click", closeModal)

<<<<<<< HEAD


function closeModal() {
    document.getElementsByClassName("modal")[0].classList.remove("is-active");
    clearform();
=======
function closeModal() {
  document.getElementsByClassName("modal")[0].classList.remove("is-active");
>>>>>>> b4a64723aaf1ed58a6571c5768cc44e93b8eed1f
}

// Cerrar el modal al hacer clic en el botón cancelar
const cancel_button = document.getElementById("cancel-button");
cancel_button.addEventListener("click", closeModal);

function clearform() {
<<<<<<< HEAD
    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("asignado").value = "";
    document.getElementById("prioridad").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("fecha limite").value = "";
=======
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("asignado").value = "";
  document.getElementById("prioridad").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("fecha limite").value = "";
>>>>>>> b4a64723aaf1ed58a6571c5768cc44e93b8eed1f
}