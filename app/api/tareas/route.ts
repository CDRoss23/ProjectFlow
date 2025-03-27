// api/tareas/route.ts
import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas ORDER BY fechaInicio DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombreProyecto, descripcion, fechaInicio, fechaFin, estado } = body;
        const storedUser = request.headers.get('x-user-email') || '';

        if (!nombreProyecto || !descripcion || !fechaInicio || !fechaFin) {
            return NextResponse.json({ 
                error: 'Todos los campos son obligatorios' 
            }, { status: 400 });
        }

        const [result] = await pool.query(
            'INSERT INTO tareas (nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado) VALUES (?, ?, ?, ?, ?, ?)',
            [nombreProyecto, descripcion, fechaInicio, fechaFin, storedUser, estado || 'pendiente']
        );

        return NextResponse.json({ 
            message: 'Tarea creada correctamente', 
            id: (result as any).insertId 
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Error al crear tarea' 
        }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado } = body;

        if (!id) {
            return NextResponse.json({ 
                error: 'ID de tarea es requerido' 
            }, { status: 400 });
        }

        const [result] = await pool.query(
            'UPDATE tareas SET nombreProyecto = ?, descripcion = ?, fechaInicio = ?, fechaFin = ?, creadoPor = ?, estado = ? WHERE id = ?',
            [nombreProyecto, descripcion, fechaInicio, fechaFin, creadoPor, estado, id]
        );

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ 
                error: 'Tarea no encontrada' 
            }, { status: 404 });
        }

        const [updatedRows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]) as [Array<{ id: number; nombreProyecto: string; descripcion: string; fechaInicio: string; fechaFin: string; creadoPor: string; estado: string }>, any];
        return NextResponse.json(updatedRows[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Error al actualizar tarea' 
        }, { status: 500 });
    }
}