import Screenshot from './handlers/getScreenshot';
import PDF from './handlers/getPDF';

//ts file was not compling with given code. so, changed to js
const HTML = require('./handlers/getHTML');

let argv = process.argv;
let url: string =
    'https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program',
  filename: string = 'pass-command-line-argument';

(async () => {
  switch (argv[2]) {
    case '1':
      filename += '.jpg';
      await Screenshot(url, filename);
      break;
    case '2':
      filename += '.pdf';
      await PDF(url, filename);
      break;
    case '3':
      filename += '.txt';
      await HTML(url, filename);
      break;
    default:
      console.log('Invalid Argument');
      break;
  }
})();
