/***
 * Clase que "envuelve" una tarjeta (un div con cosas adentro).
 * El único objetivo es estructurar la lógica.
 */
class taskCard {
  constructor() {
    // Indica si la tarjeta está recién creada
    this.is_empty = true;

    // Info de la tarea
    this.title = null;
    this.description = null;
    this.assignedTo = null;
    this.priority = null;
    this.status = null;
    this.endDate = null;

    // Elemento HTML, con sus atributos correspondientes
    this.element = document.createElement("div");
    this.element.classList.add("card");
    this.element.setAttribute("draggable", "true");
    this.element.setAttribute("id", crypto.randomUUID());

    // Añadir eventos de arrastrar y soltar a la tarea, es necesario que sea cuando son creados porque sino no lo toma
    this.element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
      this.element.classList.add("dragging");
    });

    this.element.addEventListener("dragend", () => {
      this.element.classList.remove("dragging");

      // actualizamos estado
      this.status = this.element.parentNode.getAttribute("id");
    });
  }

  /***
   * Método para rellenar la tarjeta. Se usa el mismo al crearla por primera vez o editarla
   */
  fill(titulo, desc, asignado, prioridad, estado, fecha_limite) {
    // Llenamos los atributos
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
                    <!--<span class="material-symbols-outlined">close</span>-->
                    <button class="delete"></button>
                </div>
            </header>
            <div class="card-content">
                <div class="content">${this.description}</div>
                <div class="tags">
                    <span class="tag is info is-light is-medium">
                        <span class="material-symbols-outlined">schedule</span>
                        ${this.endDate.toString()}
                    </span>
                    <span class="tag is-info is-light is-medium">
                        <span class="material-symbols-outlined">account_circle</span>
                        ${this.assignedTo}
                    </span>
                    <span class="tag is-light is-medium" id="prioridad">${prioridad}</span>
                </div>
            </div>
        `;

    // Coloreamos el tag con la prioridad
    switch (this.priority) {
      case "Alta":
        this.element.querySelector("#prioridad").classList.add("is-danger");
      case "Media":
        this.element.querySelector("#prioridad").classList.add("is-warning");
      case "Baja":
        this.element.querySelector("#prioridad").classList.add("is-success");
    }
    // Marcamos la tarjeta como rellena
    this.is_empty = false;
  }

  delete() {
    this.element.parentNode.removeChild(this.element);
  }
}
