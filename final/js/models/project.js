class Project {
    constructor(id, usuario_id, nome, descricao, data_criacao) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.nome = nome;
        this.descricao = descricao;
        this.data_criacao = data_criacao || new Date().toISOString();
    }
}