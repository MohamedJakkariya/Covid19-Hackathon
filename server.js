const express = require('express');
const covid19 = ('covid19-api');

const app = express();

app.use(express.static(__dirname + '/public'));

// View engine setup
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});  

app.listen(4000, () => {
  console.log('Server running on port #4000');
});
