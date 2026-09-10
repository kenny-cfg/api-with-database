const express = require('express');
const api = express();
const port = 3000;
api.use(express.json());

api.listen(port, () => {
  console.log(`Listening on port ${port}`);
})