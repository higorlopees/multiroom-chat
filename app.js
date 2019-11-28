// import server configuration
var app = require('./config/server');

// parameterize listen port
app.listen(80, function(){
    console.log('Server online')
})
