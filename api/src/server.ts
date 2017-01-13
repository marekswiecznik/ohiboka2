import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { BraceletService }  from './bracelet/bracelet.service';

var app = express();
var port = process.env.PORT || 8080;        // set our port

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://mo1062_bracelet:Qs2fXUc4Qmj1qdCp8Pp5@mongo10.mydevil.net:27017/mo1062_bracelet'); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hello!' });
});

var braceletService = new BraceletService();

router.route('/bracelets')
  .post(braceletService.create)
  .get(braceletService.all);

router.route('/bracelets/:bracelet_id')
  .get(braceletService.one)
  .put(braceletService.save)
  .delete(braceletService.delete);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens');