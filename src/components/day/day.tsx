import React from 'react';
import { getDateFromDays } from '../../utils';

export interface Day {
  date: Date,
  slots: Slot[]
}

export interface Slot {
  start: Date,
  end: Date
}

export function getDay(date: Date, days:number = 0): Day {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return {
    date: getDateFromDays(date, days),
    slots: []
  }
}

function day() {

 

  return <div></div>;
}

export default day;
