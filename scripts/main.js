displayIntro();

function displayIntro() {
	setAnimEvents();
	const children = document.querySelector('#introContainer h1').children;
	const duration = 1.25;

	for (let i = 0; i < children.length; i++) {
		const child = children[i];

		child.style.animationDuration = `${duration * (i + 1)}s`;
		child.style.animationDelay = `${i}s`;
	}

	logo.style.animationDelay = `${children.length}s`;
}

function setAnimEvents() {
	const logo = document.querySelector('#logo');
	const elsewhereContainer = document.querySelector('#elsewhereContainer');
	const progressContainer = document.querySelector('#progressContainer');

	logo.addEventListener('animationstart', () => {
		setTimeout(() => $('#elsewhereContainer').css('animation', '1s appear forwards'), 1500);
	});

	elsewhereContainer.addEventListener('animationstart', () => {
		setTimeout(() => $('#progressContainer').css('animation', '1s appear forwards'), 1000);
	});

	progressContainer.addEventListener('animationstart', () => {
		setTimeout(() => displayEduProgress(), 150);
	});
}

function displayEduProgress() {
	const percentualProgress = `${getPercentualEduProgress().toFixed(2)}%`;
	const eduProgressBar = $('#eduProgressBar');
	eduProgressBar.css('width', percentualProgress);
	eduProgressBar.text(percentualProgress);
}

function getPercentualEduProgress() {
	const startDate = new Date(2019, 8, 1);
	const endDate = new Date(2023, 5, 1);
	const now = new Date();
	const totalEduTime = endDate - startDate;
	const elapsedTime = now - startDate;
	return elapsedTime / totalEduTime * 100;
}
