// app/api/login/route.js
import pool from '../../lib/db'; // Asegúrate de que la ruta sea correcta

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length > 0) {
            const user = rows[0];
            // Aquí deberías comparar la contraseña hasheada
            if (user.contraseña === password) {
                return new Response(JSON.stringify({ message: 'Login exitoso', user }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                return new Response(JSON.stringify({ message: 'Contraseña incorrecta' }), {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        } else {
            return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error en el servidor', error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}