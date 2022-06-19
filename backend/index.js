const express = require("express");
const route = require("./src/routes");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", route);
app.set('view engine', 'ejs')

let port = 8888
app.listen(port, () => {
    console.log(`Alive at http://localhost:${port}`);
});



module.exports = app;