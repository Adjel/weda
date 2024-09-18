import React from 'react';

export interface Day {
  day: Date,
  slots: Slot[]
}

export interface Slot {
  start: Date,
  end: Date
}

export function getDay(nextDay:number = 0) {
  return {
    day: new Date(),
    slots: []
  }
}

function day() {

 

  return <div></div>;
}

export default day;
