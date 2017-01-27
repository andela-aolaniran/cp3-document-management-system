import express from 'express';

const app = express();
console.log('Set up express');

app.get('/', (req, res) => {
  res.send('Welcome to greatness again and again');
});
app.listen(3890, () => {
  console.log('App Listening on port 3899');
});
