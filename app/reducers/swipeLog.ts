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

export type TPerson = {
  id: string,
  netid: string,
  name: string,
  timestamp: Date,
  is_trained: boolean,
}

export type TSwipeLog = Array<TSwipe>;
export type TCurrentMembers = Array<{ team_name: string, people: Array<TPerson> }>

export type TState = {
  swipes: TSwipeLog,
  currentMembers: TCurrentMembers,
}

const swipelog_filename = "swipelog.csv";
const swiplog_columns = ["id", "netid", "name", "team", "timestamp", "direction", "is_trained"];

const roster_filename = "roster.csv";
const roster_columns = ["netid", "name", "id", "team", "is_trained"];
const roster_csv = readFileSync(roster_filename);
const roster = parse(roster_csv, { columns: roster_columns}).slice(1);
const roster_by_id = Object.assign({}, ...roster.map((s: any) => ({[s.id]: s})));


function addSwipeToCurrentMembers(currentMembers: TCurrentMembers, swipe: TSwipe, ignore_errors: boolean = false): TCurrentMembers {
  const dalert = ignore_errors? (s: string) => {} : alert;
  const idx = currentMembers.findIndex(currentMember => swipe.team === currentMember.team_name);
  if (idx != -1) {
    const currentMember = currentMembers[idx];
    let newPeople;

    if (swipe.direction === "enter") {
      if (currentMember.people.find(person => person.id == swipe.id)) {
        dalert("Already in.");
        return currentMembers;
      }
      newPeople = [...currentMember.people, swipe];
    } else {
      const j = currentMember.people.findIndex(person => person.id == swipe.id);
      if (j === -1) {
        dalert("Already out.");
        return currentMembers;
      }
      newPeople = currentMember.people.slice();
      newPeople.splice(j, 1);
    }

    const newCurrentMembers = currentMembers.slice();
    if (newPeople.length) {
      newCurrentMembers.splice(idx, 1, { ...currentMember, people: newPeople});
    } else {
      newCurrentMembers.splice(idx, 1);
    }
    return newCurrentMembers;
  } else {
    if (swipe.direction === "enter") {
      return [...currentMembers, { team_name: swipe.team, people: [swipe]}];
    } else {
      dalert("Cannot exit if out.");
      return currentMembers;
    }
  }
}


function getPreviousSwipes(): TState {
  try {
    const swipelog_csv = readFileSync(swipelog_filename);
    const swipelog = parse(swipelog_csv, { columns: swiplog_columns, auto_parse: true, auto_parse_date: true });
    return {
      swipes: swipelog.slice().reverse(),
      currentMembers: swipelog.reduce((c: TCurrentMembers, s: TSwipe) => addSwipeToCurrentMembers(c, s, true), []),
    };
  } catch (error) {
    console.log(error);
    return {
      swipes: [],
      currentMembers: [],
    };
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
    return {
      ...state,
      swipes: [swipe, ...state.swipes],
      currentMembers: addSwipeToCurrentMembers(state.currentMembers, swipe)
    };
  }

  return state;
}
