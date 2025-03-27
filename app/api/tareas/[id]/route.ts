// api/tareas/[id]/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Error fetching task:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Error interno del servidor' 
        }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const body = await request.json();
        const { nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado } = body;

        const [result] = await pool.query(
            'UPDATE tareas SET nombreProyecto = ?, descripcion = ?, fechaInicio = ?, fechaFin = ?, creadoPor = ?, estado = ? WHERE id = ?',
            [nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado, id]
        );

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
        }

        const [updatedRows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);
        return NextResponse.json(updatedRows[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Error interno del servidor' 
        }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const [result] = await pool.query('DELETE FROM tareas WHERE id = ?', [id]);

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Error interno del servidor' 
        }, { status: 500 });
    }
}