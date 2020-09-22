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

const phraseSearch = async (_index, phrase) => {
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
        highlight: {
          fields: {
            firstname: {},
            lastname: {},
            gender: {},
            employer: {},
            email: {},
            city: {},
            state: {},
            address: {},
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
    hits.push(...searchResult.body.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

const facets = async (_index, facet) => {
  const buckets = [];
  const facetsResult = await client
    .search({
      index: _index,
      body: {
        aggs: {
          all: {
            terms: { field: `${facet}.keyword` },
          },
        },
      },
    })
    .catch((e) => console.log('errr', e));

  if (
    facetsResult &&
    facetsResult.body &&
    facetsResult.body.aggregations &&
    facetsResult.body.aggregations.all &&
    facetsResult.body.aggregations.all.buckets.length > 0
  ) {
    buckets.push(...facetsResult.body.aggregations.all.buckets);
  }

  return {
    bucketCount: buckets.length,
    buckets,
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
  phraseSearch,
  facets,
  facetSearch,
};
