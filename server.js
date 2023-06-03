const express = require("express");
const app = express();
require("dotenv").config();



app.use(express.json());


app.get("/", (req, res) =>
  res.send(
    `<h1 style="text-align:Center;color:blue">Welcome in Mock 7</h1>`
  )
);


const userRouter=require('./routes/route.user')
const productRouter=require('./routes/route.product')


app.use('/api',userRouter) 
app.use('/api',productRouter )


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
