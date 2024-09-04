/***
 * Clase que "envuelve" una tarjeta (un div con cosas adentro).
 * El único objetivo es estructurar la lógica.
 */
class taskCard {
    constructor() {
        // Indica si la tarjeta está recién creada
        this.is_empty = true;

        // Info de la tarea
        this.id = null;
        this.title = null;
        this.description = null;
        this.assignedTo = null;
        this.priority = null;
        this.status = null;
        this.endDate = null;

        // Elemento HTML, con sus atributos correspondientes.
        this.element = document.createElement("div");
        this.element.classList.add("card");
        this.element.setAttribute("draggable", "true");
    }

    /***
     * Método para rellenar la tarjeta. Se usa el mismo al crearla por primera vez o editarla
     */
    fill(id, titulo, desc, asignado, prioridad, estado, fecha_limite) {
        // Llenamos los atributos
        this.id = id;
        this.title = titulo;
        this.description = desc;
        this.assignedTo = asignado;
        this.priority = prioridad;
        this.status = estado;
        this.endDate = fecha_limite;

        // Llenamos el html
        this.element.innerHTML = `
            <header class="card-header">
                <p class="card-header-title">${this.title}</p>
                <div class="card-header-icon">
                    <button class="delete"></button>
                </div>
            </header>
            <div class="card-content">
                <div class="content">${this.description}</div>
                <div class="tags">
                    <span class="tag is info is-light is-medium">
                        <span class="material-symbols-outlined">schedule</span>
                        ${this.formatDate()}
                    </span>
                    <span class="tag is-info is-light is-medium">
                        <span class="material-symbols-outlined">account_circle</span>
                        ${this.assignedTo}
                    </span>
                    <span class="tag is-light is-medium" id="prioridad">${this.priority}</span>
                </div>
            </div>
        `;

        // Coloreamos el tag con la prioridad
        switch (this.priority) {
            case "High":
                this.element.querySelector("#prioridad").classList.add("is-danger");
            case "Medium":
                this.element.querySelector("#prioridad").classList.add("is-warning");
            case "Low":
                this.element.querySelector("#prioridad").classList.add("is-success");
        }
        // Marcamos la tarjeta como rellena
        this.is_empty = false;

        // Seteamos la id en el html
        this.element.setAttribute("id", this.id);
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            assignedTo: this.assignedTo,
            startDate: "",
            endDate: this.formatDate(),
            status: this.status,
            priority: this.priority,
            comments: [],
        };
    }

    fromJSON(json_task) {
        const id = json_task.id;
        const titulo = json_task.title;
        const desc = json_task.description;
        const asignado = json_task.assignedTo;
        const prioridad = json_task.priority;
        const estado = json_task.status;
        // Malabares para crear la fecha
        const fecha_limite = new Date(json_task.endDate.split('/').reverse().join('/'));

        this.fill(id, titulo, desc, asignado, prioridad, estado, fecha_limite);
    }

    formatDate() {
        return this.endDate.toLocaleString("en-GB", { timeZone: "America/Montevideo" }).split(",")[0];
    }

    delete() {
        this.element.parentNode.removeChild(this.element);
    }
}
