import pool from '../../lib/db';

export async function POST(request) {
    const { nombre, email, password } = await request.json();

    try {
        // Aquí deberías hashear la contraseña antes de almacenarla
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, password, 'miembro'] // Asigna un rol por defecto
        );

        return new Response(JSON.stringify({ message: 'Registro exitoso' }), {
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