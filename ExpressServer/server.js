const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('hello');
});


app.post('/', (req, res) => {
    res.json(req.body);
  });

app.listen(3333, () => console.log('server running at 3333'));
