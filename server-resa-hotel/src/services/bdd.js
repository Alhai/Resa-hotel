const mysql = require('mysql2');
const dbConfig = require('../../mysqlConf');


// Créez une pool de connexions
const connection = mysql.createPool(dbConfig);

// Gérer les erreurs de la base de données
connection.on('error', (err) => {
    console.error('Database error:', err);
});

/** Test accès à la BDD **/
function testBdd(username) {
    const queryCheckPseudo = 'SELECT * FROM user WHERE username = ?';
    return new Promise((resolve, reject) => {
        connection.query(queryCheckPseudo, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                const row = result[0];
                let data = { name: row.username, id: row.user_id, email: row.email,role: row.role };
                resolve(data);
            }
        });
    });
}

module.exports = {
    TestLoginBDD: testBdd,
}