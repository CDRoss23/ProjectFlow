// app/api/usuarios/route.js
import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT id, nombre, email, rol FROM usuarios');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuarios' }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nombre, email, contraseña, rol } = await request.json();
    
    if (!nombre || !email || !contraseña || !rol) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' }, 
        { status: 400 }
      );
    }

    // Encriptar contraseña en producción (usar bcrypt)
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, contraseña, rol]
    );
    
    return NextResponse.json(
      { 
        id: result.insertId, 
        nombre, 
        email, 
        rol 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear usuario:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'El email ya está registrado' }, 
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Error al crear usuario' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, nombre, email, rol } = await request.json();
    
    if (!id || !nombre || !email || !rol) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' }, 
        { status: 400 }
      );
    }

    await pool.query(
      'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?',
      [nombre, email, rol, id]
    );
    
    return NextResponse.json(
      { id, nombre, email, rol }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'El email ya está registrado' }, 
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Error al actualizar usuario' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID de usuario requerido' }, 
        { status: 400 }
      );
    }

    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    
    return NextResponse.json(
      { message: 'Usuario eliminado correctamente' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json(
      { error: 'Error al eliminar usuario' }, 
      { status: 500 }
    );
  }
}