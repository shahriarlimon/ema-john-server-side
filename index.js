const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/*emaJohn1 0iJo8shXcZ47Exau */

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sn0bg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const productsCollection = client.db("emaJohn").collection("products");

    /* GET AND READ ALL PRODUCTS: http://localhost:5000/products */
    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page);
      const pageNumber = parseInt(req.query.pageNumber);
      const query = {};
      const cursor = productsCollection.find(query);
      let products;
      if (page || pageNumber) {
        products = await cursor
          .skip(page * pageNumber)
          .limit(pageNumber)
          .toArray();
      } else {
        products = await cursor.toArray();
      }

      res.send(products);
    });
    /* COUNT FOR PAGINATION */
    app.get("/productsCount", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const count = await productsCollection.estimatedDocumentCount();
      res.send({ count });
    });

    /* use post to get products by ids */
    app.post("/productByKeys", async (req, res) => {
      const keys = req.body;
      const ids = keys.map(id=>ObjectId(id))
      console.log(ids);
      

     /*  const query = { _id: { $in: ids } };
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products); */
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("ema john is running");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
