var express = require('express'),
	app = express();
app.set('view engine', 'ejs')
.use(express.static('public'))

.get('/svg', function(req, res){
	var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -50 20 100"><g>'
	for(var i = 0; i < 7; i++){
		svg+='<path opacity="'+
			compute.opacity(i)+
			'"><animate attributeName="d" dur="15s" begin="'
			+compute.begin(i)+
			's" repeatCount="indefinite" values="'+
			compute.animation(i)+
			'"></animate></path>'
	}
	svg += '</g></svg>';
	res.writeHeader(200, {"Content-Type": "text/html"});  
	res.write(svg);  
	res.end()
})

.listen(8787);

var compute = {
	opacity: function(index){
		return 1 / (index+1);
	},
	animation: function(index){
		var paths = "";
		for(var i = 0; i < 3; i++){
			paths += compute.computeFrame(index, i);
		}
		return paths;
	},
	begin: function(index){
		return 3 * index - 20;
	},
	computeFrame(index, frame){
		return ["M0,-50 C"+ (2.5+2.5*(index+1)) +",40 "+ (2.5+2.5*(index+1)) +",40 0,50z;",
				"M0,-50 C"+ (2.5+2.5*(index+1)) +",-40 "+ (2.5+2.5*(index+1)) +",-40 0,50z;",
				"M0,-50 C"+ (2.5+2.5*(index+1)) +",40 "+ (2.5+2.5*(index+1)) +",40 0,50z;"][frame];
	}
}
