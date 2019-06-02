let request = require('request');
let apiKey = 'f2bf987eef532c2d546ffac94e77bf5a';

// let port = process.env.PORT || 3000, process.env.IP || '0.0.0.0' 
var port = process.env.port || 3000;

const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));
//setting view engine as embedded javascript
app.set('view engine','ejs')

app.get('/',function(req,res) {
	res.render('index', {weather: null, error: null});
	
})

app.post('/',function(req,res){
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

	request(url,function(err,response,body){
		if (err){
			res.render('index',{weather:null,error:'Error,please try again'});
		}else{
			let weather = JSON.parse(body)
			if (weather.main == undefined){
				res.render('index',{weather:null,error:'Error,please try again'});
			}else{
				let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				res.render('index',{weather : weatherText,error:null});
			}
		}
	});
})
app.listen(port,function(){
	console.log('Example app listening on port 3000!')
})	