import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const [usuariosActivos] = await connection.query(
      'SELECT COUNT(*) as count FROM logs_acceso WHERE fecha > DATE_SUB(NOW(), INTERVAL 15 MINUTE)'
    );

    const [sesionesHoy] = await connection.query(
      'SELECT COUNT(*) as count FROM logs_acceso WHERE DATE(fecha) = CURDATE()'
    );

    const [erroresSistema] = await connection.query(
      'SELECT COUNT(*) as count FROM logs_sistema WHERE nivel = "error" AND DATE(fecha) = CURDATE()'
    );

    const usoCPU = Math.floor(Math.random() * 30) + 50;
    const usoRAM = Math.floor(Math.random() * 40) + 40;
    const usoAlmacenamiento = Math.floor(Math.random() * 50) + 30;
    
    return NextResponse.json({
      usuariosActivos: usuariosActivos[0].count,
      sesionesHoy: sesionesHoy[0].count,
      erroresSistema: erroresSistema[0].count,
      usoCPU,
      usoRAM,
      usoAlmacenamiento
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
