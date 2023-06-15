const express = require('express')
const app = express()
const port = 8080
app.set('view engine', 'ejs');



app.get('/', function (req, res) {
    res.send('Hello World');
 })


app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
});