import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import IDInput from './IDInput';

let styles = require('./Home.scss');

export interface IProps extends RouteComponentProps<any> {
  addID : (id : string) => void;
  swipes : Array<string>;
}

export class Home extends React.Component<IProps, any> {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <IDInput addID={this.props.addID} />
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
