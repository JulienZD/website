import React, { Component } from 'react';

export default class ColorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.defaultColors.join('\n'),
      doShuffle: false,
      hasClicked: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value }, this.onChangeCallback);
  }

  onChangeCallback() {
    this.props.onChangeCallback(this.state);
  }

  handleSubmit = (event) => event.preventDefault();

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
            onChange={this.handleInputChange}
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
