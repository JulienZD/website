function getUniqueColors() {
	const textarea = document.getElementById('colorList');
	const input = textarea.value.trim().split('\n');
	return new Set(input.filter(c => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)));
}

const createCard = () => {
	const card = document.createElement('article');
	card.className = 'card bg-dark';
	return card;
}

function createHeadings(count) {
	const hgroup = document.createElement('hgroup');
	for (let i = 1; i <= count; i++) {
		const header = document.createElement(`h${i}`);
		header.textContent = `Heading ${i}`;
		hgroup.appendChild(header);
	}
	return hgroup;
}

function createText() {
	const text = 'The quick brown fox jumps over the lazy dog';
	const textWrapper = document.createElement('div');
	const span = document.createElement('span');
	span.textContent = text;
	textWrapper.appendChild(span);
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

const createBadge = (bgColor) => {
	const badge = document.createElement('span');
	badge.className = 'badge badge-pill ml-1';
	badge.style.backgroundColor = bgColor;
	return badge;
}

function createCardFooter(primary, secondary) {
	const footer = document.createElement('div');
	footer.className = 'card-footer d-flex flex-column bg-dark text-light';
	const texts = [`Primary: ${primary}`, `Secondary: ${secondary}`];
	texts.map(t => {
		const small = document.createElement('small');
		small.textContent = t;
		const badge = t.startsWith('Primary') ? createBadge(primary) : createBadge(secondary);
		small.appendChild(badge);
		footer.appendChild(small);
	});
	return footer;
}

function createCardBody(primary, secondary) {
	const body = document.createElement('div');
	body.className = 'card-body color-card';
	body.style.backgroundColor = primary;
	body.style.color = secondary;
	const elements = [createHeadings(3), createText(), createButtons(primary, secondary)];
	elements.map(e => body.appendChild(e));
	return body;
}

function createColorCard(primary, secondary) {
	const parent = createCard();
	const children = [createCardBody(primary, secondary), createCardFooter(primary, secondary)];
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