const column_categories = ["Backlog", "To Do", "In Progress", "Blocked", "Done"];
const url = "http://localhost:3000/api/tasks"

// Recuperamos elementos
const theme_switch = document.getElementById("theme_switcher_btn");
const add_task_btn = document.getElementById("add_task_btn");
const menu = new taskMenu(document.getElementById("task-menu"));
const dashboard = new taskDashboard(document.getElementById("task-dashboard"), url, menu);

// Configuración inicial
dashboard.setColumns(column_categories);
dashboard.getTasks(); // Recuperamos las tareas del sv

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
});
