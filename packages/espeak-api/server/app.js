/**
 * @name eSpeak API
 * @file app.js
 * @description Initializes eSpeak.
 * @author Sam Reaves
 * @date May 2nd, 2017
 */

 // Import Express and initialize server.
// import { spawn } from 'child_process';
const espeak     = require('espeak'),
      express    = require('express'),
      path       = require('path'),
      bodyParser = require('body-parser'),
      cors       = require('cors'),
      stream     = require('stream'),
      app        = module.exports.app = exports.app = express(),
      server     = app.listen(3000, () => {

        const host = server.address().address,
              port = server.address().port;

        // Logs a message to let dev know we're up and running.
        console.info('Example app listening at http://%s:%s', host, port);
      });

 // Disabled x-powered-by header
 app.disable('x-powered-by');

 // Use body parser to parse both application/json and application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

 // Set up cross origin resource sharing defaults
 app.use(cors());

/* send home page as file */
const renderHomePage = (response) => {
  response.sendFile(path.join(__dirname, '../client/index.html'));
};

/* On receipt of POST, log the message the server received */
app.post('/', (request, response) => {
  const message = request.body.message;
  console.info('Message received: ', message);

  espeak.speak(message, (err, wav) => {
    if (err) {
      console.error(err);
      response.status(500).send('Server error');
    }

    console.info(wav.buffer.length);

    response.set({
      'Content-Type': 'audio/wav',
      'Content-Length': wav.buffer.length,
    });

    // Initiate the source
    const bufferStream = new stream.PassThrough();

    // Write your buffer
    bufferStream.end(wav.buffer);

    // Pipe it to something else
    bufferStream.pipe(response);
  });
});


// optionally add custom cli arguments for things such as pitch, speed, wordgap, etc.
// espeak.speak('hello world, slower', ['-p 60', '-s 90', '-g 30'], function(err, wav) {});


 // Hello World handler
 app.get('/', (request, response) => {
   renderHomePage(response);
 });

 module.exports = server;
