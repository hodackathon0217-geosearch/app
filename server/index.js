'use strict';

const express = require('express');
const path = require('path');
const api = require('./api');

const PORT = 3000;
const BUILD_FOLDER = path.resolve('../_build');

const app = express();

app.use('/api', api.create());
app.use(express.static(__dirname + BUILD_FOLDER));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
