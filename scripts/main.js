const julienLogo = document.querySelector('#julienLogo');

julienLogo.addEventListener('animationstart', () => {
	setTimeout(() => $('#elsewhereContainer').css('animation', '1s appear forwards'), 900);
});