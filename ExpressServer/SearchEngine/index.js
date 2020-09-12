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

const highlightingResults = (hits, phrase) => {
  phrase = phrase.toLowerCase();
  for (let i in hits) {
    hits[i]['_highlightResult'] = highlightingResults2(hits[i]._source, phrase);
  }
  return hits;
};

const highlightingResults2 = (source, phrase) => {
  const _highlightResult = {};
  for (let i in source) {
    const sourceField = source[i].toString().toLowerCase();
    const matched = sourceField.includes(phrase);
    _highlightResult[i] = {
      matched,
      matchedWords: matched ? phrase : '',
      value: source[i],
    };
  }
  return _highlightResult;
};

const search = async (_index, phrase) => {
  const hits = [];
  //console.log('mapp', await getProperties(_index))

  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
      body: {
        query: {
          multi_match: {
            fields: [
              'firstname',
              'lastname',
              'gender',
              'employer',
              'email',
              'city',
              'state',
              'address',
            ],
            query: phrase,
            type: 'phrase_prefix',
            //lenient: true
          },
        },
      },
    })
    .catch((e) => console.log('errr', e));
  //console.log('searchResult',searchResult)
  if (
    searchResult &&
    searchResult.body &&
    searchResult.body.hits &&
    searchResult.body.hits.hits &&
    searchResult.body.hits.hits.length > 0
  ) {
    let hitsArr = searchResult.body.hits.hits;
    //console.log('hitsObj',...searchResult.body.hits.hits)
    hitsArr = highlightingResults(hitsArr, phrase);
    hits.push(...hitsArr);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

const facetResults = (hits, facet) => {
  const result = [];
  for (let i in hits) {
    result.push(hits[i]._source[facet]);
  }
  return result;
};

const facetSearch = async (_index, facet, phrase) => {
  const hits = [];
  //console.log('mapp', await getProperties(_index))

  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
      body: {
        query: {
          multi_match: {
            fields: [facet],
            query: phrase,
            type: 'phrase_prefix',
            //lenient: true
          },
        },
      },
    })
    .catch((e) => console.log('errr', e));
  //console.log('searchResult',searchResult)
  if (
    searchResult &&
    searchResult.body &&
    searchResult.body.hits &&
    searchResult.body.hits.hits &&
    searchResult.body.hits.hits.length > 0
  ) {
    let hitsArr = searchResult.body.hits.hits;
    hitsArr = facetResults(hitsArr, facet);
    hits.push(...hitsArr);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

module.exports = {
  search,
  facetSearch,
};
