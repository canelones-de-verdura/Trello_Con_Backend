/***
 * SUJETO A CAMBIOS
 * Agrega el cuerpo a un modal, lo muestra
 * y deja al doc "escuchando" las acciones
 * del usuario.
 */
//function spawn_modal(task) {
//    const modal_template = `
//        <div class="modal-background" id="background" ></div>
//        <div class="modal-card">
//            <header class="modal-card-head">
//                <p class="modal-card-title"></p>
//                <button class="delete" aria-label="close" id="close-modal-button"></button>
//            </header>
//            <section class="modal-card-body">
//                <div class="block is-flex is-flex-direction-row is-justify-content-space-around">
//                    <form id="task-form">
//                <div class="field">
//                    <label class="label">Título</label>
//                    <div class="control">
//                        <input class="input" type="text" id="titulo" placeholder="Título de la tarea">
//                    </div>
//                </div>
//                <div class="field">
//                    <label class="label">Descripción</label>
//                    <div class="control">
//                        <input class="input" type="text" id="descripcion" placeholder="Descripción de la tarea" maxlength="150">
//                    </div>
//                    <p class="help"><span id="char-count">150</span> caracteres máximo.</p>
//                </div>
//                <div class="field">
//                    <label class="label">Asignado</label>
//                    <div class="control">
//                        <div class="select">
//                        <select id="asignado">
//                                <option value="">Asigne una persona</option>
//                                <option value="maría">María</option>
//                                <option value="media">Rafael</option>
//                                <option value="ezequiel">Ezequiel</option>
//                                <option value="bruno">Bruno</option>
//                                <option value="Germán">Germán</option>
//                            </select>
//                        </div>
//                    </div>
//                </div>
//                <div class="field">
//                    <label class="label">Prioridad</label>
//                    <div class="control">
//                        <div class="select">
//                            <select id="prioridad">
//                                <option value="">Seleccione una Prioridad</option>
//                                <option value="Baja">Baja</option>
//                                <option value="Media">Media</option>
//                                <option value="Alta">Alta</option>
//                            </select>
//                        </div>
//                    </div>
//                </div>
//                <div class="field">
//                        <label class="label">Estado</label>
//                        <div class="control">
//                            <div class="select">
//                                <select name="status" required id="estado">
//                                    <option value="">Seleccione un Estado</option>
//                                    <option value="Backlog">Backlog</option>
//                                    <option value="To-Do">To-Do</option>
//                                    <option value="In-Progress">In-Progress</option>
//                                    <option value="Blocked">Blocked</option>
//                                    <option value="Done">Done</option>
//                                </select>
//                            </div>
//                        </div>
//                    </div>
//                <div class="field">
//                    <label class="label" id="fecha limite">Fecha límite</label>
//                    <div class="control">
//                        <input class="input" id="fecha limite" type="date">
//                    </div>
//                </div>
//            </form>
//            </section>
//            <footer class="modal-card-foot">
//                <div class="buttons">
//                    <button class="button cancel">Cancelar</button>
//                    <button class="button is-success">Aceptar</button>
//                </div>
//            </footer>
//        </div>
//    `;
//
//    const modal = document.getElementById("task-menu");
//    modal.innerHTML = modal_template;
//    return modal;
//}

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
        // modal.innerHTML = "";
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
