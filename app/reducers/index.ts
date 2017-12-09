import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import swipelog, { TState as TSwipeLogState } from './swipeLog';

const rootReducer = combineReducers({
  counter,
  swipelog,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  swipelog: TSwipeLogState;
}

export default rootReducer;
