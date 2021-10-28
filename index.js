const express = require('express')
const app=express()
const port = process.env.PORT||5000
const { MongoClient } = require('mongodb');
const cors = require('cors')
app.use(cors())
app.use(express.json())

require('dotenv').config()


//id : nasib2900
//pasword: BZjmTHFgfddN3r7E


//connect with mongo db
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.exmhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {

    try {
        await client.connect();
        const database = client.db("onlineShop");
        const productCollection = database.collection("products");


        app.get('/products', async(req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray()
            const count=cursor.count()
            res.send({
                count,
                products
            })
        })

    }


    finally{
    // await client.close();
  }

}


run().catch(console.dir);




app.get('/', (req, res) => {
    console.log('hello world')
    res.send('send succesfully')

})



app.listen(port, () => {
    console.log('listinig succesfull')
})