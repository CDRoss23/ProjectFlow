import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [permisos] = await connection.query('SELECT * FROM permisos');
    connection.release();
    return NextResponse.json(permisos);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error al obtener permisos' }, { status: 500 });
  }
}