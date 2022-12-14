const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usario');



const usuariosGet = (req = request, res = response) => {
    const {q, nombre= 'No name', apikey, page = '1', limit} = req.query;
    
    res.json({
        msj: "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}


const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado'
        })
    }

    // Encriptar la contraseña
    const salt  = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);


    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msj: "put API - controlador",
        id
    });
}


const usuariosPatch = (req, res = response) => {
    res.json({
        msj: "patch API - controlador"
    });
}


const usuariosDelete = (req, res = response) => {
    res.json({
        msj: "delete API - controlador"
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}