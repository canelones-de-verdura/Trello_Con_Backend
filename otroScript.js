// Obtener todas las tareas y columnas
const cells = document.querySelectorAll('.card');
const tables = document.querySelectorAll('.columna');

// Comentado porque las tareas se crean dinámicamente
/*cells.forEach(cell => {
    cell.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        console.log(event.target.id)
        cell.classList.add('dragging');
    });

    cell.addEventListener('dragend', () => {
        cell.classList.remove('dragging');
    });
});*/

// Añadir evento 'dragover' y 'drop' a cada columna
tables.forEach(table => {
    table.addEventListener('dragover', (event) => {
        event.preventDefault(); // Necesario para permitir el drop
    });

    table.addEventListener('drop', (event) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData('text/plain'); // Obtener el ID del elemento arrastrado
        console.log("El id es: "+draggedElementId);
        if(draggedElementId){
            console.log(typeof(draggedElementId));
        }
        //console.log(typeof(draggedElementId));
        const draggedElement = document.getElementById(draggedElementId); // Buscar el elemento arrastrado por su ID
        console.log("puede ser que en el id de arriba no imprime nada pero aun asi no se corta la ejecucion");
        console.log(draggedElement);

        if (draggedElement) {
            table.appendChild(draggedElement); // Mover el elemento arrastrado a la nueva columna
        } else {
            console.error('El elemento arrastrado no existe en el DOM:', draggedElementId);
        }
    });
});
