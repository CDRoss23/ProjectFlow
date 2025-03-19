// app/api/auth/verify/route.js
import { cookies } from 'next/headers';
import pool from '../../lib/db'; 

export async function GET() {
    try {
        // Obtener el token de la cookie
        const token = cookies().get('token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ message: 'No autorizado' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Verificar el token en la base de datos
        const result = await pool.query('SELECT * FROM usuarios WHERE token = $1', [token]);

        if (result.rows.length === 0) {
            return new Response(JSON.stringify({ message: 'No autorizado' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Si el token es válido, devolver los datos del usuario
        const user = result.rows[0];
        return new Response(JSON.stringify({ message: 'Autorizado', user }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error en el servidor', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
