import User from '../models/User.js';

export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        // Verificar si el usuario ya existe por email
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "El usuario ya fue registrado." });
        }

        // Verificar que se envíen los campos necesarios
        if (!email || !password) {
            return res.status(400).json({ message: "Se requieren email y password." });
        }

        // Crear un nuevo usuario
        const newUser = new User({
            name,
            lastname,
            email,
            password: await User.encryptPassword(password),
        });

        // Guardar el usuario en la base de datos
        const savedUser = await newUser.save();

        return res.status(201).json({
            message: "Usuario creado.",
            user: savedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear usuario." });
    }
};
