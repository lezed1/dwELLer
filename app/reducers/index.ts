import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import home, { TState as THomeState } from './home';

const rootReducer = combineReducers({
  counter,
  home,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  home: THomeState;
}

export default rootReducer;
