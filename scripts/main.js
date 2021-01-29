const julienLogo = document.querySelector('#julienLogo');
const elsewhereContainer = document.querySelector('#elsewhereContainer');
const progressContainer = document.querySelector('#progressContainer');

julienLogo.addEventListener('animationstart', () => {
	setTimeout(() => $('#elsewhereContainer').css('animation', '1s appear forwards'), 1500);
});

elsewhereContainer.addEventListener('animationstart', () => {
	setTimeout(() => $('#progressContainer').css('animation', '1s appear forwards'), 1000);
});

progressContainer.addEventListener('animationstart', () => {
	setTimeout(() => displayEduProgress(), 150);
});

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