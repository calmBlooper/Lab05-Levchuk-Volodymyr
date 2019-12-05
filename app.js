const express=require('express')
const app=express()

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

/*
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
  	console.log("there is a problem")
    console.error(err)
    return
  }
  console.log("success");
  const db = client.db('kennel')
const collection = db.collection('dogs')
collection.remove({})
collection.insertOne({name: 'Roger', year: '1999'}, (err, result) => {

})
collection.insertMany([{name: 'Togo'}, {name: 'Syd'}], (err, result) => {

})
collection.find().toArray((err, items) => {
  console.log(items)
})

  //...
})*/

//set the template engine ejs
app.set('view engine','ejs')

//middlewares
app.use(express.static('public'))

//routes
app.get('/',(req,res)=>{
	res.render('index')
})
server = app.listen(3000);

//socket.io instantiation
const io = require("socket.io") (server)

//listen on every connection
io.on('connection', (socket)=>{
	console.log('New user connected')
	let info;
	mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
  //	console.log("there is a problem")
    console.error(err)
    return
  }
 // console.log("success");
  const db = client.db('kennel')
const collection = db.collection('messages')

collection.find().toArray((err, items) => {
info=items;
socket.emit('hello', info);

})
  //...
})

  
	//default username
	socket.username="Anonymous"

	//listen on change_username
	socket.on('change_username',(data)=>{
		socket.username=data.username
	})
socket.on('delete_message',(data)=>{
	//console.log(data.message);
	//.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );

	mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
  	console.log("there is a problem")
    console.error(err)
    return
  }
 // console.log("success");
  const db = client.db('kennel')
  //db.messages.remove({})
let collection2 = db.collection('messages')

collection2.deleteOne({message:data.message.substring(0,12)+data.message.substring(13,20)+ data.message.substring(21,data.message.length-1)}, function(err, obj) {
    
    	let info2;
	mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
  //	console.log("there is a problem")
    console.error(err)
    return
  }
 // console.log("success");
  const db = client.db('kennel')
const collection = db.collection('messages')

collection.find().toArray((err, items) => {
info2=items;
io.sockets.emit('refresh', info2);

})
  //...
})


    if (err) throw err;
    //console.log(data.message.substring(0,12)+data.message.substring(13,20)+ data.message.substring(21,data.message.length-1));
   // console.log("1 document deleted");
   // db.close();
  });
});

/*collection2.find().toArray((err, items) => {
console.log(items);
})*/
//collection.update (collection.remove({message : data.message}));

  //...




//end f delete
})
	//listen on new message
	socket.on('new_message',(data)=>{
		//broadcast the new message
		io.sockets.emit('new_message',{message:data.message, username:socket.username});
			let today = new Date();
	let ss=today.getSeconds();
	let mns=today.getMinutes();
	let hrs=today.getHours();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let theMessage ="<font color=#117743>"+socket.username+"</font> at "+hrs+":"+mns+":"+ss+" "+dd +"/"+mm+"/"+yyyy +" wrote:"+"<p style=\"word-wrap: break-word;\">"+data.message+"</p";
		mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
  	//console.log("there is a problem")
    console.error(err)
    return
  }
  //console.log("success");
  const db = client.db('kennel')
const collection = db.collection('messages')
collection.insertOne({message : theMessage}, (err, result) => {

})
collection.find().toArray((err, items) => {

})
  //...
})
	})
	  
})

