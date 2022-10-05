const idUsuario = window.location.hash.substr(1);
const usuarios = JSON.parse(localStorage.getItem('usuarios'));
const usuarioPerfil = usuarios.find((usuario) => usuario.id === idUsuario);
console.log(usuarioPerfil);