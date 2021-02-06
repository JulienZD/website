function previewColors() {
	const colors = getUniqueColors();
	if (colors.size <= 1) return;
	displayColors(colors, shouldShuffle());
}

function getUniqueColors() {
	const textarea = document.getElementById('colorList');
	const input = textarea.value.trim().split('\n');
	return new Set(input.filter(c => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)));
}

const shouldShuffle = () => document.getElementById('shuffle').checked;

function displayColors(colorSet, shouldShuffle = false) {
	const container = document.getElementById('colorPreviews');
	container.innerHTML = '';
	container.style.display = '';

	const cards = createColorCards(colorSet);
	if (shouldShuffle) shuffleArray(cards);
	cards.forEach(card => container.appendChild(card));
}

function createColorCards(colorSet) {
	const cards = [];
	for (const primary of colorSet) {
		for (const secondary of colorSet) {
			if (primary === secondary) continue;
			const card = createColorCard(primary, secondary);
			cards.push(card);
		}
	}
	return cards;
}

function createColorCard(primary, secondary) {
	const parent = createCard();
	const children = [createCardBody(primary, secondary), createCardFooter(primary, secondary)];
	children.forEach(c => parent.appendChild(c));
	return parent;
}

const createCard = () => {
	const card = document.createElement('article');
	card.className = 'card bg-dark';
	return card;
}

function createCardBody(primary, secondary) {
	const body = document.createElement('div');
	body.className = 'card-body color-card';
	body.style.backgroundColor = primary;
	body.style.color = secondary;
	const elements = [createHeadings(3), createText(), createButtons(primary, secondary)];
	elements.forEach(e => body.appendChild(e));
	return body;
}

function createHeadings(count) {
	if (count > 6) count = 6;
	const hGroup = document.createElement('hgroup');
	for (let i = 1; i <= count; i++) {
		const header = document.createElement(`h${i}`);
		header.textContent = `Heading ${i}`;
		hGroup.appendChild(header);
	}
	return hGroup;
}

function createText() {
	const p = document.createElement('p');
	p.textContent = 'The quick brown fox jumps over the lazy dog';
	return p;
}

function createButtons(primary, secondary) {
	const btnGroup = document.createElement('div');
	btnGroup.className = 'd-flex mt-1';

	const btn = createDefaultButton(primary, secondary);
	const outlinedBtn = createOutlinedButton(secondary);

	btnGroup.appendChild(btn);
	btnGroup.appendChild(outlinedBtn);
	return btnGroup;
}

function createButton(color) {
	const button = document.createElement('button');
	button.className = 'btn btn-sm mr-1';
	button.style.color = color;
	button.textContent = 'Button';
	return button;
}

function createDefaultButton(textColor, bgColor) {
	const button = createButton(textColor);
	button.style.backgroundColor = bgColor;
	return button;
}

function createOutlinedButton(color) {
	const button = createButton(color);
	button.style.borderColor = color;
	return button;
}

function createCardFooter(primary, secondary) {
	const footer = document.createElement('div');
	footer.className = 'card-footer d-flex flex-column bg-dark text-light';
	const texts = [`Primary: ${primary}`, `Secondary: ${secondary}`];
	texts.forEach(text => {
		const small = document.createElement('small');
		small.textContent = text;
		const badge = text.startsWith('Primary') ? createBadge(primary) : createBadge(secondary);
		small.appendChild(badge);
		footer.appendChild(small);
	});
	return footer;
}

const createBadge = (bgColor) => {
	const badge = document.createElement('span');
	badge.className = 'badge badge-pill ml-1';
	badge.style.backgroundColor = bgColor;
	return badge;
}

// Shuffle function by https://stackoverflow.com/a/12646864
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}