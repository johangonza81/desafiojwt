import { getUsuarios } from "../models/models.js";
import { registraUsuario } from "../models/models.js";
import { obtenerUsuarioPorEmail } from "../models/models.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';



//obtener usuario
export const obtenerUsuarios = async (req, res) => {
    try {
        const result = await getUsuarios(req,res);
        res.status(200).json(result);
        console.log("Consulta exitosa, resultados:", result);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message, error.stack);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

const secretKey = process.env.JWT_SECRET
const generarToken = (idUsuario) => {
return jwt.sign({ id: idUsuario },secretKey , { expiresIn: '1h' });
}

//validar usuario
export const validarUsuario = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        


        const usuario = await obtenerUsuarioPorEmail(email);
        console.log("Usuario obtenido de la base de datos:", usuario);

        if (!usuario) {
            return res.status(400).send("Usuario no encontrado");
        }

        const passwordValido = bcrypt.compareSync(password, usuario.password);
        

        if (!passwordValido) {
            return res.status(400).send("Contraseña incorrecta");
        }
        const token = generarToken(usuario.email);
        return res.status(200).json({ message: "Usuario validado con éxito",usuario, token });
    } catch (error) {
        res.status(500).send(error);
    }
};



//crear usuario
export const usuarioNuevo = async(req,res)=>{
    try{
    const usuario = req.body
    await registraUsuario(usuario)
    res.send("Usuario creado con exito")
    }catch (error){
    res.status(500).send(error)

    }
}



