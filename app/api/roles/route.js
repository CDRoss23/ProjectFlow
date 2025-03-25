import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    // Obtener todos los roles distintos con sus descripciones
    const [roles] = await connection.query(`
      SELECT DISTINCT rol, descripcion_rol 
      FROM usuarios 
      WHERE rol IS NOT NULL
    `);
    
    // Obtener permisos para cada rol
    const rolesConPermisos = await Promise.all(roles.map(async (rolObj) => {
      const [permisos] = await connection.query(`
        SELECT p.id, p.nombre, p.descripcion 
        FROM rol_permisos rp
        JOIN permisos p ON rp.permiso_id = p.id
        WHERE rp.rol = ?
      `, [rolObj.rol]);
      
      return {
        rol: rolObj.rol,
        descripcion: rolObj.descripcion_rol || null,
        permisos
      };
    }));
    
    connection.release();
    return NextResponse.json(rolesConPermisos);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error al obtener roles' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { rol, descripcion, permisos } = await request.json();
    const connection = await pool.getConnection();
    
    // Verificar si el rol ya existe
    const [existe] = await connection.query(
      'SELECT 1 FROM usuarios WHERE rol = ? LIMIT 1', 
      [rol]
    );
    
    if (existe.length > 0) {
      connection.release();
      return NextResponse.json({ error: 'El rol ya existe' }, { status: 400 });
    }
    
    // Actualizar descripción del rol para todos los usuarios con este rol
    await connection.query(
      'UPDATE usuarios SET descripcion_rol = ? WHERE rol = ?',
      [descripcion, rol]
    );
    
    // Insertar permisos para el nuevo rol
    await Promise.all(permisos.map(async (permisoId) => {
      await connection.query(
        'INSERT INTO rol_permisos (rol, permiso_id) VALUES (?, ?)',
        [rol, permisoId]
      );
    }));
    
    connection.release();
    return NextResponse.json({ 
      message: 'Rol creado exitosamente' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Error al crear rol: ' + error.message 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { rol, descripcion, permisos } = await request.json();
    const connection = await pool.getConnection();
    
    // Actualizar la descripción del rol para todos los usuarios
    await connection.query(
      'UPDATE usuarios SET descripcion_rol = ? WHERE rol = ?',
      [descripcion, rol]
    );
    
    // Eliminar permisos existentes
    await connection.query(
      'DELETE FROM rol_permisos WHERE rol = ?',
      [rol]
    );
    
    // Insertar nuevos permisos
    await Promise.all(permisos.map(async (permisoId) => {
      await connection.query(
        'INSERT INTO rol_permisos (rol, permiso_id) VALUES (?, ?)',
        [rol, permisoId]
      );
    }));
    
    connection.release();
    return NextResponse.json({ 
      message: 'Rol actualizado exitosamente' 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Error al actualizar rol: ' + error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { rol } = await request.json();
    const connection = await pool.getConnection();
    
    // Verificar si hay usuarios con este rol
    const [usuarios] = await connection.query(
      'SELECT COUNT(*) as count FROM usuarios WHERE rol = ?', 
      [rol]
    );
    
    if (usuarios[0].count > 0) {
      // Solo eliminamos la descripción, no el rol de los usuarios
      await connection.query(
        'UPDATE usuarios SET descripcion_rol = NULL WHERE rol = ?',
        [rol]
      );
      
      // Eliminar permisos del rol
      await connection.query(
        'DELETE FROM rol_permisos WHERE rol = ?',
        [rol]
      );
      
      connection.release();
      return NextResponse.json({ 
        message: 'Descripción y permisos del rol eliminados, pero el rol sigue asignado a usuarios' 
      });
    }
    
    // Si no hay usuarios con este rol, eliminamos todo rastro
    await connection.query(
      'DELETE FROM rol_permisos WHERE rol = ?',
      [rol]
    );
    
    connection.release();
    return NextResponse.json({ 
      message: 'Rol eliminado completamente del sistema' 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Error al eliminar rol: ' + error.message 
    }, { status: 500 });
  }
}