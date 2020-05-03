const express = require('express');
const covid19 = ('covid19-api');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html')
});  

app.listen(4000, () => {
  console.log('Server running on port #4000');
});
