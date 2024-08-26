// Obtener todas las tareas y columnas
const cells = document.querySelectorAll('.tarea');
const tables = document.querySelectorAll('.column');

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
        const draggedElement = document.getElementById(draggedElementId); // Buscar el elemento arrastrado por su ID

        if (draggedElement) {
            table.appendChild(draggedElement); // Mover el elemento arrastrado a la nueva columna
        } else {
            console.error('El elemento arrastrado no existe en el DOM:', draggedElementId);
        }
    });
});
