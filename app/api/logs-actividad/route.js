import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const [logs] = await connection.query(`
      SELECT 
        id, 
        fecha, 
        usuario_email, 
        usuario_nombre,
        accion, 
        detalles 
      FROM logs_actividad 
      ORDER BY fecha DESC 
      LIMIT 50
    `);
    
    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener logs de actividad' },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}