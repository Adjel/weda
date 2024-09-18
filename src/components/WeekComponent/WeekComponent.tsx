import React, { useEffect, useState } from 'react';
import {Day, getDay} from '../day/day';

export interface Week {
  week: Day[]
}


function WeekComponent() {

  const [week, setWeek] = useState<Week | null>(null)


function getWeek() {
  let newWeek: Day[] = []
  for (let i = 0; i < 7; i++) {
    newWeek.push(getDay(i))
  } 
  
  setWeek(
    newWeek
  )
  
}


  return <div></div>;
}

export default WeekComponent;
