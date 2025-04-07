document.addEventListener('DOMContentLoaded', () => {
    const userController = new UserController();
    const projectController = new ProjectController();
    const taskController = new TaskController();
    const labelController = new LabelController();

    userController.loadCurrentUser();
    projectController.loadProjects();
    taskController.loadTasks();
    labelController.loadLabels();

    document.querySelectorAll('nav li').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('nav li').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            document.querySelectorAll('.content section').forEach(section => {
                section.classList.remove('active-section');
            });

            const section = document.getElementById(`${item.dataset.section}-section`);
            if (section) section.classList.add('active-section');
        });
    });

    document.getElementById('logout-btn')?.addEventListener('click', () => {
        userController.logout();
    });

    document.getElementById('new-project-btn')?.addEventListener('click', () => {
        projectController.showProjectForm();
    });

    document.getElementById('new-task-btn')?.addEventListener('click', () => {
        taskController.showTaskForm();
    });

    document.getElementById('new-label-btn')?.addEventListener('click', () => {
        labelController.showLabelForm();
    });

    document.getElementById('project-filter')?.addEventListener('change', (e) => {
        taskController.filterTasks({
            projectId: e.target.value,
            status: document.getElementById('status-filter')?.value
        });
    });

    document.getElementById('status-filter')?.addEventListener('change', (e) => {
        taskController.filterTasks({
            projectId: document.getElementById('project-filter')?.value,
            status: e.target.value
        });
    });

    document.getElementById('modal-backdrop')?.addEventListener('click', () => {
        projectController.hideProjectForm();
        taskController.hideTaskForm();
        labelController.hideLabelForm();
    });

    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (btn.closest('#project-form')) {
                projectController.hideProjectForm();
            } else if (btn.closest('#task-form')) {
                taskController.hideTaskForm();
            } else if (btn.closest('#label-form')) {
                labelController.hideLabelForm();
            }
        });
    });

    document.getElementById('project-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        projectController.saveProject();
    });

    document.getElementById('task-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        taskController.saveTask();
    });

    document.getElementById('label-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        labelController.saveLabel();
    });
});
