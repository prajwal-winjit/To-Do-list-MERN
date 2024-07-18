const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/todoRoutes');
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(port, () => {
    console.log("Server running on port", port);
});
