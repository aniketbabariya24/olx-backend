const express = require("express");
const app = express();
// const cors = require("cors");

require("dotenv").config();



app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'https://olx-9qd2.onrender.com'
}));

app.get("/", (req, res) =>
  res.send(
    `<h1 style="text-align:Center;color:blue">Welcome in Mock 8</h1>`
  )
);


const userRouter=require('./routes/route.user')
const productRouter=require('./routes/route.product')


app.use('/users',userRouter) 
app.use('/products',productRouter )


const {dbconnetion}= require('./configs/db')
app.listen(8080, async () => {
  try {
    await dbconnetion;
    console.log(`Connected to Database`);
    console.log(`Server listening on 8080`);
  } catch (error) {
    console.log(`Error while connecting to ${error.message}`);
  }
});
