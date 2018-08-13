const express = require("express");
/* start mongoose initialization */
require("./AppStuff/mongoSetUp/mongoose")();
/* end mongoose initialization */
/* Start app initialization */
const app = express();
/* end app initialization */
/* Start of app engine initialization */
require("./AppStuff/engine/appEngine")(app);
/* end of app engine initialization */
/* Start non routing middleware declaration */
require("./AppStuff/middlewares/middlewares")(app);
/* end of non routing middleware declaration */
/* Start body-parser middlware */
require("./AppStuff/middlewares/bodyParser/bodyParser")(app);
/* end body-parser middleware */
/* Start of express validation middleware */
require("./AppStuff/middlewares/validation/validation")(app);
/* End of express validation middleware */
/* start of global variable set on locals */
require("./AppStuff/locals/locals")(app);
/* end of global variable set on locals */
/* Start Set routes */
require("./admin")(app);
/* end set routes */
// error handling middleware
/* possible use */
// app.use((err, req, res, next) => {
//     res.status(422).send({ error: err.message })
// })
module.exports = app;


        