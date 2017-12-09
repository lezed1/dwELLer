import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import swipelog, { TState as TSwipeLogState } from './swipeLog';

const rootReducer = combineReducers({
  swipelog,
  routing: routing as Reducer<any>
});

export interface IState {
  swipelog: TSwipeLogState;
}

export default rootReducer;
