const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the tasks page');
});

router.post('/', (req, res) => {
  res.send('Resource created successfully');
});

router.put('/:id', (req, res) => {
  const resourceId = req.params.id;
  res.send(`Resource with ID ${resourceId} updated successfully`);
});

router.delete('/:id', (req, res) => {
  const resourceId = req.params.id;
  res.send(`Resource with ID ${resourceId} deleted successfully`);
});

module.exports = router;
