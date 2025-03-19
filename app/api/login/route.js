// app/api/login/route.js
import pool from '../../lib/db';

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        // Consultar el usuario en la base de datos
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length > 0) {
            const user = rows[0];

            // Verificar la contraseña (sin hashing por ahora)
            if (password === user.contraseña) {
                // Devolver una respuesta exitosa con los datos del usuario
                return new Response(
                    JSON.stringify({
                        message: 'Login exitoso',
                        user: {
                            id: user.id,
                            nombre: user.nombre,
                            email: user.email,
                            rol: user.rol, // Rol del usuario
                        },
                    }),
                    {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
            } else {
                // Contraseña incorrecta
                return new Response(
                    JSON.stringify({ message: 'Contraseña incorrecta' }),
                    {
                        status: 401,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }
        } else {
            // Usuario no encontrado
            return new Response(
                JSON.stringify({ message: 'Usuario no encontrado' }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
    } catch (error) {
        // Error en el servidor
        return new Response(
            JSON.stringify({ message: 'Error en el servidor', error: error.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}