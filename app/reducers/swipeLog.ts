import { appendFileSync, readFileSync } from 'fs';
// import  * as parse from 'csv-parse/lib/sync';
// import  * as stringify from 'csv-stringify/lib/sync';
import { IActionWithPayload } from '../actions/helpers';
import { addSwipe, IAddSwipePayload } from '../actions/home';

const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');


export type TState = Array<IAddSwipePayload>;

const swipelog_filename = "swipelog.csv";
const swiplog_columns = ["id", "timestamp", "direction"];

function getPreviousSwipes() {
  try {
    const swipelog_csv = readFileSync(swipelog_filename);
    const swipelog = parse(swipelog_csv, { columns: swiplog_columns });
    return swipelog;
  } catch (error) {
    return [];
  }
}

export default function home(state: TState = getPreviousSwipes(), action: IActionWithPayload<IAddSwipePayload>): TState {
  if (addSwipe.test(action)) {
    appendFileSync(swipelog_filename, stringify([action.payload], { columns: swiplog_columns, auto_parse: true, auto_parse_date: true }));
    return [...state, action.payload];
  }

  return state;
}
