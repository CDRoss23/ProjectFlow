import pool from './db';

export const logActividad = async (usuarioEmail, accion, detalles = null) => {
  try {
    await pool.query(
      'INSERT INTO logs_actividad (usuario_email, accion, detalles) VALUES (?, ?, ?)',
      [usuarioEmail, accion, detalles]
    );
  } catch (error) {
    console.error('Error al registrar actividad:', error);
  }
};

export const logAcceso = async (usuarioEmail, ip, dispositivo) => {
  try {
    await pool.query(
      'INSERT INTO logs_acceso (usuario_email, ip, dispositivo) VALUES (?, ?, ?)',
      [usuarioEmail, ip, dispositivo]
    );
  } catch (error) {
    console.error('Error al registrar acceso:', error);
  }
};

export const logSistema = async (nivel, mensaje, origen = 'Aplicación') => {
  try {
    await pool.query(
      'INSERT INTO logs_sistema (nivel, mensaje, origen) VALUES (?, ?, ?)',
      [nivel, mensaje, origen]
    );
  } catch (error) {
    console.error('Error al registrar log del sistema:', error);
  }
};