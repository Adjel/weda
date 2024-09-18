

export interface Day {
  date: Date,
  slots: Slot[]
}

export interface Slot {
  start?: Date,
  end?: Date
}

function getRandomHour(startDate: Date): Date {

  console.log(startDate)

  const endofDay = new Date(startDate)
  endofDay.setHours(23, 59, 0, 0)

  const randomTime = Math.random() * (endofDay.getHours() - startDate.getHours()) + endofDay.getHours();

  console.log(randomTime)

  const newTime = new Date(startDate)
  newTime.setHours(randomTime)

  return newTime
}


function generateRandomSlots(date: Date): Slot[] {
  const numSlots = Math.floor(Math.random() * 11);
  const slots: Slot[] = [];

  let start = new Date(date.setHours(0, 0, 0, 0))
  let end = getRandomHour(start)

  for (let i = 0; i < numSlots && end.getHours() < 23.30; i++) {

    start = end
    end = getRandomHour(start)

    slots.push({ start, end });
  
  }

  return slots;
}


export function getDay(date: Date, days: number = 0): Day {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);



  const slots = generateRandomSlots(date);

  return {
    date: newDate,
    slots
  };
}

