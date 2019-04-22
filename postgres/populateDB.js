'use strict';
const {pool} = require('./postgres.js');
var faker = require('faker');



/*------------------------------------------------------*/

// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;


// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   //Check if work id is died
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });

// } else {
//   // This is Workers can share any TCP connection
//   // It will be initialized using express
//   console.log(`Worker ${process.pid} started`);

// let worker = cluster.worker.id;
// console.log(`Running on worker with id ==> ${worker}`);
// }

/*------------------------------------------------------*/

// const fastcsv = require('fast-csv');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
	path: 'out.csv',
	header: [
		// {id: 'id', title: 'ID'},
		{id: 'host', title: 'Host'},
		{id: 'message', title: 'Message'}
	]
})

let idNum = 0;
// var randomName = faker.name.findName();
// var randomCard = faker.helpers.createCard();

let tempArray = [];
const million = () => {
	for (let i = 0; i < 1000000; i++) {
		var obj = {
			// id: idNum,
			host: faker.name.findName(),
			message: faker.lorem.sentence()
		};
		tempArray.push(obj);
	}
}
million();
var promiseArray = [];
const createCSV = (num) => {
	// const ws = writer.pipe(fs.createWriteStream('out.csv', {flags: 'a'})) 
	// console.time('hi');
	// const ws = fs.createWriteStream("output.csv");
	for (let i = 0; i < num; i++) {
		promiseArray.push(new Promise ((resolve, reject) => {
			csvWriter.writeRecords(tempArray, function (err) {
				if (err) {
					reject(err, 'error')
				} else {
					resolve('success!')
				}
			});
			// await fastcsv  
			// 	.write(tempArray, { headers: true })
			// 	.pipe(ws);
			// tempArray = [];
		}))
	}
	// console.timeEnd('hi');
	// console.log('Created '+idNum+' Amount of Data')
}
createCSV(3);
var results = Promise.all(promiseArray);
results.then(data => console.log(data)).then(data => console.log(data))

async function addToDB () {
	await pool.query(`CREATE TABLE messages(
		id SERIAL PRIMARY KEY,
		host TEXT,
		message TEXT
	);`, (err) => {
		if (err) {
			console.error(err, ' <-- Error creating DB Table');
		} 
		else console.log('<----- Successfully created DB Table');
	})
	await pool.query(`\\copy messages FROM '/Users/macbook/Desktop/host-neighborhood/FeC/out.csv' DELIMITER ',' CSV`, (err) => {
		if (err) {
			console.error(err, ' <-- Error copying csv into postgreSQL');
		} 
		else console.log('<----- CSV to postgreSQL works!');
	})
}




/*------------------------------------------------------*/

// fastcsv  
//   .write(tempArray, { headers: true })
//   .pipe(ws);

// (beginCommit = async () => {
// 	const client = await pool.connect();
// 	const host = "Jim"
// 	const message = "i dont workout"
// 	try {
// 		await client.query('BEGIN')

// 		for (let i = 0; i < 1000; i++) {
// 			await client.query(`insert into messages
// 			(toHost, messageBody) values ($1, $2)`, [host, message])
// 		}

// 		await client.query('COMMIT')
// 	} catch (e) {
// 		await client.query('ROLLBACK')
// 		throw e
// 	} finally {
// 		client.release()
// 	}
// })

// (repeat = async () => {
// 	console.time('timer')
// 	for (let i = 0; i < 10; i++) {
// 		await beginCommit();
// 	}
// 	await console.timeEnd('timer')
// })
// repeat()

/*------------------------------------------------------*/

// async function add (host, message) {                                                                                                     
// 	for (let i = 0; i < 1000; i++) {
// 		await pool.query(`insert into messages
// 			(toHost, messageBody) values ($1, $2)`, [host, message], (err) => {
	
// 			if (err) {
// 				console.error(err, ' <-- Error occured on sending a message to host, check post /contact/:host/message in server/index.js line 45');
// 			} 
			
// 			else console.log('works! ', i);
// 		})
// 	}
// }

// async function action () {
// 	console.time('timer');
// 	for (let i = 0; i < 10; i++) {
// 		add('Tom', 'my message');
// 	}
// 	console.timeEnd('timer');
// }

// action();