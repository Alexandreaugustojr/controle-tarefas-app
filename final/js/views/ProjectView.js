class ProjectView {
    displayProjects(projects) {
        const container = document.getElementById('projects-list');
        container.innerHTML = '';

        if (projects.length === 0) {
            container.innerHTML = '<p>Nenhum projeto encontrado. Crie seu primeiro projeto!</p>';
            return;
        }

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'card';
            projectElement.dataset.id = project.id;
            
            projectElement.innerHTML = `
                <h3>${project.nome}</h3>
                <p>${project.descricao || 'Sem descrição'}</p>
                <small>Criado em: ${new Date(project.data_criacao).toLocaleDateString()}</small>
            `;
            
            container.appendChild(projectElement);
        });
    }

    showProjectForm(project = null) {
        const modal = document.getElementById('project-modal');
        const form = document.getElementById('project-form');
        
        if (project) {
            document.getElementById('project-modal-title').textContent = 'Editar Projeto';
            document.getElementById('project-id').value = project.id;
            document.getElementById('project-name').value = project.nome;
            document.getElementById('project-description').value = project.descricao || '';
        } else {
            document.getElementById('project-modal-title').textContent = 'Novo Projeto';
            form.reset();
        }
        
        document.getElementById('modal-backdrop').classList.remove('hidden');
        modal.classList.remove('hidden');
    }

    hideProjectForm() {
        document.getElementById('project-modal').classList.add('hidden');
        document.getElementById('modal-backdrop').classList.add('hidden');
    }

    getProjectFormData() {
        return {
            id: document.getElementById('project-id').value || null,
            nome: document.getElementById('project-name').value,
            descricao: document.getElementById('project-description').value
        };
    }
}