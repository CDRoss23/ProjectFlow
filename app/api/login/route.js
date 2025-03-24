import pool from '../../lib/db';

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length > 0) {
            const user = rows[0];

            if (password === user.contraseña) {
                return new Response(
                    JSON.stringify({
                        message: 'Login exitoso',
                        user: {
                            id: user.id,
                            nombre: user.nombre,
                            email: user.email,
                            rol: user.rol,
                        },
                    }),
                    {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            } else {
                return new Response(
                    JSON.stringify({ message: 'Contraseña incorrecta' }),
                    {
                        status: 401,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }
        } else {
            return new Response(
                JSON.stringify({ message: 'Usuario no encontrado' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error en el servidor', error: error.message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
