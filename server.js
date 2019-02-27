const express = require('express');
const app = express();

// install session module first using 'npm install express-session'
var session = require('express-session'); 
app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}));

app.get('/', songs);   
app.get('/add', add);
app.get('/sort', sort);
app.get('/remove', remove);
app.get('/clear',clear);
app.listen(process.env.PORT,  process.env.IP, startHandler());

function startHandler()
{
  console.log('Server listening on port ' + process.env.PORT);
}

function songs(req, res)
{
  try
  {
    if(req.session.songs == undefined)
    {
      req.session.songs = [];
    }
  }
  catch(e)
  {
    result = {'Error' : e.message};
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  var result = {'songs' : req.session.songs};
  res.write(JSON.stringify(result));
  res.end('');
}

function sort(req, res)
{
  req.session.songs.sort();
  res.writeHead(200, {'Content-Type': 'text/html'});
  let result = {'songs' : req.session.songs};
  res.write(JSON.stringify(result));
  res.end('');
}

function add(req, res)
{
  try
  {
    if(req.session.songs.includes(req.query.song))
    {
      result = {'Error': "You've already added this song in!"};
    }
    else
      req.session.songs.push(req.query.song);
  }
  catch(e)
  {
    res.writeHead(200, {'Content-Type': 'text/html'});
    result = {'Error':e.message};
    res.write(JSON.stringify(result));
    res.end('');
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  var result = {'songs' : req.session.songs};
  res.write(JSON.stringify(result));
  res.end('');
}
function remove(req, res)
{
  var result = {};
  try
  {
    if(req.session.songs.includes(req.query.song))
    {
      var i = req.session.songs.indexOf(req.query.song);
      req.session.songs.splice(i,1);
      result = {'songs' : req.session.songs};
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(JSON.stringify(result));
      res.end('');
    }
    else
    {
      result={'Error' : 'No such song in this array'};
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(JSON.stringify(result));
      res.end('');
    }
  }
  catch(e)
  {
    result = {'Error':e.message};
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(JSON.stringify(result));
    res.end('');
  }
  
  
}

function clear(req, res)
{
  req.session.songs = [];
  res.writeHead(200, {'Content-Type': 'text/html'});
  let result = {'songs' : req.session.songs};
  res.write(JSON.stringify(result));
  res.end('');
}