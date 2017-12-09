import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { LogViewer, IProps } from '../components/LogViewer';
import { IState } from '../reducers/index';


function mapStateToProps(state: IState): Partial<IProps> {
  return {
    swipes: state.swipelog
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<IProps> {
  return bindActionCreators({}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(LogViewer) as any as React.StatelessComponent<IProps>);
