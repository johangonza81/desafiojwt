import express from 'express'
import { obtenerUsuarios,usuarioNuevo,validarUsuario } from '../src/controller/controller.js';
import { verificarToken } from '../src/middleware/validacionToken.js';
import { usuariosLog } from '../src/middleware/consultasUsuarios.js';
import {obtenerUsuarioPorEmail } from '../src/models/models.js';
const router = express.Router();


//Obtener usuarios
router.get('/usuarios',usuariosLog,obtenerUsuarios)

//Crear usuario nuevo
router.post('/usuarios',usuariosLog,usuarioNuevo)

//Validar credenciales de usuario
router.post('/login',validarUsuario)

router.get('/ruta-protegida', verificarToken, async (req, res) => {
    try {
        // Obtener el usuario utilizando el ID del usuario extraído del token decodificado
        const usuario = await obtenerUsuarioPorEmail(req.usuarioEmail);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Aquí puedes devolver los datos del usuario u otra información relevante
        return res.status(200).json({ message: 'Acceso autorizado. Datos del usuario:', usuario });
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
});



export default router;