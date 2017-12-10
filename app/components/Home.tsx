import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import IDInput from './IDInput';
import { IAddSwipePayload } from '../actions/swipe';
import { TState as TSwipeLogState } from '../reducers/swipeLog';
import { LogViewer } from './LogViewer';

export interface IProps extends RouteComponentProps<any> {
  addSwipe(swipe : IAddSwipePayload): void,
  swipelog: TSwipeLogState
}

export class Home extends React.Component<IProps, any> {
  render() {
    return (
      <div>
          <h2>Input</h2>
          <IDInput addSwipe={this.props.addSwipe} />
          <h2>Current Status</h2>
          <LogViewer swipes={this.props.swipelog} />
      </div>
    );
  }
}
