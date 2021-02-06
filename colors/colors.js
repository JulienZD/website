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

function createColorCard(primary, secondary) {
	const parent = createCardParent(primary, secondary);
	const children = [createHeaders(3), createTexts(primary, secondary)];
	children.map(c => parent.appendChild(c));
	return parent;
}

function displayColors(colorSet) {
	const container = document.getElementById('colorPreviews');
	container.innerHTML = '';
	container.style.display = '';

	for (const primary of colorSet) {
		for (const secondary of colorSet) {
			if (primary === secondary) continue;
			const colorCard = createColorCard(primary, secondary);
			container.appendChild(colorCard);
		}
	}
}

function previewColors() {
	const colors = getUniqueColors();
	if (colors.size <= 1) return;
	displayColors(colors);
}