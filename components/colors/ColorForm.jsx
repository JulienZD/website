export default function ColorForm({ colors, doShuffle, onColorChange, onDoShuffleChange }) {
  const handleColorTextChange = (e) => onColorChange(e.target.value);
  const handleDoShuffleChange = (e) => onDoShuffleChange(e.target.checked);
  return (
    <form className="mx-auto" onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '500px' }}>
      <div className="form-group">
        <label className="control-label" htmlFor="colorInput">
          Colors (newline separated)
        </label>
        <textarea
          id="colorInput"
          name="colors"
          className="form-control"
          value={colors}
          onChange={handleColorTextChange}
          rows="10"
          cols="5"
        ></textarea>
      </div>
      <div className="custom-control custom-checkbox">
        <input
          id="shuffle"
          name="doShuffle"
          checked={doShuffle}
          onChange={handleDoShuffleChange}
          type="checkbox"
          className="custom-control-input"
        />
        <label htmlFor="shuffle" className="custom-control-label">
          Shuffle output
        </label>
      </div>
    </form>
  );
}
