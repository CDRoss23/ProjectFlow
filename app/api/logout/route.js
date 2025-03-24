// app/api/logout/route.js
import { cookies } from 'next/headers';
import pool from '../../lib/db'; 

export async function POST(request) {
    const token = cookies().get('token')?.value;

    if (!token) {
        return new Response(JSON.stringify({ message: 'No autorizado' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        // Eliminar el token de la base de datos
        await pool.query('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);

        // Eliminar la cookie
        cookies().delete('token');

        return new Response(JSON.stringify({ message: 'Logout exitoso' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error en el servidor', error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}