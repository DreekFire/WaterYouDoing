//shower 0.625/min
//toilet 5
//laundry 45
//brushing teeth 0.5

var waterNeeded = [20, 60, 100];
var daysNeeded = [2, 4, 5];
var daysElapsed = 0;
var waterConsumed = 0;
var startingWater = 80;
var plant = [0, 0];
var shower = false;
var startDate = new Date(2018, 05, 19);
var today = new Date();
var d = today.getDate();
var m = today.getMonth()+1; //January is 0!
var y = today.getFullYear();
var timeDiff = Math.abs(today.getTime() - startDate.getTime());
var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

var quotes = [
	"",
	"",
	"",
	"",
	"",
	""
]

if(diffDays >= daysElapsed) {
	daysElapsed++;
	if(waterConsumed > startingWater - waterNeeded[plant[0]]) {
		plant[1]++;
	}
}

function show(id) {
	let e = document.getElementById(id);
	e.style.display = "block";
}

function hide(id) {
	let e = document.getElementById(id);
	e.style.display = "none";
}

function toggle(id) {
	let e = document.getElementById(id);
	if(e.style.display === "block") {
		e.style.display = "none";
	} else {
		e.style.display = "block";
	}
}

function consumeWater(gallons) {
	waterConsumed += gallons;
	localStorage.setItem("waterConsumed", waterConsumed);
}

function addWater(id) {
	e = document.getElementById(id);
	gallons = e.value;
	if(shower) {
		consumeWater(gallons * 5 / 8);
		addText("history", "Shower: " + gallons * 5 / 8 + "<br>");
	} else {
		consumeWater(gallons);
		addText("history", "Other: " + gallons + "<br>");
	}
	e.value = "";
	hide("genericInputDiv");
}

function addActivity(activity) {
	switch(activity) {
		case "Shower":
			show("genericInputDiv");
			hide("howmuch");
			show("howmany");
			shower = true;
			break;
		case "Toilet":
			consumeWater(5);
			addText("history", "Toilet: 5" + "<br>");
			break;
		case "Laundry":
			consumeWater(45);
			addText("history", "Laundry: 45" + "<br>");
			break;
		case "Brushing Teeth":
			consumeWater(0.5);
			addText("history", "Brushing Teeth: 0.5" + "<br>");
			break;
		case "Other":
			show("genericInputDiv");
			hide("howmany");
			show("howmuch");
			shower = false;
			break;
	}
}

function addText(id, text) {
	document.getElementById(id).innerHTML += text;
}