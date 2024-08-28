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

    // AGREGAR TARJETA A COLUMNA
    //dashboard.columns[new_task.priority].placeCard(new_task);

    // Agregamos el listener en la tarjeta nueva
    new_task.element.addEventListener("click", () => menu.spawn(new_task));
});