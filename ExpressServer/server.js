const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/', (req, res) => {
  res.json(req.body);
});

app.get('/search/:index', async (req, res) => {
  const { search } = require('./SearchEngine');
  const data = await search(req.params.index, req.query.phrase);
  res.json(data);
});

app.get('/facetSearch/:index/:facet', async (req, res) => {
  const { facetSearch } = require('./SearchEngine');
  const data = await facetSearch(req.params.index, req.params.facet, req.query.phrase);
  res.json(data);
});

app.listen(3333, () => console.log('server running at 3333'));
