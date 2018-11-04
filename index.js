var express = require('express'),
	app = express();

var SETUP = {
	number_of_waves: 7,
	color: "#1A50E8",
	timing: 3, // in seconds, represents the time between 2 successive waves
}
var compute = {
	opacity: function(index){
		return 1 / (index+1);
	},
	timing: function(index){
		return SETUP.timing * index - SETUP.timing * SETUP.number_of_waves;
	},
	animation(index){
		var av = {
			starting_point: "-50,0",
			ending_point: "50,0",
			cubic_curve_value: (2.5+2.5*(index+1))
		}
		var frames = []
		frames.push([["M", av.starting_point], ["C", "40,", av.cubic_curve_value], ["40,", av.cubic_curve_value], [av.ending_point, 'z']]);
		frames.push([["M", av.starting_point], ["C", "-40,", av.cubic_curve_value], ["-40,", av.cubic_curve_value], [av.ending_point, 'z']]);
		frames.push([["M", av.starting_point], ["C", "40,", av.cubic_curve_value], ["40,", av.cubic_curve_value], [av.ending_point, 'z']]);
		frames = frames.map(frame => frame.map(term => term.join('')).join(' '))
		return frames.join(';')
	}
}

app.set('view engine', 'ejs')
.use(express.static('public'))

.get('/svg', function(req, res){
	var paths = []
	for(var i = 0; i < SETUP.number_of_waves; i++){
		paths.push({
			opacity: compute.opacity(i),
			animation: compute.animation(i),
			timing: compute.timing(i),
			frames: compute.animation(i),
		})
	}
	res.render('svg', {setup: SETUP, paths: paths})
})

.listen(8787);