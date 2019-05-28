const MongoClient = require("mongodb").MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://UmarKhan:2bnHHNLDIW37zufm@recipecluster-r6cjr.mongodb.net/test?retryWrites=true"
  )
    .then(client => {
      console.log("Connected");
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });

  //   const uri =
  //     "mongodb+srv://UmarKhan:2bnHHNLDIW37zufm@recipecluster-r6cjr.mongodb.net/test?retryWrites=true";
  //   const client = new MongoClient(uri, { useNewUrlParser: true });
  //   client.connect(err => {
  //     const collection = client.db("test").collection("devices");
  //     // perform actions on the collection object
  //     client.close();
  //   });
};

module.exports = mongoConnect;
