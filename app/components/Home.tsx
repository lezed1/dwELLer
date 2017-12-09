import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import IDInput from './IDInput';
import { TState } from '../reducers/home';
import { IAddSwipePayload } from '../actions/home';

let styles = require('./Home.scss');

export interface IProps extends RouteComponentProps<any> {
  addSwipe : (swipe : IAddSwipePayload) => void;
  swipes : TState;
}

export class Home extends React.Component<IProps, any> {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <IDInput addSwipe={this.props.addSwipe} />
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
