const fs = require('fs');
const pdf = require('html-pdf');
const html = fs.readFileSync('./index.html', 'utf8');
const options = { format: 'A4' };

pdf.create(html, options).toFile('./index.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
