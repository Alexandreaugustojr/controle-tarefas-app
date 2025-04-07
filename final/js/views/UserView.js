class UserView {
    displayUserInfo(user) {
        document.getElementById('username').textContent = user.nome;
        document.getElementById('user-name').textContent = user.nome;
        document.getElementById('user-email').textContent = user.email;
    }

    clearUserInfo() {
        document.getElementById('username').textContent = 'Usuário';
        document.getElementById('user-name').textContent = 'Usuário';
        document.getElementById('user-email').textContent = 'email@exemplo.com';
    }
}