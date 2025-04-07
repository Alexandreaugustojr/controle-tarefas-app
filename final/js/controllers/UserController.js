class UserController {
    constructor() {
        this.userView = new UserView();
        this.currentUser = null;
    }

    loadCurrentUser() {
        // Simulando um usuário logado (em uma aplicação real, isso viria de uma API ou localStorage)
        this.currentUser = new User(1, 'João Silva', 'joao@exemplo.com', 'senha123');
        this.userView.displayUserInfo(this.currentUser);
    }

    logout() {
        this.currentUser = null;
        this.userView.clearUserInfo();
        // Redirecionar para a página de login (simulado)
        alert('Você foi desconectado. Redirecionando para a página de login...');
        // window.location.href = 'login.html';
    }
}