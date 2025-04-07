class LabelController {
    constructor() {
        this.labelView = new LabelView();
        this.labels = [];
    }

    loadLabels() {
        this.labels = JSON.parse(localStorage.getItem('labels')) || [];
        this.labelView.displayLabels(this.labels);
        this.populateLabelSelect();
    }

    saveLabel() {
        const name = document.getElementById('label-name').value;
        const color = document.getElementById('label-color').value;

        const newLabel = {
            id: Date.now(),
            name,
            color
        };

        this.labels.push(newLabel);
        localStorage.setItem('labels', JSON.stringify(this.labels));
        this.labelView.displayLabels(this.labels);
        this.populateLabelSelect();
        this.hideLabelForm();
    }

    populateLabelSelect() {
        const select = document.getElementById('task-labels');
        if (!select) return;

        select.innerHTML = '';
        this.labels.forEach(label => {
            const option = document.createElement('option');
            option.value = label.id;
            option.textContent = label.name;
            select.appendChild(option);
        });
    }

    showLabelForm() {
        document.getElementById('label-form-container').style.display = 'block';
        document.getElementById('modal-backdrop').style.display = 'block';
    }

    hideLabelForm() {
        document.getElementById('label-form-container').style.display = 'none';
        document.getElementById('modal-backdrop').style.display = 'none';
    }

    getLabelById(id) {
        return this.labels.find(label => label.id == id);
    }
}
class LabelController {
    constructor() {
        this.labelView = new LabelView();
        this.labels = [];
    }

    loadLabels() {
        this.labels = JSON.parse(localStorage.getItem('labels')) || [];
        this.labelView.displayLabels(this.labels);
        this.populateLabelSelect();
    }

    saveLabel() {
        const name = document.getElementById('label-name').value;
        const color = document.getElementById('label-color').value;

        const newLabel = {
            id: Date.now(),
            name,
            color
        };

        this.labels.push(newLabel);
        localStorage.setItem('labels', JSON.stringify(this.labels));
        this.labelView.displayLabels(this.labels);
        this.populateLabelSelect();
        this.hideLabelForm();
    }

    populateLabelSelect() {
        const select = document.getElementById('task-labels');
        if (!select) return;

        select.innerHTML = '';
        this.labels.forEach(label => {
            const option = document.createElement('option');
            option.value = label.id;
            option.textContent = label.name;
            select.appendChild(option);
        });
    }

    showLabelForm() {
        document.getElementById('label-form-container').style.display = 'block';
        document.getElementById('modal-backdrop').style.display = 'block';
    }

    hideLabelForm() {
        document.getElementById('label-form-container').style.display = 'none';
        document.getElementById('modal-backdrop').style.display = 'none';
    }

    getLabelById(id) {
        return this.labels.find(label => label.id == id);
    }
}
