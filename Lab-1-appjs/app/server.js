let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.png"));
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');
});

let mongoUrlLocal = "mongodb://admin:123456@localhost:27017";

let mongoUrlDocker = "mongodb://admin:123456@mongodb";

let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

let databaseName = "my-db";

app.post('/update-profile', function (req, res) {
  let guitarObj = req.body;

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    guitarObj['guitarid'] = 1;

    let myquery = { guitarid: 1 };
    let newvalues = { $set: guitarObj };

    db.collection("guitars").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
      if (err) throw err;
      client.close();
    });

  });
  res.send(guitarObj);
});

app.get('/get-profile', function (req, res) {
  let response = {};
  
  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    let myquery = { guitarid: 1 };

    db.collection("guitars").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      
      res.send(response ? response : {});
    });
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
