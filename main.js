var stations = [{
	distance: 0,
	name: 'S1'},
{
	distance: 40,
	name: 'S2'},
{
	distance: 80,
	name: 'S3'},
{
	distance: 120,
	name: 'S4'},
{
	distance: 160,
	name: 'S5'},
{
	distance: 200,
	name: 'S6'},
{
	distance: 240,
	name: 'S7'}];

var trainId = 0;

var typeNames = {'R': 'Regio', 'IR': 'Inter Regio'};

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
	this.id = trainId;
	this.updateEta = function() {
		if (this.stop<1) {
			this.eta = parseInt((this.nextStation.distance - this.distance) / this.speed);
		}
	}
	this.updateEta();
	this.update = function () {
		if (this.stop) {
			this.stop-=1;
		} else {
			this.distance += this.speed;
			this.updateEta();
		}

		if (this.distance > this.nextStation.distance) {
			let last = this.lastStation = this.nextStation;
			this.distance = this.nextStation.distance;
			$.each(stations, function( i, station ) {
	 			if (last.name === station.name) {
					nextStation = stations[++i];
				}
			});
			this.nextStation = nextStation;

			this.stop=5;
		}

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
		if (train.lastStation.name !== 'S7') {
			train.update();
		 	let trainVar = {
			'eta': (train.stop ? 'Will live in: '+train.stop : 'ETA to next statison: '+(train.eta?train.eta:'-') )+' seconds',
			'type': typeNames[train.type],
			'status': train.stop ? 'Train is in station: '+this.lastStation.name : 'Next station: '+this.nextStation.name
			};
			
			var holderSelector = $('#train'+train.id);
			holderSelector.find('#eta').html(trainVar.eta);
			holderSelector.find('#trainType').html(trainVar.type);
			holderSelector.find('#status').html(trainVar.status);
		} else {
			holderSelector.find('#eta').html('STOPED');
		}
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
	var template = $('#dataRow').html();
	$.each(trains, function( index, train ) {

	});
}
