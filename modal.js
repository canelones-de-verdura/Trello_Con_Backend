/***
 * Agrega el cuerpo a un modal, y lo muestra.
 * @param div con class='modal'
 */
function spawn_modal(modal) {
    const body = `
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Agregar/Editar Tarea</p>
                <button class="delete" aria-label="close"></button>
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
                    <button class="button">Cancelar</button>
                    <button class="button is-success">Aceptar</button>
                </div>
            </footer>
        </div>
    `;

    modal.innerHTML = body;
    modal.classList.add("is-active");
}