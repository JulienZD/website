import LabeledCheckbox from '@components/form/LabeledCheckbox';

export default function ColorForm({ colors, doShuffle, onColorChange, onDoShuffleChange }) {
  const handleColorTextChange = (e) => onColorChange(e.target.value);
  const handleDoShuffleChange = (e) => onDoShuffleChange(e.target.checked);
  return (
    <form className="form w-48 mt-3" onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label className="mb-1" htmlFor="colorInput">
          Colors (newline separated)
        </label>
        <textarea
          id="colorInput"
          name="colors"
          value={colors}
          onChange={handleColorTextChange}
          className="resize-none"
          rows="10"
          cols="5"
        />
      </div>
      <LabeledCheckbox
        id="shuffle"
        name="doShuffle"
        isChecked={doShuffle}
        onChange={handleDoShuffleChange}
        label="Shuffle output"
      />
    </form>
  );
}
