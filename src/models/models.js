import pool from '../datbase2/db.js';
import bcrypt from 'bcryptjs'

export const getUsuarios = async (req,res) =>{
    const result = await pool.query('SELECT * FROM usuarios;')
    return result.rows;
}


export const registraUsuario = async(usuario) => {
    let {email,password,rol,lenguage} = usuario
    const passwordEncriptada = bcrypt.hashSync(password)
    password = passwordEncriptada
    const values = [email,password,rol,lenguage]
    const consulta = 'INSERT INTO usuarios(id,email,password,rol,lenguage) values(DEFAULT, $1, $2, $3, $4)'
    resultado= await pool.query(consulta,values)
    return resultado.rows
}


export const obtenerUsuarioPorEmail = async (email) => {
    const consulta = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [email];
    const resultado = await pool.query(consulta, values);
    return resultado.rows[0];
};