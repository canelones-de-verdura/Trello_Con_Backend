/***
 * SUJETO A CAMBIOS
 * Agrega el cuerpo a un modal, lo muestra
 * y deja al doc "escuchando" las acciones
 * del usuario.
 */
function spawn_modal(task) {
    const modal_template = `
        <div class="modal-background" id="background" ></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title"></p>
            </header>
            <section class="modal-card-body">
                <div class="block is-flex is-flex-direction-row is-justify-content-space-around">
                    <div class="block is-flex is-flex-direction-column">
                        <p>Título</p>
                        <input type="text" />
                    </div>
                    <div class="block is-flex is-flex-direction-column">
                        <p>Descripción</p>
                        <input type="text" />
                    </div>
                </div>

                <div class="block is-flex is-flex-direction-row is-justify-content-space-around">
                    <div class="block is-flex is-flex-direction-column">
                        <p>Asignado</p>
                        <input type="text" />
                    </div>
                    <div class="block is-flex is-flex-direction-column">
                        <p>Prioridad</p>
                        <input type="text" />
                    </div>
                </div>

                <div class="block is-flex is-flex-direction-row is-justify-content-space-around">
                    <div class="block is-flex is-flex-direction-column">
                        <p>Estado</p>
                        <input type="text" />
                    </div>
                    <div class="block is-flex is-flex-direction-column">
                        <p>Fecha límite</p>
                        <input type="text" />
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button cancel">Cancelar</button>
                    <button class="button is-success">Aceptar</button>
                </div>
            </footer>
        </div>
    `;

    const modal = document.getElementById("task-menu");
    modal.innerHTML = modal_template;
    return modal;
}

/***
 * SUJETO A CAMBIOS
 * Dado un modal ya creado, recupera sus elementos,
 * configura los eventos para "escuchar" y lo muestra.
 *
 * @param div necesariamente debe ser el que devuelve spawn_modal().
 * @param task si null, crea una nueva
 */
function setup_modal(modal, task) {
    // Recuperamos elementos del doc

    const modal_background = document.getElementById("background");
    const acceptModalButton = modal.querySelector(".is-success");
    const cancelModalButton = modal.querySelector(".cancel");

    // Configuramos eventos
    modal_background.addEventListener("click", () => {
        modal.classList.remove("is-active");
    });

    cancelModalButton.addEventListener("click", () => {
        modal.classList.remove("is-active");
    });

    // agregamos una tarea nueva
    if (task === null) {
        // primero agregamos header
        modal.getElementsByClassName("modal-card-title")[0].innerHTML = "Agregar Tarea"

        // Crear y agregar la nueva tarea
        acceptModalButton.addEventListener("click", () => {
            const title = modal.querySelector("input").value;
            const description = modal.querySelectorAll("input")[1].value;

            new_task(title, description, null, null, null);

            // Limpiar y cerrar el modal
            modal.querySelectorAll("input").forEach(input => input.value = "");
            modal.classList.remove("is-active");
        });
    }

    // Mostramos el modal
    modal.classList.add("is-active");
}
