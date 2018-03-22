function resetQuestion(fourFlags) {
	for (var i = 0; i < elFlags.length; i++) {
		elFlags[i].classList.remove('is-active')
	}
	elCountry.textContent = fourFlags[Math.floor(Math.random() * fourFlags.length)].name;
	flagsAlreadyAsked.push(elCountry.textContent);
}

function likeness(flagIndex, colors, level) {
	var selectedFlags = [];
	var likenessLevel = 0;
	var colorsIndex = 0;
	for (var i = 0; i < flags.length; i++) {

		if (checkExistingFlags(flags[i]) === false) {
			likenessLevel = 0;
			for (colorsIndex = 0; colorsIndex < colors.length; colorsIndex++) {
				if (flags[i].colors.includes(colors[colorsIndex]))
					likenessLevel++;
			}
			if (likenessLevel >= level && flagIndex !== i) {
				selectedFlags.push(flags[i])
			}
		}
	}

	return (selectedFlags);
}

function checkExistingFlags(flagAsked) {

	for (var tabsIndex = 0; tabsIndex < flagsAlreadyAsked.length; tabsIndex++) {
		if (flagsAlreadyAsked[tabsIndex] == flagAsked.name) {
			return true;
		}
	}

	if (typeof tabHL !== 'undefined') {
		for (var tabsIndex = 0; tabsIndex < tabHL.length; tabsIndex++) {
			if (tabHL[tabsIndex] == flagAsked.name) {
				return true;
			}
		}
	}

	if (typeof tabML !== 'undefined') {
		for (var tabsIndex = 0; tabsIndex < tabML.length; tabsIndex++) {
			if (tabML[tabsIndex] == flagAsked.name) {
				return true;
			}
		}
	}

	if (typeof tabLL !== 'undefined') {
		for (var tabsIndex = 0; tabsIndex < tabLL.length; tabsIndex++) {
			if (tabLL[tabsIndex] == flagAsked.name) {
				return true;
			}
		}
	}

	return false
}

function chooseRdmFlag() {

	var flagIndex = Math.floor(Math.random() * flags.length);

	elFlags[0].firstChild.attributes.src.value = "flags/" + flags[flagIndex].code + ".svg"
	colors = flags[flagIndex].colors;
	fillFlags(flagIndex, colors);
}

function gameEnd() {
	elWinScreen.classList.toggle('is-open');
	elFinalWinningScore.textContent = elScore.textContent;
}

function fillFlags(flagIndex, colors) {
	if (colors.length > 2) {
		var tabHL = likeness(flagIndex, colors, 3);
	}
	if (colors.length > 1) {
		var  tabML = likeness(flagIndex, colors, 2);
	}
	var tabLL = likeness(flagIndex, colors, 1);
	var leftFlags = likeness(flagIndex, colors, 0);
	var generatedFlag = 0;
	chosenFlags = [flags[flagIndex]];

	if (leftFlags.length < 3) {
		gameEnd()
	}

	for (var flag_number = 1; flag_number < 4; flag_number++) {
		if (tabHL && tabHL.length > 0) {
			generatedFlag = Math.floor(Math.random() * tabHL.length)
			elFlags[flag_number].firstChild.attributes.src.value = "flags/" + tabHL[generatedFlag].code + ".svg"
			chosenFlags.push(tabHL[generatedFlag])
			tabHL.splice(generatedFlag, 1);
		}
		else if (tabML && tabML.length > 0) {
			generatedFlag = Math.floor(Math.random() * tabML.length)
			elFlags[flag_number].firstChild.attributes.src.value = "flags/" + tabML[generatedFlag].code + ".svg"
			chosenFlags.push(tabML[generatedFlag])
			tabML.splice(generatedFlag, 1);
		}
		else if (tabLL && tabLL.length > 0) {
			generatedFlag = Math.floor(Math.random() * tabLL.length)
			elFlags[flag_number].firstChild.attributes.src.value = "flags/" + tabLL[generatedFlag].code + ".svg"
			chosenFlags.push(tabLL[generatedFlag])
			tabLL.splice(generatedFlag, 1);
		}
		else {
			generatedFlag = Math.floor(Math.random() * leftFlags.length)
			elFlags[flag_number].firstChild.attributes.src.value = "flags/" + leftFlags[generatedFlag].code + ".svg"
			chosenFlags.push(leftFlags[generatedFlag])
			leftFlags.splice(generatedFlag, 1);
		}
	}
	resetQuestion(chosenFlags);
}

function loseLife() {
	life--;

	elLifes.children[life].classList.toggle('is-active')
	if (life === 0) {
		gameOver();
	}
}

function addTime() {
	var newTime = parseInt(elTime.textContent) + 3;
	if (newTime > 30) {
		newTime = 30;
	}
	elTime.textContent = newTime;
}

function gameStart() {

	chooseRdmFlag();
	var elTimeID = window.setInterval(function() {
		elTime.textContent = parseInt(elTime.textContent) - 1;
		if (elTime.textContent === '0') {
			gameOver(elTimeID);
		}
	}, 1000);
}

function gameOver(elTimeID) {
	elEndScreen.classList.toggle('is-open');
	window.clearInterval(elTimeID);
	elFinalLosingScore.textContent = elScore.textContent;

}

function checkQuestionFlag(tmpFlag, index) {
	if (chosenFlags[index].name == elCountry.textContent)
		return true;

	return false;
}

var elTime = document.querySelector('.time span');
var elStartScreen = document.querySelector('#game-start');
var elEndScreen = document.querySelector('#game-over');
var elWinScreen = document.querySelector('#game-end');
var elStart = document.querySelector('#game-start>button');
var elRestart = document.querySelector('#game-over>button');
var elWinRestart = document.querySelector('#game-end>button');
var elFlags = document.querySelectorAll('.flags .flag');
var elLifes = document.querySelector('.lives')
var colors = [];
var elCountry = document.querySelector('#game>h2');
var flagsAlreadyAsked = [];
var chosenFlags = [];
var life = 3;
var elScore = document.querySelector('.score>strong');
var elFinalLosingScore = document.querySelector('#game-over>#final-score>strong');
var elFinalWinningScore = document.querySelector('#game-end>#final-score>strong');


elStart.addEventListener('click', function() {
	gameStart();
	elStartScreen.classList.toggle('is-open');
});
elRestart.addEventListener('click', function() {
	elTime.textContent = '20';
	elScore.textContent = '0';
	life = 3;
	flagsAlreadyAsked = [];
	for (let i = 0; i < elLifes.children.length; i++) {
		elLifes.children[i].classList.remove('is-active')
	}
	elEndScreen.classList.toggle('is-open');
	chooseRdmFlag();
});
elWinRestart.addEventListener('click', function() {
	elTime.textContent = '20';
	elScore.textContent = '0';
	life = 3;
	flagsAlreadyAsked = [];
	for (let i = 0; i < elLifes.children.length; i++) {
		elLifes.children[i].classList.remove('is-active')
	}
	elWinScreen.classList.toggle('is-open');
	chooseRdmFlag();
});

for (let flagIterator = 0; flagIterator < elFlags.length; flagIterator++) {
	elFlags[flagIterator].addEventListener('click', function() {
		if (!this.classList.contains('is-active')) {
			this.classList.add('is-active');
			if (checkQuestionFlag(this, flagIterator) === true) {
				elScore.textContent = parseInt(elScore.textContent) + parseInt(elTime.textContent) * life;
				addTime();
				chooseRdmFlag();
			}
			else {
				loseLife();
			}
		}
	})
}
