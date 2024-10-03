import mysql from "mysql2";
const dbConfig = require('./mysqlConf');


export class Bdd {

     connection = ()=>{
        // Gérer les erreurs de la base de données
        if (mysql.createPool(dbConfig).on("error", (err)=>{
            return console.error('Database error:', err);
        }))

        return mysql.createPool(dbConfig);
    }


    /** Test accès à la BDD **/
     testBdd(username:string) {
        const queryCheckPseudo = 'SELECT * FROM user WHERE username = ?';
        const db:any = this.connection();
        return new Promise((resolve, reject) => {
            db.query(queryCheckPseudo, [username], (err:any, result:any) => {
                if (err) {
                    reject(err);
                } else {
                    const row = result[0];
                    let data = {name: row.username, id: row.user_id, email: row.email, role: row.role};
                    resolve(data);
                }
            });
        });
    }
}
/*
module.exports = {
    TestLoginBDD: testBdd,
    connection: connection,
}*/
