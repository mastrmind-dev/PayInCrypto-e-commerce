mongoose = require("mongoose");

module.exports = (app) => {
  mongoose.connect(
    "mongodb+srv://mastermind-dev:fuckearth@cluster0.itds2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true}
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("connected successfully!");
  });
};
