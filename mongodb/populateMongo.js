// const mongo = require('./mongo.js')
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'airbnb';

const client = new MongoClient(url);
// module.exports.populateMongo = () => {
  client.connect((err) => {
    if (err) {console.error(err)}
    else {
      console.log("Successfully connected to Server");
      const db = client.db(dbName);
      console.time('TIME: ')
      removeDocument(db, function() {
        insertDocuments(db, function() {
          insertDocuments(db, function() {
            insertDocuments(db, function() {
              insertDocuments(db, function() {
                insertDocuments(db, function() {
                  insertDocuments(db, function() {
                    insertDocuments(db, function() {
                      insertDocuments(db, function() {
                        insertDocuments(db, function() {
                          insertDocuments(db, function() {
                            findDocuments(db, function() {
                              console.timeEnd('TIME: ')
                              client.close();
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      })

    }
  });
// };

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  var batch = collection.initializeOrderedBulkOp();
  // Insert some documents
  
  for (let i = 0; i < 1000000; i++) {
    batch.insert({'host': 'Blob', 'message': 'i like food'});
  }
    
  batch.execute(function(err, result) {
    if (err) {
      console.log('ERROR: ', err)
    } else {
      // console.log('RESULTS: ', result);
      console.log('INSERTED!')
      callback(result);
    }
  });

  // collection.insertMany([
  //   {a : 1}, {a : 2}, {a : 3}
  // ], function(err, result) {
  //   console.log("Inserted 3 documents into the collection");
  //   callback(result);
  // });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    // console.log(docs)
    callback(docs);
  });
}

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where a is 3
  collection.drop(function(err, result) {
    console.log("Removed entire collection");
    callback(result);
  });    
}