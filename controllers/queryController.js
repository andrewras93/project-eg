const database = require('../models/database.js');

module.exports = {
    
    handleQuery: (query) => {
        return new Promise((resolve, reject) => { // TODO: Research mere omkring Promises.
            database.query(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }

}