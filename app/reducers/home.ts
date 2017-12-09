import { IActionWithPayload } from '../actions/helpers';
import { addID, IAddIDPayload } from '../actions/home';

export type TState = Array<string>;

export default function home(state: TState = [], action: IActionWithPayload<IAddIDPayload>) {
  if (addID.test(action)) {
    return [...state, action.payload.id];
  }

  return state;
}
