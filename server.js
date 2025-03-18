import "./require.js";

const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('./data/database.js');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
swaggerDocument.host = process.env.SWAGGER_HOST;
swaggerDocument.schemes = process.env.SWAGGER_SCHEMES;

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.id, `Caught Exception ${err}\nException Origin: ${origin}`);
})

mongo.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening. Node running on port ${port}`) });
    }
});
