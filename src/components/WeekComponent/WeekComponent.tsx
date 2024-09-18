import React, { useEffect, useState } from 'react';
import {Day, getDay} from '../day/day';

export interface Week {
  week: Day[]
}


function WeekComponent() {

const [week, setWeek] = useState<Week | null>(null)

useEffect(() => {
  getWeek()
}, [])

function getWeek() {
  const referenceDate = week ? week.week[0]?.date : new Date();
  let newWeek: Day[] = []
  for (let i = 0; i < 7; i++) {
    newWeek.push(getDay(referenceDate, i))
  } 
  
  setWeek(
    {week: newWeek}
  )
}

  return <section className='flex flex-row gap-6'>
    {week?.week?.map((day) => 
    <div>
      {day.date.toLocaleDateString()}
    </div>
    )}
  </section>;
}

export default WeekComponent;
