const formCrearUsuario = document.getElementById('formCrearUsuario');
const formEditarUsuario = document.getElementById('formEditarUsuario');
const tableBody = document.getElementById('tableBody');
const verMasBody = document.getElementById('verMasBody');
const verMasTitle = document.getElementById('verMasTitle');
const emailEditar = document.getElementById('emailEditar');
const nombreEditar = document.getElementById('nombreEditar');
const apellidoEditar = document.getElementById('apellidoEditar');
const DNIEditar = document.getElementById('DNIEditar');
let editingUser = '';

formEditarUsuario.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const usuario = {
        email: e.target[0].value,
        nombre: e.target[1].value,
        apellido: e.target[2].value,
        dni: e.target[3].value,
        id: editingUser,
    };
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const nuevosUsuarios = usuarios.map((user) => {
        if (user.id === editingUser) {
            return usuario;
        }
        return user;
    });
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    listarUsuarios();
    $('#editar').modal('hide');
    editingUser = '';
    formEditarUsuario.reset();
});

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const addUser = () => {
    $('#crearUsuariosModal').modal('show');
};

const editar = (id) => {
    editingUser = id;
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id);
    emailEditar.value = usuarioEncontrado.email;
    nombreEditar.value = usuarioEncontrado.nombre;
    apellidoEditar.value = usuarioEncontrado.apellido;
    DNIEditar.value = usuarioEncontrado.dni;
    $('#editar').modal('show');
};


formCrearUsuario.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const usuario = {
        email: e.target[0].value,
        nombre: e.target[1].value,
        apellido: e.target[2].value,
        dni: e.target[3].value,
        id: generateId(),
    };
    const usuariosEnStorage = localStorage.getItem('usuarios');
    if (!usuariosEnStorage) {
        const usuarios = JSON.stringify([usuario]);
        localStorage.setItem('usuarios', usuarios)
    } else {
        const usuariosEnStorageParse = JSON.parse(usuariosEnStorage);
        usuariosEnStorageParse.push(usuario);
        const JSONusuarios = JSON.stringify(usuariosEnStorageParse);
        localStorage.setItem('usuarios', JSONusuarios);
    }
    $('#crearUsuariosModal').modal('hide')
    listarUsuarios();
    formCrearUsuario.reset();
});

const borrar = (id) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    listarUsuarios();
};

const verMasShow = (id) => {
    $('#verMas').modal('show');
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const usuarioAMostrar = usuarios.find((usuario) => usuario.id === id);
    const body = `
        <b>Nombre:</b> ${usuarioAMostrar.nombre}
        <br>
        <b>Apellido:</b> ${usuarioAMostrar.apellido}
        <br>
        <b>DNI:</b> ${usuarioAMostrar.dni}
        <br>
        <b>Email:</b> ${usuarioAMostrar.email}
    `;
    verMasBody.innerHTML = body;
    verMasTitle.textContent = `${usuarioAMostrar.nombre} ${usuarioAMostrar.apellido}`;
};

const abrirPerfil = (id) => {
    window.location = `/perfil.html#${id}`;
};

function listarUsuarios(usuariosFiltrados) {
    if (usuariosFiltrados) {
        const trs = [];
        for (const user of usuariosFiltrados) {
            const tr = `
                <tr>
                    <td>${user.nombre}</td>
                    <td>${user.apellido}</td>
                    <td>${user.email}</td>
                    <td>${user.dni}</td>
                    <td>
                        <button class='btn btn-secondary' onclick="verMasShow('${user.id}')">Ver mas</button>
                    </td>
                    <td>
                        <button class='btn btn-danger' onclick="borrar('${user.id}')">Borrar</button>
                    </td>
                    <td>
                        <button class='btn btn-warning' onclick="editar('${user.id}')">Editar</button>
                    </td>
                    <td>
                        <button class='btn btn-primary' onclick="abrirPerfil('${user.id}')">Ver perfil</button>
                    </td>
                </tr>
            `;
            trs.push(tr);
        }
        tableBody.innerHTML = trs.join(' ');
    } else {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const trs = [];
        for (const user of usuarios) {
            const tr = `
                <tr>
                    <td>${user.nombre}</td>
                    <td>${user.apellido}</td>
                    <td>${user.email}</td>
                    <td>${user.dni}</td>
                    <td>
                        <button class='btn btn-secondary' onclick="verMasShow('${user.id}')">Ver mas</button>
                    </td>
                    <td>
                        <button class='btn btn-danger' onclick="borrar('${user.id}')">Borrar</button>
                    </td>
                    <td>
                        <button class='btn btn-warning' onclick="editar('${user.id}')">Editar</button>
                    </td>
                    <td>
                        <button class='btn btn-primary' onclick="abrirPerfil('${user.id}')">Ver perfil</button>
                    </td>
                </tr>
            `;
            trs.push(tr);
        }
        tableBody.innerHTML = trs.join(' ');
    }
}

listarUsuarios();

const buscar = (filtro) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const usuariosFiltrados = usuarios.filter((usuario) => (
            usuario?.nombre?.toLowerCase()?.includes(filtro?.toLowerCase())
            ||
            usuario?.apellido?.toLowerCase()?.includes(filtro?.toLowerCase())
            ||
            usuario?.email?.toLowerCase()?.includes(filtro?.toLowerCase())
            ||
            usuario?.dni?.includes(filtro?.toLowerCase())
        )
    );
    listarUsuarios(usuariosFiltrados);
};
