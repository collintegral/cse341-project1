import "./require.js";

const express = require('express');
const mongo = require('./data/database.js');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongo.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening. Node running on port ${port}`) });
    }
});
