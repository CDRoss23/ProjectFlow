import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import { logActividad } from '../../lib/logger';

// Manejo de roles
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    // Obtener todos los roles con sus descripciones desde la tabla roles
    const [roles] = await connection.query(`
      SELECT r.rol, r.descripcion 
      FROM roles r
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
        descripcion: rolObj.descripcion || null,
        permisos
      };
    }));
    
    connection.release();
    return NextResponse.json(rolesConPermisos);
  } catch (error) {
    console.error('Error:', error);
    await logActividad(
      'sistema',
      'Error al obtener roles',
      error.message
    );
    return NextResponse.json({ error: 'Error al obtener roles' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { rol, descripcion, permisos, usuario } = await request.json();
    const connection = await pool.getConnection();
    
    // Verificar si el rol ya existe en la tabla roles
    const [existe] = await connection.query(
      'SELECT 1 FROM roles WHERE rol = ? LIMIT 1', 
      [rol]
    );
    
    if (existe.length > 0) {
      connection.release();
      await logActividad(
        usuario?.email || 'sistema',
        'Intento de creación de rol fallido',
        `Rol ${rol} ya existe`
      );
      return NextResponse.json({ error: 'El rol ya existe' }, { status: 400 });
    }
    
    // Crear el nuevo rol en la tabla roles
    await connection.query(
      'INSERT INTO roles (rol, descripcion) VALUES (?, ?)',
      [rol, descripcion]
    );
    
    // Insertar permisos para el nuevo rol
    await Promise.all(permisos.map(async (permisoId) => {
      await connection.query(
        'INSERT INTO rol_permisos (rol, permiso_id) VALUES (?, ?)',
        [rol, permisoId]
      );
    }));
    
    connection.release();
    
    // Registrar actividad
    await logActividad(
      usuario?.email || 'sistema',
      'Creación de nuevo rol',
      `Rol: ${rol}, Descripción: ${descripcion}, Permisos: ${permisos.join(', ')}`
    );
    
    return NextResponse.json({ 
      message: 'Rol creado exitosamente' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    await logActividad(
      'sistema',
      'Error al crear rol',
      error.message
    );
    return NextResponse.json({ 
      error: 'Error al crear rol: ' + error.message 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { rol, descripcion, permisos, usuario } = await request.json();
    const connection = await pool.getConnection();
    
    // Actualizar la descripción del rol en la tabla roles
    await connection.query(
      'UPDATE roles SET descripcion = ? WHERE rol = ?',
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
    
    // Registrar actividad
    await logActividad(
      usuario?.email || 'sistema',
      'Actualización de rol',
      `Rol: ${rol}, Descripción: ${descripcion}, Permisos: ${permisos.join(', ')}`
    );
    
    return NextResponse.json({ 
      message: 'Rol actualizado exitosamente' 
    });
  } catch (error) {
    console.error('Error:', error);
    await logActividad(
      'sistema',
      'Error al actualizar rol',
      error.message
    );
    return NextResponse.json({ 
      error: 'Error al actualizar rol: ' + error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { rol, usuario } = await request.json();
    const connection = await pool.getConnection();

    // Verificar si hay usuarios con este rol
    const [usuarios] = await connection.query(
      'SELECT COUNT(*) as count FROM usuarios WHERE rol = ?',
      [rol]
    );

    if (usuarios[0].count > 0) {
      connection.release();
      await logActividad(
        usuario?.email || 'sistema',
        'Intento de eliminación de rol fallido',
        `Rol ${rol} tiene usuarios asignados`
      );
      return NextResponse.json(
        { error: 'No se puede eliminar el rol porque hay usuarios asignados a él' }, 
        { status: 400 }
      );
    }

    // Eliminar de la tabla roles
    await connection.query(
      'DELETE FROM roles WHERE rol = ?',
      [rol]
    );

    // Eliminar permisos asociados
    await connection.query(
      'DELETE FROM rol_permisos WHERE rol = ?',
      [rol]
    );

    connection.release();
    
    // Registrar actividad
    await logActividad(
      usuario?.email || 'sistema',
      'Eliminación de rol',
      `Rol: ${rol} eliminado completamente`
    );

    return NextResponse.json({
      message: 'Rol eliminado completamente del sistema'
    });
  } catch (error) {
    console.error('Error:', error);
    await logActividad(
      'sistema',
      'Error al eliminar rol',
      error.message
    );
    return NextResponse.json({
      error: 'Error al eliminar rol: ' + error.message
    }, { status: 500 });
  }
}

// Manejo de perfiles de usuario
export async function PUTProfile(req) {
  const { user, data } = await req.json();
  
  try {
    const connection = await pool.getConnection();
    
    // Construir la consulta de actualización dinámica
    const campos = Object.keys(data);
    const valores = Object.values(data);
    
    const setClause = campos.map(campo => `${campo} = ?`).join(', ');
    
    await connection.query(
      `UPDATE usuarios SET ${setClause} WHERE email = ?`,
      [...valores, user.email]
    );
    
    connection.release();
    
    // Registrar actividad
    await logActividad(
      user.email,
      'Actualización de perfil',
      `Campos actualizados: ${campos.join(', ')}`
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    await logActividad(
      user.email, 
      'Error al actualizar perfil', 
      error.message
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}