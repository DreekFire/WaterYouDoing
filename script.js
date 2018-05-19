//shower 0.625/min
//toilet 5
//laundry 45
//brushing teeth 0.5

var waterConsumed = 0;
var startingWater;
var shower = false;

function setGoal(goal) {
	localStorage.setItem("waterConsumed", "0");
	localStorage.setItem("goal", goal);
}

function show(id) {
	let e = document.getElementById(id);
	e.style.display = "block";
}

function hide(id) {
	let e = document.getElementById(id);
	e.style.display = "none";
}

function addWater(id) {
	e = document.getElementById(id);
	gallons = e.value;
	if(shower) {
		waterConsumed += gallons * 5 / 8;
		addText("history", "Shower: " + gallons * 5 / 8 + "<br>");
	} else {
		waterConsumed += gallons;
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
			waterConsumed += 5;
			addText("history", "Toilet: 5" + "<br>");
			break;
		case "Laundry":
			waterConsumed += 45;
			addText("history", "Laundry: 45" + "<br>");
			break;
		case "Brushing Teeth":
			waterConsumed += 0.5;
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