// Function to handle task completion
document.querySelectorAll('.task input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const taskItem = this.closest('.task');
        if (this.checked) {
            taskItem.classList.add('completed');
        } else {
            taskItem.classList.remove('completed');
        }
    });
});

// Function to add a new task
document.querySelector('.add-task').addEventListener('click', function() {
    const taskName = prompt("Enter the task name:");
    const taskTime = prompt("Enter the task time (e.g., 'Tomorrow, 9:00 AM'):");

    if (taskName && taskTime) {
        const taskList = document.querySelector('.upcoming-tasks');
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.innerHTML = `
            <input type="checkbox">
            <div>
                <p>${taskName}</p>
                <small>${taskTime}</small>
            </div>
        `;
        taskList.appendChild(newTask);
    }
});
