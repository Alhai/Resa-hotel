/** Test accès à la BDD **/


async function getAll(connection: {
    query: (arg0: string, arg1: any[], arg2: (err: any, result: any) => void) => void;
}) {
    let page = 1;
    const limit = 10; // Nombre de trajets par page
    let allRows: any[] = [];
    let hasMoreData = true;

    while (hasMoreData) {
        const offset = (page - 1) * limit;
        const querySelectAllRoom = 'SELECT * FROM chambre LIMIT ? OFFSET ?';

        try {
            const rows:any = await new Promise((resolve, reject) => {
                connection.query(querySelectAllRoom, [limit, offset], (err, rows) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return reject({message: err.message});
                    }
                    resolve(rows);
                });
            });

            if (rows.length > 0) {
                allRows = allRows.concat(rows);
                page++;
            } else {
                hasMoreData = false;
            }
        } catch (err:any) {
            console.error('Erreur lors de la récupération des données:', err.message);
            return {message: err.message};
        }
    }

    // console.log(`Données récupérées avec succès pour le joueur ${idPlayer}`);
    return {message: 'yes', data: allRows};
}

module.exports = {
    getAllRoom: getAll,
}