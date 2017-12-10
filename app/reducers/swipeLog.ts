import { appendFileSync, readFileSync } from 'fs';
// import  * as parse from 'csv-parse/lib/sync';
// import  * as stringify from 'csv-stringify/lib/sync';
import { IActionWithPayload } from '../actions/helpers';
import { addSwipe, IAddSwipePayload } from '../actions/swipe';

const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');

export type TSwipe = {
  id: string,
  netid: string,
  name: string,
  team: string,
  timestamp: Date,
  direction: string,
  is_trained: boolean,
};

export type TState = Array<TSwipe>;

const swipelog_filename = "swipelog.csv";
const swiplog_columns = ["id", "netid", "name", "team", "timestamp", "direction", "is_trained"];

const roster_filename = "roster.csv";
const roster_columns = ["netid", "name", "id", "team", "is_trained"];
const roster_csv = readFileSync(roster_filename);
const roster = parse(roster_csv, { columns: roster_columns}).slice(1);
const roster_by_id = Object.assign({}, ...roster.map((s: any) => ({[s.id]: s})));
console.log(roster_by_id);


function getPreviousSwipes() {
  try {
    const swipelog_csv = readFileSync(swipelog_filename);
    const swipelog = parse(swipelog_csv, { columns: swiplog_columns, auto_parse: true, auto_parse_date: true });
    return swipelog;
  } catch (error) {
    return [];
  }
}

export default function home(state: TState = getPreviousSwipes(), action: IActionWithPayload<IAddSwipePayload>): TState {
  if (addSwipe.test(action)) {
    const person = roster_by_id[action.payload.id];

    let swipe: TSwipe;

    if (person) {
      swipe = {
        ...action.payload,
        netid: person.netid,
        name: person.name,
        team: person.team,
        is_trained: person.is_trained === "Y",
      }
    } else {
      if (confirm(`ID ${action.payload.id} unrecognized. Add anyway?`)) {
        swipe = {
          ...action.payload,
          netid: "",
          name: "",
          team: "",
          is_trained: false,
        }
      } else {
        return state;
      }
    } 
    
    appendFileSync(swipelog_filename, stringify([swipe], { columns: swiplog_columns }));
    return [...state, swipe];
  }

  return state;
}
