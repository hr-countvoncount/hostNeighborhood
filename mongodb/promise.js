const {MongoClient} = require("mongodb");
const faker = require("faker");

const url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParse: true}).then(client => {
  const db = client.db('airbnb');

  const collection = db.collection("host")

  let reviewCount = 0;
  let reviewId = 1;

  const createReviews = async () => {
    
    let reviews = [];
    for (let i = 0; i < 1000; i++) {
      reviews.push({
        id: reviewId,
        host: faker.name.firstName(),
        message: faker.lorem.sentences()
      })
      reviewId++;
    }
    return collection.insertMany(reviews);
  };

  const insertBulk = () => {
    if (reviewCount < 10000) {
      reviewCount++;
      createReviews().then(()=>{
        insertBulk();
      })
    } else {
      console.timeEnd('time');
      client.close();
    }
  };

  console.time("time");
  insertBulk();
});