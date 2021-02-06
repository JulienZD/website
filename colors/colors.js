function getUniqueColors() {
	const textarea = document.getElementById('colorList');
	const input = textarea.value.trim().split('\n');
	return new Set(input.filter(c => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)));
}

const createWrapper = (bgCol, txtCol) => {
	const wrapper = document.createElement('article');
	wrapper.className = 'col background p-2';
	wrapper.style.backgroundColor = bgCol;
	wrapper.style.color = txtCol;
	return wrapper;
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

function createColorPreview(primary, secondary) {
	const parent = createWrapper(primary, secondary);
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
			const wrapper = createColorPreview(primary, secondary);
			container.appendChild(wrapper);
		}
	}
}

function previewColors() {
	const colors = getUniqueColors();
	displayColors(colors);
}