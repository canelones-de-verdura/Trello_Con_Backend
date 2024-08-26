/***
 * SUJETO A CAMBIOS
 * Crea una tarjeta nueva y la agrega en la columna del backlog.
 */
function new_task(titulo, desc, asignado, prioridad, fecha_limite) {
    const task_template = `
        <div class="card" draggable="true">
            <header class="card-header">
                <p class="card-header-title"></p>
                <div class="card-header-icon">
                    <span class="material-symbols-outlined">task_alt</span>
                </div>
            </header>
            <div class="card-content">
                <div class="content">
                </div>
            </div>
        </div>
    `;
    
    // insertamos tarjeta vacía
    const backlogColumn = document.getElementById("backlog");
    backlogColumn.innerHTML += task_template;

    // recuperamos la tarjeta recién creada
    const task_list = backlogColumn.getElementsByClassName("card"); 
    const task = task_list[task_list.length-1];

    const title_field = task.querySelector(".card-header-title");
    const text_field = task.querySelector(".content");

    // agregamos texto
    title_field.innerHTML = `<strong>${titulo}</strong>`
    text_field.innerHTML = `<p>${desc}</p>`;

    backlogColumn.appendChild(task);
}
