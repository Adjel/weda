import { useState } from "react";
import { getDateFromDays } from "../../utils"


export interface Day {
  date: Date,
  slots: Slot[]
}

export interface Slot {
  start?: Date,
  end?: Date
}

function getRandomHour(startDate: Date, lastStart: Date): Date {
  const endOfDay = new Date(startDate);
  endOfDay.setHours(23, 59, 0, 0);

  // random time
  const startTime = startDate.getTime();
  const endTime = endOfDay.getTime();
  const randomTime = Math.random() * (endTime - startTime) + startTime;

  let newTime = new Date(randomTime);

  // get rounded hour
  const minutes = newTime.getMinutes();
  if (minutes < 15) {
    newTime.setMinutes(0, 0, 0); 
  } else if (minutes >= 15 && minutes < 45) {
    newTime.setMinutes(30, 0, 0); 
  } else {
    newTime.setMinutes(0, 0, 0);
    newTime.setHours(newTime.getHours() + 1);
  }

  // avoid two same start
  if (newTime.getHours() === lastStart.getHours()) {
    return getRandomHour(startDate, lastStart)
  }
  return newTime;
}


function generateRandomSlots(date: Date): Slot[] {
  const numSlots = Math.floor(Math.random() * 11);
  const slots: Slot[] = [];

  let start = new Date(date.setHours(0, 0, 0, 0))
  let end = getRandomHour(start, start)

  for (let i = 0; i < numSlots && end < getDateFromDays(date, 1); i++) {
    start = getRandomHour(end, start)
    end = getRandomHour(start, start)

    slots.push({ start, end });
  
  }
  return slots;
}


export function getDay(date: Date, days: number = 0): Day {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);

  const slots = generateRandomSlots(newDate);

  return {
    date: newDate,
    slots
  };
}

export function DayComponent({ slot }: { slot?: Slot }) {
  const [isClicked, setIsClicked] = useState(-1)

  const handleClick = () => {
    if (isClicked < 2) {
      setIsClicked(isClicked+1)
    } else {
      setIsClicked(-1)
    }
    console.log(isClicked)
  }

  let bgColor 

  if (isClicked === 0 ) {
    bgColor = "bg-black text-white"
  } else if (isClicked === 1) {
     bgColor = "bg-green-500"
  } else if (isClicked === 2) {
     bgColor = "bg-blue-500"
  } else {
    bgColor = "bg-slate-500"
  }

  return <div>
      <div onClick={handleClick} className={`hover:bg-black hover:text-white cursor-pointer px-6 w-fit h-fit rounded-lg ${bgColor}`}>{slot?.start?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
  </div>
}

