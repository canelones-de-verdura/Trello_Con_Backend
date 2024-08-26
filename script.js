// Cambiar entre modo claro y oscuro
const theme_switch_button = document.getElementById("theme-switcher");
theme_switch_button.addEventListener("click", () => {
    // Cambiar tema en el HTML
    document.getElementsByTagName("html")[0].classList.toggle("theme-dark");

    // Cambiar el ícono del botón
    const iconSpan = theme_switch_button.querySelector("span");
    const icon = iconSpan.innerText;
    iconSpan.innerText = (icon === "dark_mode") ? "light_mode" : "dark_mode";
});

// Obtener referencias a los elementos del DOM
const exit_modal = document.getElementsByClassName("modal-background")[0];
exit_modal.addEventListener("click", () => {
    document.getElementsByClassName("modal")[0].classList.remove("is-active");
});


// Lógica para el modal y agregar tareas
const addTaskButton = document.getElementById("add-task");
const modal = document.querySelector(".modal");
const cancelModalButton = modal.querySelector(".delete");
const acceptModalButton = modal.querySelector(".is-success");
const backlogColumn = document.getElementById("backlog");

// Mostrar el modal cuando se haga clic en "Agregar tarea"
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

    const title = modal.querySelector("input[type='text']").value;
    const description = modal.querySelectorAll("input[type='text']")[1].value;

    // Crear un nuevo div para la tarea
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("tarea", "box", "has-background-info");
    taskDiv.setAttribute("draggable", "true");

    // Asignar un ID único a la tarea
    const uniqueId = 'task-' + new Date().getTime();
    taskDiv.setAttribute("id", uniqueId);

    // Añadir eventos de arrastrar y soltar a la tarea, es necesario que sea cuando son creados porque sino no lo toma
    taskDiv.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        taskDiv.classList.add('dragging');
    });

    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('dragging');
    });

    // Añadir el título y la descripción a la tarea
    taskDiv.innerHTML = `<strong>${title}</strong><p>${description}</p>`;

    // Añadir la tarea a la columna de Backlog

    backlogColumn.appendChild(taskDiv);

    // Limpiar y cerrar el modal
    modal.querySelectorAll("input").forEach(input => input.value = "");
    modal.classList.remove("is-active");

});

