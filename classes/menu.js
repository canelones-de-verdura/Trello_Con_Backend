/***
 * Clase que "envuelve" el modal.
 * El único objetivo es estructurar la lógica.
 */
class taskMenu {
    /***
     * @param div que se va a utilizar como modal
     */
    constructor(HTML_Element) {
        // Atributos que vale la pena tener a mano
        this.element = HTML_Element;
        this.title = HTML_Element.querySelector(".modal-card-title");
        this.btn_holder = HTML_Element.querySelector(".buttons"); // 0 = cancelar, 1 = aceptar

        // Configuramos eventos
        const modal_background = document.getElementById("background");
        modal_background.addEventListener("click", () => this.close());
        this.btn_holder.children[0].addEventListener("click", () => this.close());
        this.element.addEventListener("keydown", ({ key }) => {
            if (key === "Escape")
                this.close()
        });
    }

    /***
     * Termina de configurar el modal y lo muestra.
     * @param task Tarea a editar.
     */
    spawn(task, dashboard) {
        let title;
        const confirm_button = this.btn_holder.children[1];

        if (task.is_empty) {
            this.clearInput();
            title = "Nueva tarea";
            confirm_button.innerText = "Agregar tarea";
        } else {
            this.fillInput(task);
            title = "Editar tarea";
            confirm_button.innerText = "Aceptar";
        }

        // Evento
        confirm_button.addEventListener("click", () => {
            const args = this.recoverInput();

            if (args !== null) {
                //dashboard.deleteTask(task); // Por si estamos modificando la tarea, y se cambió de columna
                if (task.is_empty) {
                    task.fill(0, args[0], args[1], args[2], args[3], args[4], args[5]);
                    dashboard.addTask(task);
                } else {
                    task.fill(task.id, args[0], args[1], args[2], args[3], args[4], args[5]);
                    dashboard.editTask(task);
                }

                this.close();
            }
        });

        // Título
        this.title.innerText = title;

        // Mostramos modal
        this.element.classList.add("is-active");
    }

    recoverInput() {
        // Input
        const titulo = this.element.querySelector("#titulo").value;
        const descripcion = this.element.querySelector("#descripcion").value;
        const asignado = this.element.querySelector("#asignado").value;
        const prioridad = this.element.querySelector("#prioridad").value;
        const estado = this.element.querySelector("#estado").value;
        let fecha_limite = this.element.querySelector("#fecha_limite").value;

        if (!titulo || !descripcion || !asignado || !prioridad || !estado || !fecha_limite) {
            alert("Ingrese todos los datos.");
            return null;
        }

        console.log(fecha_limite)
        // Malabares para crear la fecha, de nuevo
        fecha_limite = new Date(fecha_limite.replaceAll('-', '/'));
        console.log(fecha_limite)
        return [titulo, descripcion, asignado, prioridad, estado, fecha_limite];
    }

    clearInput() {
        this.element.querySelector("#titulo").value = "";
        this.element.querySelector("#descripcion").value = "";
        this.element.querySelector("#asignado").value = "";
        this.element.querySelector("#prioridad").value = "";
        this.element.querySelector("#estado").value = "";
        this.element.querySelector("#fecha_limite").value = "";
    }

    fillInput(task) {
        this.element.querySelector("#titulo").value = task.title;
        this.element.querySelector("#descripcion").value = task.description;
        this.element.querySelector("#asignado").value = task.assignedTo;
        this.element.querySelector("#prioridad").value = task.priority;
        this.element.querySelector("#estado").value = task.status;
        this.element.querySelector("#fecha_limite").value = task.formatDate().split('/').reverse().join('-');
    }

    close() {
        // Malabares para deshacer las event calls
        this.btn_holder.replaceChild(this.btn_holder.children[1].cloneNode(), this.btn_holder.children[1]);
        // Ocultamos
        this.element.classList.remove("is-active");
    }
}
