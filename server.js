const express = require('express'); // Express
const bodyParser = require('body-parser'); // Body-Parser
const port = process.env.PORT || 8080; // Port
const app = express();

// We need to use this in order to fetch from other local host
const cors = require('cors');
app.use(
  cors({
    origin: '*',
  })
);

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

// This is our call to the mongoose connection
// We connect to mongodb through mongoose and console.log the connection message
const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on http://localhost:${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
