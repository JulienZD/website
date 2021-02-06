function getUniqueColors() {
	const textarea = document.getElementById('colorList');
	const input = textarea.value.trim().split('\n');
	return new Set(input.filter(c => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)));
}

const createCardParent = (bgCol, txtCol) => {
	const card = document.createElement('article');
	card.className = 'col color-card p-2';
	card.style.backgroundColor = bgCol;
	card.style.color = txtCol;
	return card;
}

function createHeaders(count) {
	const hgroup = document.createElement('hgroup');
	for (let i = 1; i <= count; i++) {
		const header = document.createElement(`h${i}`);
		header.textContent = `Header ${i}`;
		hgroup.appendChild(header);
	}
	return hgroup;
}

function createTexts(primary, secondary) {
	const texts = ['The quick brown fox jumps over the lazy dog', `Primary: ${primary}`, `Secondary: ${secondary}`]
	const textWrapper = document.createElement('div');
	textWrapper.className = 'd-flex flex-column';
	for (const text of texts) {
		const span = document.createElement('span');
		span.textContent = text;
		textWrapper.appendChild(span);
	}
	return textWrapper;
}

const createButton = (textColor, bgColor) => {
	const btn = document.createElement('button');
	btn.className = 'btn btn-sm mr-1';
	btn.style.color = textColor;
	btn.textContent = 'Button';
	// bgColor signifies whether the button should be outlined or not
	if (bgColor) btn.style.backgroundColor = bgColor;
	else btn.style.borderColor = textColor;
	return btn;
}

function createButtons(primary, secondary) {
	const btnGroup = document.createElement('div');
	btnGroup.className = 'd-flex mt-1';

	const btn = createButton(primary, secondary);
	const outlineBtn = createButton(secondary);

	btnGroup.appendChild(btn);
	btnGroup.appendChild(outlineBtn);
	return btnGroup;
}

function createColorCard(primary, secondary) {
	const parent = createCardParent(primary, secondary);
	const children = [createHeaders(3), createTexts(primary, secondary), createButtons(primary, secondary)];
	children.map(c => parent.appendChild(c));
	return parent;
}

function displayColors(colorSet, shouldShuffle = false) {
	const cards = [];
	const container = document.getElementById('colorPreviews');
	container.innerHTML = '';
	container.style.display = '';

	for (const primary of colorSet) {
		for (const secondary of colorSet) {
			if (primary === secondary) continue;
			const colorCard = createColorCard(primary, secondary);
			cards.push(colorCard);
		}
	}

	if (shouldShuffle) shuffleArray(cards);
	cards.map(c => container.appendChild(c));
}

const shouldShuffle = () => document.getElementById('shuffle').checked;

function previewColors() {
	const colors = getUniqueColors();
	if (colors.size <= 1) return;
	displayColors(colors, shouldShuffle());
}

// Shuffle function by https://stackoverflow.com/a/12646864
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}