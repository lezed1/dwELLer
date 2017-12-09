import * as React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './MainInput.css';

export default class IDInput extends React.Component<{addID: (id: string) => void;}, {value: string}> {
  state = {
    value: ''
  }

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  }

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Reset box if semicolon is type (card reader starts with ;)
    if (event.charCode === 59) {
      this.setState({ value: '' });
    }
  }

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const input = this.state.value;
    this.setState({ value: '' });
    event.preventDefault();

    const m = input.match(/;2551000(\d{7})\d\?/);

    if (!m) {
      alert(`Invalid input ${input}`);
      return;
    }

    const id = m[1];
    this.props.addID(id);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
