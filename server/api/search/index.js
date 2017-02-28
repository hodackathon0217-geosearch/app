'use strict';

const express = require('express');
const controller = require('./controller');

function create() {
  const router = express.Router();
  router.get('/', controller.search);
  return router;
}

module.exports = {
  create,
};
