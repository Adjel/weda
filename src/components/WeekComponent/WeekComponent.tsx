import React, { useEffect, useState } from 'react';
import DayComponent, { Day, getDay } from '../day/DayComponent';
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

  return <section className='flex flex-row gap-8 items-start'>
    {
      isBackwardEnable &&
      <button onClick={() => moveWeek(false)}>{`<`}</button>
    }
    {week?.week?.map((day, index) => 
    <div key={day.date.toDateString()} className='flex flex-col items-center'>
      <div className='text-gray-500'>
        {day.date.toLocaleDateString('fr-FR', { weekday: 'short' })}
      </div>
      <div>
      {day.date.getDate()}
      {day.date.toLocaleDateString('fr-FR', { month: 'short' })}
      </div>
      <div key={index} className='pt-4 flex flex-col gap-2 items-center'>
        {day.slots.map((slot, index) => 
        slot.start ?
        <div key={index} className='px-6 w-fit h-fit rounded-lg bg-slate-500'>{slot.start?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
        :
        <div>{`—`}</div>
      )
      }
      </div>
    </div>
    )}
    <button onClick={() => moveWeek(true)}>{`>`}</button>
  </section>;
}

export default WeekComponent;
