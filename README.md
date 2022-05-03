# project-eg

```

### Controllers.

const database = require('../models/database.js');

module.exports = {

    // Example of getting data from database.
    methodName: (query) => {
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

### Routes.

const controller = require('../controllers/controller');

router.get('/', async function (req, res) {
    const data = await controller.methodName('query');
    res.send(data);
});

```
