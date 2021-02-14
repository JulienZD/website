import React, { Component } from 'react';

export default class ColorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.defaultColors.join('\n'),
      doShuffle: false,
      colorSet: new Set([props.defaultColors]),
      hasClicked: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleColorInputChange = this.handleColorInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value }, this.onChangeCallback);
  }

  handleColorInputChange(event) {
    const value = event.target.value;
    this.setState({ colors: value });
    const colorInput = value
      .trim()
      .split('\n')
      .filter((c) => c.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/));
    const colorSet = new Set(colorInput);
    // Prevent epilepsy
    if (areSetsEqual(colorSet, this.state.colorSet) || colorSet.size !== colorInput.length) return;

    this.setState({ colorSet: colorSet }, this.onChangeCallback);
  }

  onChangeCallback() {
    this.props.onChangeCallback(this.state);
  }

  handleSubmit = (event) => event.preventDefault();

  checkFirstFocus = () => {
    if (this.state.hasClicked) return;
    this.setState({ hasClicked: true, colors: '' }, this.onChangeCallback);
  };

  render() {
    return (
      <form className="mx-auto" onSubmit={this.handleSubmit} style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label className="control-label" htmlFor="colorInput">
            Colors (newline separated)
          </label>
          <textarea
            id="colorInput"
            name="colors"
            className="form-control"
            value={this.state.colors}
            onFocus={this.checkFirstFocus}
            onChange={this.handleColorInputChange}
            rows="10"
            cols="5"
          ></textarea>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            id="shuffle"
            name="doShuffle"
            checked={this.state.doShuffle}
            onChange={this.handleInputChange}
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
}

function areSetsEqual(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (const a of setA) if (!setB.has(a)) return false;
  return true;
}
