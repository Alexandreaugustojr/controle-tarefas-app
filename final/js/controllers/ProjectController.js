class ProjectController {
    constructor() {
        this.projectView = new ProjectView();
        this.projects = [];
        this.currentUser = new UserController().currentUser;

        document.getElementById('projects-list').addEventListener('click', (e) => {
            const projectElement = e.target.closest('.card');
            if (!projectElement) return;

            const projectId = projectElement.dataset.id;
            const project = this.projects.find(p => p.id == projectId);

            if (e.target.closest('.edit-project')) {
                this.showProjectForm(project);
            } else if (e.target.closest('.delete-project')) {
                this.deleteProject(project.id);
            }
        });

        // Botão novo projeto
        document.getElementById('new-project-btn').addEventListener('click', () => {
            this.showProjectForm();
        });

        // Botão cancelar
        document.querySelector('#project-modal .cancel-btn').addEventListener('click', () => {
            this.hideProjectForm();
        });

        // Botão salvar
        document.querySelector('#project-modal .save-btn').addEventListener('click', () => {
            this.saveProject();
        });
    }

    loadProjects() {
        this.projects = [
            new Project(1, 1, 'Projeto Principal', 'Meu projeto mais importante', '2023-01-15'),
            new Project(2, 1, 'Projeto Secundário', 'Outro projeto interessante', '2023-02-20')
        ];

        this.projectView.displayProjects(this.projects);

        const taskController = new TaskController();
        taskController.updateProjectFilter(this.projects);
    }

    showProjectForm(project = null) {
        this.projectView.showProjectForm(project);
    }

    hideProjectForm() {
        this.projectView.hideProjectForm();
    }

    saveProject() {
        const projectData = this.projectView.getProjectFormData();

        if (projectData.nome.trim() === '') {
            alert('O nome do projeto é obrigatório.');
            return;
        }

        if (projectData.id) {
            const index = this.projects.findIndex(p => p.id == projectData.id);
            if (index !== -1) {
                this.projects[index] = new Project(
                    projectData.id,
                    this.currentUser.id,
                    projectData.nome,
                    projectData.descricao,
                    this.projects[index].data_criacao
                );
            }
        } else {
            const newId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
            this.projects.push(new Project(
                newId,
                this.currentUser.id,
                projectData.nome,
                projectData.descricao
            ));
        }

        this.projectView.displayProjects(this.projects);
        this.hideProjectForm();

        const taskController = new TaskController();
        taskController.updateProjectFilter(this.projects);
    }

    deleteProject(id) {
        if (confirm('Tem certeza que deseja excluir este projeto? Todas as tarefas associadas também serão removidas.')) {
            this.projects = this.projects.filter(p => p.id != id);
            const taskController = new TaskController();
            taskController.deleteTasksByProject(id);
            this.projectView.displayProjects(this.projects);
        }
    }
}
