const express = require("express");
const app = express();
const itemsRoutes = require("./routes/items");
const ExpressError = require("./expressError");

app.use(express.json());
app.use("/items", itemsRoutes);

//404 error

app.use(function (req, res, next) {
  return new ExpressError("Not found", 404);
});

//500 error

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

app.listen(3000, function () {
  console.log("Your port is running on 3000");
});

module.exports = app;
