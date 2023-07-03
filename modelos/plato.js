const connection = require('../bd');

function obtenerTodosLosPlatos(callback) {
  connection.query('SELECT plato.*, cocinero.nombre AS nombre_cocinero FROM plato JOIN cocinero ON plato.id_cocinero = cocinero.id', (error, results) => {
    if (error) {
      console.error('Error al obtener los platos: ', error);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  obtenerTodosLosPlatos
};