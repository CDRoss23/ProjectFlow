import { logAcceso, logActividad } from '../../lib/logger';
import pool from '../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        // Consulta a la base de datos
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            // Registrar actividad fallida
            await logActividad(email, 'Intento de inicio de sesión - Usuario no encontrado');
            return NextResponse.json(
                { message: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        const user = rows[0];

        if (password !== user.contraseña) {
            // Registrar actividad fallida
            await logActividad(email, 'Intento de inicio de sesión - Contraseña incorrecta');
            return NextResponse.json(
                { message: 'Contraseña incorrecta' },
                { status: 401 }
            );
        }

        // Registrar acceso exitoso
        await logAcceso(
            email,
            req.headers.get('x-forwarded-for') || req.ip,
            req.headers.get('user-agent')
        );

        // Registrar actividad exitosa
        await logActividad(email, 'Inicio de sesión exitoso');

        // Respuesta exitosa
        return NextResponse.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
            },
        }, { status: 200 });

    } catch (error) {
        // Registrar error del servidor
        await logActividad(email, `Error en el servidor: ${error.message}`);
        return NextResponse.json(
            { message: 'Error en el servidor', error: error.message },
            { status: 500 }
        );
    }
}