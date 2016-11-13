var express = require('express');
var useragent = require('useragent');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static('website'));

app.get('/api/whoami/', getInfo);


function getInfo (req, res) {
    var ipAddress = (req.headers['x-forwarded-for'] || '').split(',')[0] 
                    || (req.connection.remoteAddress || '');
                    
    var language = req.headers["accept-language"].split(',')[0] || '';
    var OS = useragent.parse(req.headers['user-agent']).os.family || '';
    
    var object = {
        ipAdress: ipAddress, 
        language: language,
        operating_system: OS
    }
    
  res.send(object);
}

app.listen(port, function () {
  console.log('listening on port '+ 3000 +'!');
})