const express = require('express');
let app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/', express.static('dist'));
const { MongoClient } = require('mongodb');
const con = new MongoClient(
  'mongodb+srv://root:root@cluster0.dzjjnon.mongodb.net/test'
);
let port = 8000;

app.post('/add', async (req, resp) => {
  try {
    let data = req.body;
    let connect = await con.connect();
    let dbConnect = await connect.db('users');
    let table = await dbConnect.collection('userDetails');
    let inputData = await table.insertOne(data);
    resp.status(200).json({ message: 'added', data: inputData });
  } catch (error) {
    resp.status(400).json({ message: 'error', error });
  }
});

app.get('/get', async (req, resp) => {
  try {
    let connect = await con.connect();
    let dbConnect = await connect.db('users');
    let table = await dbConnect.collection('userDetails');
    let getData = await table.find().toArray();
    resp.status(200).json({ message: 'read', data: getData });
  } catch (error) {
    resp.status(400).json({ message: 'error', error });
  }
});

app.listen(port, () => {
  console.log('server is live');
});
