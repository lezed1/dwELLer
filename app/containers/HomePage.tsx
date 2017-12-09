import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Home, IProps } from '../components/Home';
import { IState } from '../reducers/index';
import * as HomeActions from '../actions/home';


function mapStateToProps(state: IState): Partial<IProps> {
  return {
    swipes: state.swipelog
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<IProps> {
  return bindActionCreators(HomeActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Home) as any as React.StatelessComponent<IProps>);