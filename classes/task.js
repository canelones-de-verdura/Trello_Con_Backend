/***
 * SUJETO A CAMBIOS
 * Clase que "envuelve" una tarjeta (un div con cosas adentro).
 * El único objetivo es estructurar la lógica.
 */
class taskCard {
    constructor() {
        // Indica si la tarjeta está recién creada
        this.is_empty = true;

        // Info de la tarea
        this.titulo = null;
        this.desc = null;
        this.asignado = null;
        this.prioridad = null;
        this.estado = null;
        this.fecha_limite = null;


        // Elemento HTML, con sus atributos correspondientes
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

            // actualizamos estado
            this.estado = this.element.parentNode.getAttribute("id");
        });
    }

    // TODO hacer bien la template, que se ve como el tuje
    /***
     * Método para rellenar la tarjeta. Se usa el mismo al crearla por primera vez o editarla
     */
    fill(titulo, desc, asignado, prioridad, estado, fecha_limite) {
        // Llenamos los atributos
        this.titulo = titulo;
        this.desc = desc;
        this.asignado = asignado;
        this.prioridad = prioridad;
        this.estado = estado;
        this.fecha_limite = fecha_limite;

        // Llenamos el html
        this.element.innerHTML = `
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
                <div class="content">Fecha: ${fecha_limite.toString()}</div>
            </div>
            <!--<div class="card-footer">-->
            <!--    <div class="card-header-icon">-->
            <!--        <span class="material-symbols-outlined">edit_square</span>-->
            <!--    </div>-->
            <!--    <div class="card-header-icon">-->
            <!--        <span class="material-symbols-outlined">delete</span>-->
            <!--    </div>-->
            <!--</div>-->
        `;

        // Marcamos la tarjeta como rellena
        this.is_empty = false;
    }

    delete() {
        this.element.parentNode.removeChild(this.element);
    }
}
