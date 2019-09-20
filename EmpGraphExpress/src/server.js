const app = require('./graphql');
const port = 3001;
app.listen(port, ()=> console.log('running on port: ', port));