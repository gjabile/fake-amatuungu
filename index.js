const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


module.exports = app;
