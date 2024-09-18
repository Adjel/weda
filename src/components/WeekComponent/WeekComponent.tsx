import React, { useEffect, useState } from 'react';
import {Day, getDay} from '../day/day';
import { getDateFromDays } from '../../utils';

export interface Week {
  week: Day[]
}

function WeekComponent() {

const [week, setWeek] = useState<Week | null>(null)
const [isBackwardEnable, setIsBackwardEnable] = useState(false)

useEffect(() => {
  updateWeek()
}, [])

useEffect(() => {
  handleBackWardButton()
}, [week]);

function handleBackWardButton() {
  // does first day exist
  if (week && week.week.length !== 0) {
    const refDate = week.week[0]?.date ?? null;

    // is the first day equal to today
    if (refDate && refDate?.getDate() !== new Date().getDate()) {

      setIsBackwardEnable(true);
    } else {
      setIsBackwardEnable(false);
    }
  } else {
    setIsBackwardEnable(false);
  }
}

function updateWeek(referenceDate?: Date) {
  const firstDay = referenceDate ?? new Date();
  let newWeek: Day[] = []
  for (let i = 0; i < 7; i++) {
    newWeek.push(getDay(firstDay, i))
  } 
  
  setWeek(
    {week: newWeek}
  )
}

// move to next or previous week
function moveWeek(isForward: boolean) {
  let move

  if (!week || week.week.length === 0) {
    // todo: handle error
    return;
  }

  const refDate = week.week[0]?.date ?? null;

  // we can't get to previous if first day is today
  if (!isForward) {
    if (refDate === new Date()) {
      handleBackWardButton()
      return
    }
    move = -7
  } else {
    move = 7
  }
 
    updateWeek(getDateFromDays(refDate, move));
}

  return <section className='flex flex-row gap-8'>
    {
      isBackwardEnable &&
      <button onClick={() => moveWeek(false)}>{`<`}</button>
    }
    {week?.week?.map((day) => 
    <div className='flex flex-col items-center'>
      <div className='text-gray-500'>
   {day.date.toLocaleDateString('fr-FR', { weekday: 'short' })}
      </div>
      <div>
      {day.date.getDate()}
      {day.date.toLocaleDateString('fr-FR', { month: 'short' })}
      </div>
         
    </div>
    )}
        <button onClick={() => moveWeek(true)}>{`>`}</button>
  </section>;
}

export default WeekComponent;
