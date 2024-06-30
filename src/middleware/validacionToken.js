import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET

export const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Acceso denegado. Token inválido.' });
        }
        req.usuarioEmail = decoded.email; 
        next();
    });
};