const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log =`${now}, ${req.method}, ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log(`Unable to append to server.log`);
    }
  })
  next();
})
app.use(express.static(__dirname +'/public'));
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('allCaps', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.send({
    name: 'Roman',
    experience: 3,
    occupation: 'lawyer'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: `Dmitri's Page`,
    pageYear: new Date().getDate()
  });
});

app.listen(3000, () => {
  console.log('Server has started');
});
