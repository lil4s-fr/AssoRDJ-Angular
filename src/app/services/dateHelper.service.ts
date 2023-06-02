import { DateTime } from "luxon";

export class DateHelper{
  dateTimeDepuisISO(dateIso:string):DateTime {
    return DateTime.fromISO(dateIso);
  }

  isoDepuisDateTime(dateTime:DateTime):string{
    let iso = dateTime.toISO();
    if(iso == null){
      throw new Error;
    }
    return iso;
  }
}