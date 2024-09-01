class dashboardColumn {
    constructor(name, id) {
        // html
        this.element = document.createElement("div");
        this.element.classList.add(
            "custom-column"
            //"column",
            //"has-background-light",
            //"is-flex",
            //"is-flex-direction-column",
            //"is-align-items-center"
        );
        this.element.setAttribute("id", id);
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
        //// Configuramos eventos
        //this.element.addEventListener('dragover', (event) => {
        //    event.preventDefault(); // Necesario para permitir el drop
        //});
        //
        //this.element.addEventListener('drop', (event) => {
        //    event.preventDefault();
        //    const dragged_element_id = event.dataTransfer.getData('text/plain'); // Obtener el ID del elemento arrastrado
        //    const dragged_element = document.getElementById(dragged_element_id); // Buscar el elemento arrastrado por su ID
        //
        //    if (dragged_element) {
        //        this.element.appendChild(dragged_element); // Mover el elemento arrastrado a la nueva columna
        //    } else {
        //        console.error('El elemento arrastrado no existe en el DOM:', dragged_element_id);
        //    }
        //});
    }
}

class taskDashboard {
    constructor(HTML_Element) {
        // tarjetas
        this.contents = [];

        this.columns = [];

        // html
        this.element = HTML_Element;
        this.element.classList.add(
            "dashboard"
            //"columns",
            //"is-multiline",
            //"is-gap-3"
        );
    }

    /*
    // crea las columnas donde se clasifican las tareas.
    setColumns(column_names) {
        column_names.forEach(name => {
            const name_low = name.toLowerCase().replaceAll(" ", "-");
            this[name_low] = new dashboardColumn(name, name_low);
            this.element.appendChild(this[name_low].element);
        })
    }
    */
   
    // crea las columnas donde se clasifican las tareas.
    setColumns(column_names) {
        column_names.forEach(name => {
            const name_low = name.toLowerCase().replaceAll(" ", "-");
            const column = new dashboardColumn(name, name_low);
            this[name_low] = column;
            this.columns.push(column);
            this.element.appendChild(column.element);
        })
    }

    addTask(task, state) {
        /*
        this.contents.push(task)
        this[state].element.querySelector(".inner-column").appendChild(task.element);
        */
        //// Evento para abrir el modal de edición.
        //this.element.querySelector(".card-content").addEventListener("click", () => modal.spawn(task));

        // Evento para eliminar la tarea.
        //task.element.querySelector(".card-header-icon").addEventListener("click", () => this.deleteTask(task));
    
        // Verifica si la columna existe antes de añadir la tarea
        const column = this[state];
        if (column) {
            this.contents.push(task);
            column.element.querySelector(".inner-column").appendChild(task.element);

            // Guarda las tareas cada vez que se añade una nueva
            this.saveTasks();
        } else {
            console.error(`La columna con el estado "${state}" no existe.`);
        }
    }

    deleteTask(task) {
        if (this.contents.includes(task)) {
            task.delete();
            this.contents = this.contents.filter(keep => keep !== task);
            /*
            // debug
            if (this.contents.includes(task))
                console.log("No se borró!");
            */
            // Guarda las tareas cada vez que se elimina una
            this.saveTasks();
    }


    }

    setCalls(task, modal) {
        task.element.querySelector(".card-header-icon").addEventListener("click", () => this.deleteTask(task));
        task.element.querySelector(".card-content").addEventListener("click", () => modal.spawn(task, this));
    }

    //cambios
    saveTasks() {
        // Guarda las tareas en localStorage
        const tasks = [];

        // Recorre las columnas y guarda cada tarea
        this.columns.forEach(column => {
            const tasksInColumn = Array.from(column.element.querySelectorAll('.card')).map(card => {
                const task = {
                    titulo: card.querySelector('.card-header-title').innerText,
                    desc: card.querySelector('.content').innerText,
                    asignado: card.querySelector('.tags .tag:nth-child(2)').innerText,
                    prioridad: card.querySelector('#prioridad').innerText,
                    estado: column.element.getAttribute('id'),
                    fecha_limite: card.querySelector('.tags .tag:first-child').innerText.trim(),
                };
                return task;
            });

            tasks.push(...tasksInColumn);
        });

        // Guarda las tareas en formato JSON
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    loadTasks() {
        // Carga las tareas desde localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Recorre las tareas y crea tarjetas para cada una
        tasks.forEach(taskData => {
            const task = new taskCard();
            task.fill(
                taskData.titulo,
                taskData.desc,
                taskData.asignado,
                taskData.prioridad,
                taskData.estado,
                taskData.fecha_limite
            );
            this.addTask(task, taskData.estado);
        });
    }
}
