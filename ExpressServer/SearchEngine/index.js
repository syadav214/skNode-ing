const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const getProperties = (_index) => {
  return new Promise((resolve, reject) => {
    client.indices
      .getMapping({
        index: _index,
      })
      .then((resp) => {
        let properties = undefined;
        if (resp && resp.body && resp.body.hasOwnProperty(_index)) {
          if (resp && resp.body && resp.body.hasOwnProperty(_index)) {
            const indexMapping = resp.body[_index];
            if (
              indexMapping &&
              indexMapping.mappings &&
              indexMapping.mappings.properties
            ) {
              properties = indexMapping.mappings.properties;
            }
          }
        }
        resolve(properties);
      })
      .catch((e) => reject(e));
  });
};

module.exports = async (_index, phrase) => {
  const hits = [];
  //console.log('mapp', await getProperties(_index))
  
  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
      body: {
        query: {
          multi_match: {
            fields: ['firstname','lastname','gender','employer','email','city','state','address'],
            query: phrase,
            type: 'phrase_prefix',
            //lenient: true
          },
        },
      },
    })
    .catch((e) => console.log('errr', e));

  if (
    searchResult &&
    searchResult.body &&
    searchResult.body.hits &&
    searchResult.body.hits.hits &&
    searchResult.body.hits.hits.length > 0
  ) {
    hits.push(...searchResult.body.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};
