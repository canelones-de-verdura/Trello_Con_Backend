/***
 * SUJETO A CAMBIOS
 * Clase que "envuelve" una tarjeta (un div con cosas adentro).
 * El único objetivo es estructurar la lógica.
 */
class taskCard {
    constructor() {
        this.is_empty = true;
        this.state = -1;
        this.element = document.createElement("div")

        this.element.classList.add("card");
        this.element.setAttribute("draggable", "true");
        this.element.setAttribute("id", crypto.randomUUID());

        // Añadir eventos de arrastrar y soltar a la tarea, es necesario que sea cuando son creados porque sino no lo toma
        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
            this.element.classList.add('dragging');
        });

        this.element.addEventListener('dragend', () => {
            this.element.classList.remove('dragging');
        });

        // Falta evento para clickear y abrir el modal de edición.
        // No va a acá.
    }

    // TODO hacer bien las cosas
    /***
     * Método para rellenar la tarjeta. Se usa el mismo al crearla por primera vez o editarla
     */
    fill(titulo, desc, asignado, prioridad, estado, fecha_limite) {
        const card_template = `
            <header class="card-header">
                <p class="card-header-title">${titulo}</p>
                <div class="card-header-icon">
                    <span class="material-symbols-outlined">close</span>
                </div>
            </header>
            <div class="card-content">
                <div class="content">${desc}</div>
                <div class="content">Asignado: ${asignado}</div>
                <div class="content">${prioridad}</div>
            </div>
        `;

        this.state = estado;
        this.element.innerHTML = card_template;
        this.is_empty = false;
    }

    delete() {
        this.element.parentNode.removeChild(this.element);
    }
}
