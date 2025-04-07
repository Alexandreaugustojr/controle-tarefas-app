class LabelView {
    displayLabels(labels) {
        const container = document.getElementById('labels-list');
        container.innerHTML = '';

        if (labels.length === 0) {
            container.innerHTML = '<p>Nenhuma etiqueta encontrada. Crie sua primeira etiqueta!</p>';
            return;
        }

        labels.forEach(label => {
            const labelElement = document.createElement('div');
            labelElement.className = 'card';
            labelElement.dataset.id = label.id;
            
            labelElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span class="label-item" style="background-color: ${label.cor}">${label.nome}</span>
                    <div style="flex-grow: 1;"></div>
                    <button class="edit-label" title="Editar">✏️</button>
                    <button class="delete-label" title="Excluir">🗑️</button>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #666;">
                    Cor: ${label.cor}
                </div>
            `;
            
            container.appendChild(labelElement);
        });
    }

    showLabelForm(label = null) {
        const modal = document.getElementById('label-modal');
        const form = document.getElementById('label-form');
        
        if (label) {
            document.getElementById('label-modal-title').textContent = 'Editar Etiqueta';
            document.getElementById('label-id').value = label.id;
            document.getElementById('label-name').value = label.nome;
            document.getElementById('label-color').value = label.cor;
        } else {
            document.getElementById('label-modal-title').textContent = 'Nova Etiqueta';
            form.reset();
            document.getElementById('label-color').value = '#3aa757';
        }
        
        document.getElementById('modal-backdrop').classList.remove('hidden');
        modal.classList.remove('hidden');
    }

    hideLabelForm() {
        document.getElementById('label-modal').classList.add('hidden');
        document.getElementById('modal-backdrop').classList.add('hidden');
    }

    getLabelFormData() {
        return {
            id: document.getElementById('label-id').value || null,
            nome: document.getElementById('label-name').value,
            cor: document.getElementById('label-color').value
        };
    }
}