import * as React from 'react';
import { IAddSwipePayload } from '../actions/swipe';

export interface IProps {
  addSwipe(swipe : IAddSwipePayload): void,
}

export interface IState {
  value: string,
}

export class IDInput extends React.Component<IProps, IState> {
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

    let id;

    if (input.match(/^\d{7}$/)) {
      id = input;
    } else {
      const m = input.match(/;2551000(\d{7})\d\?/);
      if (!m) {
        alert(`Invalid input ${input}`);
        return;
      }
      
      id = m[1];
    }

    const swipe: IAddSwipePayload = {
      id,
      timestamp: new Date(),
      direction: confirm("Press OK to enter, Cancel to exit") ? "enter" : "exit",
    };

    this.props.addSwipe(swipe);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            ID:
            <input
              autoFocus
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

export default IDInput;
