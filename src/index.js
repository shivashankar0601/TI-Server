/*
- Description: This file contains the routing and the services running for both chat and payment services
- Feature: Backend for both user profiles, payment and chat feature
- Author: Trushita Maurya, Shiva Shankar Pandillapalli (Both)
*/

/**
 * References:
 * https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 * https://socket.io/docs/v4/
 */

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const eProfileRouter = require("../routers/eProfileRouter");
const chatRouter = require("../routers/chatRouter/index");

// creating a socket io connection on a different port for the chat module where users can chat with each other
const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
  },
  credentials: true,
});

/**
 * Using dotenv package, it reads the .env file provided which contains all the secrets and tokens for
 * mongo and jwt.
 */
// dotenv.config({ path: "../.env" });
dotenv.config({ path: path.resolve(__dirname, "../.env") });
/**
 * Creating a new express application.
 */
const app = express();
const PORT = process.env.PORT || 8000;

/**
 * Make the server application listen on the port declared above.
 */
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

/**
 * The app will use json for data parsing, cookie parser for cookies, cors for cross origin requests
 * because server and client will be runnig on different domains and requests are made from different domain.
 */
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

//cors issues middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

/**
 * Using mongoose package, the application will connect to the mongoDB.
 */
mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  /**
   * If there is an error sending the response, the error is being logged into the console.
   */
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

/**
 * The below app.use() function is used to mount the specified router function at the path
 * which is being specified.
 */
app.use("/ep", eProfileRouter);
app.use("/chat", chatRouter);

// chat module connection managing and updating the chats accordingly when there is a change in the chat messages between the users
io.on("connection", (socket) => {
  console.log(socket.id);
  const chatModel = require("../models/chatModel/index");
  chatModel.watch().on("change", async (data) => {
    console.log(data);
    let res = await chatModel.findById({ _id: data.documentKey._id });
    console.log("emmitting event");
    socket.emit("update", res);
  });
});

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")("sk_test_Hrs6SAopgFPF0bZXSN3f6ELN");

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  // console.log("it has come here", req.body);
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(
  4242,
  () => console.log("Node server listening on port 4242!")
);
