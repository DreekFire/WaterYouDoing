//shower 0.625/min
//toilet 5
//laundry 45
//brushing teeth 0.5

	var waterNeeded;
	var daysNeeded;
	var daysElapsed;
	var waterConsumed;
	var startingWater;
	var plant;
	var shower;
	var today;
	var d;
	var m;
	var y;
	var startDate;
	var timeDiff;
	var diffDays;

function confirm() {
	startingWater = document.getElementById("startWater").value;
	document.getElementById("startQuery").style.display = "none";
}

function myLoadFunc() {
	waterNeeded = [20, 60, 80];
	daysNeeded = [2, 6];
	daysElapsed = Number(localStorage.getItem("daysElapsed")) || 0;
	waterConsumed = Number(localStorage.getItem("waterConsumed")) || 0;
	startingWater = Number(localStorage.getItem("startingWater")) || 80;
	plant = [Number(localStorage.getItem("plant0")), Number(localStorage.getItem("plant1"))] || [0, 0];
	shower = false;
	today = new Date();
	d = today.getDate();
	m = today.getMonth();
	y = today.getFullYear();
	currentDate = new Date(y, m, d);
	if(localStorage.getItem("startDate") == null) {
		startDate = currentDate;
	} else {
		startDate = new Date(localStorage.getItem("startDate"));
	}
	timeDiff = Math.abs(today.getTime() - startDate.getTime());
	diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
	var plantStages = [
		"images/Sprout1-1.png",
		"images/Plant1.png",
		"images/Final1.png",
		"images/dead1.png"
	]
	document.getElementById("plont").src = plantStages[plant[0]];
	if(plant[1] > 100) {
		document.getElementById("plont").src = plantStages[plant[3]]
	}
	if(diffDays > daysElapsed) {
		daysElapsed++;
		if(waterConsumed > startingWater - waterNeeded[plant[0]]) {
			plant[1]+= waterConsumed - (startingWater - waterNeeded[plant[0]]);
			plant[0]--;
		}
		if(daysElapsed > daysNeeded[plant[0]] && plant[0] < 2) {
			plant[0]++;
		}
		waterConsumed = 0;
		localStorage.setItem("waterConsumed", "0");
	}
	if(plant[0] == 2) {
		alert("Congratulations, your plant has reached maturity with " + startingWater + "starting water");
	}

	document.getElementById("waterNeed").innerHTML += waterNeeded[plant[0]];
	document.getElementById("growthStage").innerHTML += plant[0];
	if(plant[0] < 2) {
		document.getElementById("nextStageTime").innerHTML += daysNeeded[plant[0]] - daysElapsed;
	} else {
		document.getElementById("nextStageTime").innerHTML = "your tree has reached the max growth stage";
	}
	document.getElementById("age").innerHTML += daysElapsed;
	document.getElementById("remain").innerHTML += startingWater - waterConsumed;
	
	localStorage.setItem("daysElapsed", String(daysElapsed));
	localStorage.setItem("waterConsumed", String(waterConsumed));
	localStorage.setItem("startingWater", String(startingWater));
	localStorage.setItem("plant0", String(plant[0]));
	localStorage.setItem("plant1", String(plant[1]));
	localStorage.setItem("startDate", String(startDate));
}

function toggleBlur(id) {
	let e = document.getElementById(id);
	if(e.style.filter === "blur(4px)") {
		e.style.filter = "none";
	} else {
		e.style.filter = "blur(4px)";
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
	waterConsumed = Number(waterConsumed) + Number(gallons);
	localStorage.setItem("waterConsumed", waterConsumed);
}

function addWater(id) {
	e = document.getElementById(id);
	gallons = Number(e.value);
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