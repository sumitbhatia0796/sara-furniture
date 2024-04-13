// blog_app/config/db.js

const mongoose = require("mongoose");

const connectDB = ()=> {

  const url = "mongodb+srv://sumitbhatia0796:RfBA4HZbfGr3lSmI@furniture-web.mzho3dq.mongodb.net/furniture?retryWrites=true&w=majority";

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}

module.exports.connectDB = connectDB;
