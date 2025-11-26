import type { ForecastItem } from '../types/weather';

export const getDailyForecasts = (list: ForecastItem[]) => {
  const dailyMap = new Map<string, ForecastItem>();
  let counter=0


  for (let index = 0; index < list.length; index++) {

    if(counter >= 5)break;

    //date-time is in format : 2025-10-11 12:00:00
    const date = list[index].dt_txt.split(' ')[0]
    const time = list[index].dt_txt.split(' ')[1]

    
    
    if(!dailyMap.has(date) && (time === '12:00:00' || time === '15:00:00'))
      {
        dailyMap.set(date,list[index]);
        counter++;
    }
    
  }
  
  return Array.from(dailyMap.values());
};
