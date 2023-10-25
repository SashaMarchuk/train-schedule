export interface ISelectedDates {
  departure_time: string;
  arrival_time: string;
}

export interface ISchedules {
  schedule_id: number;
  train_name: string;
  departure_station: string;
  arrival_station: string;
  departure_time: string;
  arrival_time: string;
  user_id: number;
}
