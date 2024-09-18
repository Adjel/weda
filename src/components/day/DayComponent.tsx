import React, { useEffect, useState } from 'react';
import { getDateFromDays } from '../../utils';

export interface Day {
  date: Date,
  slots: Slot[]
}

export interface Slot {
  start?: Date,
  end?: Date
}

function generateRandomTime(startTime: Date): Date {
  const startHours = startTime.getHours();
  const startMinutes = startTime.getMinutes();

  const randomDate = new Date(startTime);

  const hours = Math.floor(Math.random() * (24 - startHours) + startHours);
  const minutes = Math.random() < 0.5 ? 0 : 30;

  randomDate.setHours(hours, minutes, 0, 0);

  if (hours === startHours && minutes < startMinutes) {
    generateRandomTime(startTime)
  }

  return randomDate;
}

const startTime = new Date();
startTime.setHours(14, 0); 
const randomTime = generateRandomTime(startTime);
console.log(randomTime.toTimeString());


export function getDay(date: Date, days:number = 0): Day {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);

  const slots = []
  let start
  let end

  const randomNumber = Math.floor(Math.random() * 10);
  for (let i = 0; i < randomNumber; i++) {
    const midnightDate = new Date(date);
    midnightDate.setHours(0, 0, 0, 0);
    end
    start = generateRandomTime(end ?? midnightDate)
    end = generateRandomTime(start)

    slots.push({
      start: start,
      end: end
    })
  }

  return {
    date: getDateFromDays(date, days),
    slots: slots
  }
}

function DayComponent() {
  const [day, setDay]= useState<Day>()

  return <div>{}</div>;
}

export default DayComponent;
