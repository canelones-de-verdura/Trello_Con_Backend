class dashboardColumn {
    constructor(name) {
        // html
        this.element = document.createElement("div");
        this.element.classList.add(
            "custom-column"
        );
        this.element.setAttribute("id", name);
        this.element.innerHTML = `<h2 class="subtitle is-3">${name}</h2>`;

        // parte donde van las tarjetas
        const inner_area = document.createElement("div");
        inner_area.classList.add("inner-column");
        this.element.appendChild(inner_area);

        // Configuramos eventos
        this.element.addEventListener('dragover', (event) => {
            event.preventDefault(); // Necesario para permitir el drop
        });

        this.element.addEventListener('drop', (event) => {
            event.preventDefault();

            const dragged_element_id = event.dataTransfer.getData('text/plain'); // Obtener el ID del elemento arrastrado
            const dragged_element = document.getElementById(dragged_element_id); // Buscar el elemento arrastrado por su ID

            if (dragged_element) {
                inner_area.appendChild(dragged_element); // Mover el elemento arrastrado a la nueva columna
            } else {
                console.error('El elemento arrastrado no existe en el DOM:', dragged_element_id);
            }
        });
    }
}

class taskDashboard {
    constructor(HTML_Element, url, modal) {
        // tarjetas
        this.contents = [];

        // dir del sv
        this.url = url;

        // chanchada?
        this.menu = modal;

        // html
        this.element = HTML_Element;
        this.element.classList.add(
            "dashboard"
        );
    }

    // crea las columnas donde se clasifican las tareas.
    setColumns(column_names) {
        column_names.forEach(name => {
            this[name] = new dashboardColumn(name);
            this.element.appendChild(this[name].element);
        });
    }

    addTaskToBoard(task) {
        this[task.status].element.querySelector(".inner-column").appendChild(task.element);
        this.setCalls(task);
    }

    setCalls(task) {
        // Botones
        task.element.querySelector(".card-header-icon").addEventListener("click", () => this.deleteTask(task));
        task.element.querySelector(".card-content").addEventListener("click", () => this.menu.spawn(task, this));

        // Drag
        task.element.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
            task.element.classList.add("dragging");
        });

        task.element.addEventListener("dragend", () => {
            task.element.classList.remove("dragging");
            const new_status = task.element.parentNode.parentNode.id
            
            // Esto no me gusta tanto
            // Cuando edito una tarea con el modal, primero la "relleno", la mando al sv, 
            // reescribo el objeto según lo que me devuelve y por último actualizo el html.
            // Acá es al revés, primero se actualiza el html y me lavo las manos, que
            // el sv se arregle solo.
            // Seguramente hay una forma más prolija.
            task.status = new_status;
            this.editTask(task);
        });
    }

    /***
     * Recupera las tareas desde el sv, carga cada una en un objeto,
     * las guarda en una lista y finalmente las muestra en la pagina.
     *  @param url 
     */
    async getTasks() {
        const response = await fetch(this.url);
        const tasks = await response.json();

        const status = `dashboard.getTasks(): ${response.status}, ${response.statusText}`;
        console.log(status);

        if (!response.ok) // Vale la pena este chequeo?
            return;

        tasks.forEach(task => {
            const card = new taskCard();
            card.fromJSON(task);
            this.contents.push(card);
            this.addTaskToBoard(card);
        });
    }

    async addTask(task) {
        const response = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const status = `dashboard.addTask(): ${response.status}, ${response.statusText}`;
        console.log(status);

        if (!response.ok)
            return;

        // Descarto lo que acabo de crear y uso lo que me devuelve el sv
        const res_json = await response.json();
        task = new taskCard();
        task.fromJSON(res_json);
        this.contents.push(task);
        this.addTaskToBoard(task);
    }

    async deleteTask(task) {
        const id = task.id;
        const url = `${this.url}/${id}`;

        if (this.contents.includes(task)) {
            const response = await fetch(url, {
                method: "DELETE",
                params: id,
                headers: {
                    "Content-Type": "text/xml",
                },
            });

            const status = `dashboard.deleteTask(): ${response.status}, ${response.statusText}`;
            console.log(status);

            if (!response.ok)
                return;

            this.contents = this.contents.filter(keep => keep !== task); // sacamos del array
            task.delete(); // sacamos del html
        }
    }

    async editTask(task) {
        const id = task.id;
        const url = `${this.url}/${id}`;

        if (this.contents.includes(task)) {
            const response = await fetch(url, {
                method: "PUT",
                params: id,
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const status = `dashboard.editTask(): ${response.status}, ${response.statusText}`;
            console.log(status);

            if (!response.ok)
                return;

            task.delete(); // Sacamos la tarea de la columna en la que estaba

            // Descarto la tarea original y uso lo que me devuelve el sv
            const res_json = await response.json();
            task = new taskCard();
            task.fromJSON(res_json);
            this.contents.push(task);
            this.addTaskToBoard(task);
        }
    }
}
