const database = require('../models/database.js');

module.exports = {
    
    handleQuery: (query) => {
        return new Promise((resolve, reject) => {
            database.query(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }

}