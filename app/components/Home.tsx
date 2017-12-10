import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import IDInput from './IDInput';
import { IAddSwipePayload } from '../actions/swipe';
import { Dashboard } from './Dashboard';
import { TSwipeLog, TCurrentMembers } from '../reducers/swipeLog';

export interface IProps extends RouteComponentProps<any> {
  addSwipe(swipe : IAddSwipePayload): void,
  swipes: TSwipeLog,
  currentMembers: TCurrentMembers
}

export class Home extends React.Component<IProps, any> {
  render() {
    return (
      <div>
          <h2>Input</h2>
          <IDInput addSwipe={this.props.addSwipe} />
          <h2>Current Status</h2>
          <Dashboard currentMembers={this.props.currentMembers} />
      </div>
    );
  }
}
