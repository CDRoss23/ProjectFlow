import { NextResponse } from 'next/server';
import pool from '../../lib/db';

// Obtener todas las tareas
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Crear una nueva tarea
export async function POST(request) {
    try {
        const body = await request.json();
        const { nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado } = body;

        const [result] = await pool.query(
            'INSERT INTO tareas (nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado) VALUES (?, ?, ?, ?, ?, ?)',
            [nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado || 'pendiente']
        );

        return NextResponse.json({ id: result.insertId, ...body });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Actualizar una tarea por ID
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado } = body;

        const [result] = await pool.query(
            'UPDATE tareas SET nombreProyecto = ?, descripcion = ?, fechaInicio = ?, fechaFin = ?, creadoPor = ?, estado = ? WHERE id = ?',
            [nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Tarea actualizada correctamente' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Eliminar una tarea por ID
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const [result] = await pool.query('DELETE FROM tareas WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
