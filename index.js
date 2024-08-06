const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


module.exports = app;
