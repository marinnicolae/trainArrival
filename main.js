var stations = [{
	distance: 0,
	name: 'S1'},
{
	distance: 4000,
	name: 'S2'},
{
	distance: 8000,
	name: 'S3'},
{
	distance: 12000,
	name: 'S4'},
{
	distance: 16000,
	name: 'S5'},
{
	distance: 20000,
	name: 'S6'},
{
	distance: 24000,
	name: 'S7'}];

var trainId = 0;

function Train(type)
{
	this.stop=0;
	this.type=type;
	if (type === 'R') {
		this.speed = 8.3;//30km/h
	} else if (type === 'IR') {
		this.speed = 19.4;//70km/h
	} else {
		this.speed = 0;
	}
	this.distance = 0;
	this.lastStation = stations[0];
	this.nextStation = stations[1];
	this.id = 'TrainId: ' + ++trainId;
	this.eta = parseInt((this.nextStation.distance - this.distance) / this.speed);
	this.updateEta = function() {
		this.eta--;
	}
	this.update = function () {
		if (this.stop) {
			this.stop--;
		} else {
			this.distance += this.speed;
			this.updateEta();
		}

		if (this.distance > this.nextStation.distance) {
			this.lastStation = this.nextStation;
			$.each(stations, function( index, station ) {
	 			if (this.lastStation.name === station.name) {
					this.nextStation = stations[i++];
				}
			});
			this.stop=5*60;
		}

		console.log(this);

	}
}

//1sec rr
$( document ).ready(function() {
	timer = 0;
	train1 = new Train('R');
	trains = [];
	trains.push(train1);
	run();
	setInterval(function(){
		run();
		show();
	},1000);
});

function update(trains) {
	$.each(trains, function( index, train ) {
	  train.update();
	});
}

function run() {
	if (trains.length < 3 ) {
		if (timer == Math.floor((Math.random() * 10) + 5)) {
			train2 = new Train('IR');
			trains.push(train2);
		} else if (timer == Math.floor((Math.random() * 20) + 15)) {
			train3 = new Train('R');
			trains.push(train3);
		}
	} 

	update(trains);
	timer++;
	console.log(timer);
}

function show() {
	$.each(trains, function( index, train ) {
	 	
	});
}
