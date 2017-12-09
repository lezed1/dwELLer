import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import IDInput from './IDInput';
import { IAddSwipePayload } from '../actions/swipe';

export interface IProps extends RouteComponentProps<any> {
  addSwipe(swipe : IAddSwipePayload): void,
}

export class Home extends React.Component<IProps, any> {
  render() {
    return (
      <div>
          <h2>Home</h2>
          <IDInput addSwipe={this.props.addSwipe} />
          <Link to="/counter">to Counter</Link>
      </div>
    );
  }
}
