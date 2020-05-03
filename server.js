const express = require('express');
// const covid19 = ('covid19-api');

const app = express();

const PORT = 4000;

app.use(express.static(__dirname + '/public'));

// View engine setup
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});  

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
