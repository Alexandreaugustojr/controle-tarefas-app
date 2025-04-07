class Task {
    constructor(id, projeto_id, titulo, descricao, data_vencimento, status) {
        this.id = id;
        this.projeto_id = projeto_id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.data_vencimento = data_vencimento;
        this.status = status || 'pending';
        this.etiquetas = [];
    }

    addLabel(labelId) {
        if (!this.etiquetas.includes(labelId)) {
            this.etiquetas.push(labelId);
        }
    }

    removeLabel(labelId) {
        this.etiquetas = this.etiquetas.filter(id => id !== labelId);
    }
}