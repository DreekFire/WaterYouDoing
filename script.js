//shower 0.625/min
//toilet 5
//laundry 45
//brushing teeth 0.5

var waterConsumed
var startingWater

function setGoal(goal) {
	localStorage.setItem("waterConsumed", "0");
	localStorage.setItem("goal", goal);
}

function show(id) {
	let e = document.getElementById("id");
	if(e.style.display === "block") {
		e.style.display = "hidden";
	} else {
		e.style.display = "block";
	}
}

function addActivity(activity) {
	switch(activity) {
		case "Shower":
			document.getElementById("ShowerMinutes").style.display = "block";
			break;
		case "Toilet":
			waterConsumed += 5;
			break;
		case "Laundry":
			waterConsumed += 45;
			break;
		case "Brushing Teeth":
			waterConsumed += 0.5;
			break;
		case "Other":
			document.getElementById("GenericActivity").style.display = "block";
			break;
	}
}