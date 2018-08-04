let app;
if (process.env.NODE_ENV === "production") {
  app = require("./dist/important/app");
} else {
  app = require("./important/app");
}

/* The port that the server runs on */
const port = process.env.PORT || 3000;
/* Sets the app to listen to the server */
app.listen(port, () => {
  console.log("Aristos CMS - NodeJS - is being awesome on port: " + port);
});
        