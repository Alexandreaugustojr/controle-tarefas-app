class TaskView {
    displayTasks(tasks, projects, labels) {
        const container = document.getElementById('tasks-list');
        container.innerHTML = '';

        if (tasks.length === 0) {
            container.innerHTML = '<p>Nenhuma tarefa encontrada. Crie sua primeira tarefa!</p>';
            return;
        }

        tasks.forEach(task => {
            const project = projects.find(p => p.id === task.projeto_id);
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            taskElement.dataset.id = task.id;
            
            const dueDate = task.data_vencimento ? new Date(task.data_vencimento) : null;
            const isOverdue = dueDate && dueDate < new Date() && task.status !== 'completed';
            
            taskElement.innerHTML = `
                <div class="task-info">
                    <h3>${task.titulo}</h3>
                    <p>${task.descricao || 'Sem descrição'}</p>
                    <div class="labels-container">
                        ${task.etiquetas.map(labelId => {
                            const label = labels.find(l => l.id === labelId);
                            return label ? `<span class="label-item" style="background-color: ${label.cor}">${label.nome}</span>` : '';
                        }).join('')}
                    </div>
                </div>
                <div class="task-meta">
                    ${project ? `<span class="task-project">${project.nome}</span>` : ''}
                    ${dueDate ? `<span class="task-due-date ${isOverdue ? 'overdue' : ''}">
                        ${isOverdue ? 'Vencida: ' : ''}${dueDate.toLocaleString()}
                    </span>` : ''}
                    <span class="task-status ${task.status}">
                        ${task.status === 'pending' ? 'Pendente' : 'Concluída'}
                    </span>
                </div>
                <div class="task-actions">
                    <button class="edit-task" title="Editar"><i class="fas fa-edit"></i>✏️</button>
                    <button class="delete-task" title="Excluir"><i class="fas fa-trash"></i>🗑️</button>
                </div>
            `;
            
            container.appendChild(taskElement);
        });
    }

    updateProjectFilter(projects) {
        const select = document.getElementById('project-filter');
        select.innerHTML = '<option value="all">Todos os projetos</option>';
        
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.nome;
            select.appendChild(option);
        });
    }

    showTaskForm(task = null, projects, labels) {
        const modal = document.getElementById('task-modal');
        const form = document.getElementById('task-form');
        const projectSelect = document.getElementById('task-project');
        
        // Preenche o select de projetos
        projectSelect.innerHTML = '';
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.nome;
            projectSelect.appendChild(option);
        });
        
        // Preenche as etiquetas disponíveis
        const labelsContainer = document.getElementById('task-labels-container');
        labelsContainer.innerHTML = '';
        labels.forEach(label => {
            const labelElement = document.createElement('div');
            labelElement.className = 'label-checkbox';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `label-${label.id}`;
            checkbox.value = label.id;
            
            const labelLabel = document.createElement('label');
            labelLabel.htmlFor = `label-${label.id}`;
            labelLabel.innerHTML = `<span class="label-item" style="background-color: ${label.cor}">${label.nome}</span>`;
            
            labelElement.appendChild(checkbox);
            labelElement.appendChild(labelLabel);
            labelsContainer.appendChild(labelElement);
        });
        
        if (task) {
            document.getElementById('task-modal-title').textContent = 'Editar Tarefa';
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.titulo;
            document.getElementById('task-description').value = task.descricao || '';
            document.getElementById('task-project').value = task.projeto_id;
            document.getElementById('task-due-date').value = task.data_vencimento ? task.data_vencimento.slice(0, 16) : '';
            document.getElementById('task-status').value = task.status;
            
            // Marca as etiquetas selecionadas
            task.etiquetas.forEach(labelId => {
                const checkbox = document.getElementById(`label-${labelId}`);
                if (checkbox) checkbox.checked = true;
            });
        } else {
            document.getElementById('task-modal-title').textContent = 'Nova Tarefa';
            form.reset();
        }
        
        document.getElementById('modal-backdrop').classList.remove('hidden');
        modal.classList.remove('hidden');
    }

    hideTaskForm() {
        document.getElementById('task-modal').classList.add('hidden');
        document.getElementById('modal-backdrop').classList.add('hidden');
    }

    getTaskFormData() {
        const labels = [];
        document.querySelectorAll('#task-labels-container input[type="checkbox"]:checked').forEach(checkbox => {
            labels.push(checkbox.value);
        });
        
        return {
            id: document.getElementById('task-id').value || null,
            titulo: document.getElementById('task-title').value,
            descricao: document.getElementById('task-description').value,
            projeto_id: document.getElementById('task-project').value,
            data_vencimento: document.getElementById('task-due-date').value,
            status: document.getElementById('task-status').value,
            etiquetas: labels
        };
    }
}