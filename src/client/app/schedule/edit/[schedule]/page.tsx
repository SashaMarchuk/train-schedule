'use client';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PartialDateTimePicker from '@/app/components/partial/dataTimePicker';
import { convertUnderscoreToSpace } from '@/app/utils/string';
import { ISchedules, ISelectedDates } from '@/app/types/common';
import { useAuth } from '@/app/utils/hooks';

type AuthType = 'login' | 'signup';

const EditSchedule = () => {
  const [schedule, setSchedule] = useState<ISchedules>({});
  const { schedule: schedule_id } = useParams<Record<string, AuthType>>();
  const [selectedDates, setSelectedDates] = useState<ISelectedDates>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const { train_name, departure_station, arrival_station } = schedule;

  const handleDateChange = (id: string, date: string) => {
    setSelectedDates((prevDates) => ({ ...prevDates, [id]: date }));
  };
  const authData = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    const { accessToken } = authData;
    const reqOptions: RequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}train-schedule/${schedule_id}`, reqOptions);
      if (response.status === 401) {
        router.push('/auth/login');
      } else if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setSchedule(data);
      if (data.departure_time && data.arrival_time) {
        setSelectedDates((prevDates) => ({
          ...prevDates,
          departure_time: data.departure_time,
          arrival_time: data.arrival_time,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const departureStation = formData.get('departure_station') as ISchedules['departure_station'];
    const arrivalStation = formData.get('arrival_station') as ISchedules['arrival_station'];
    const trainName = formData.get('train_name') as ISchedules['train_name'];

    const departureTime = selectedDates?.departure_time;
    const arrivalTime = selectedDates?.arrival_time;

    const {
      accessToken,
      user: { user_id },
    } = authData;

    const bodyData: any = {
      ...Object.fromEntries(formData),
      user_id,
      departure_time: new Date(departureTime).toISOString(),
      arrival_time: new Date(arrivalTime).toISOString(),
    };

    console.log('arrival_station: ', arrival_station);
    console.log('arrivalStation: ', arrivalStation);

    if (departure_station !== departureStation) bodyData.departure_station = departureStation;
    if (arrival_station !== arrivalStation) bodyData.arrival_station = arrivalStation;
    if (train_name !== trainName) bodyData.train_name = trainName;

    const reqOptions: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify(bodyData),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}train-schedule/${schedule_id}`, reqOptions);
      if (res.ok) {
        const data = await res.json();
        alert(`Train schedule on ${data.train_name} was updated successfully`);
      } else {
        console.error(`Request failed with status ${res.status}`);
        alert('Failed to update the train schedule.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the train schedule.');
    }
  };

  const handleUpdateDepartureTime = (date: ISchedules['departure_time']) => {
    return handleDateChange('departure_time', date);
  };

  const handleUpdateArrivalTime = (date: ISchedules['arrival_time']) => {
    return handleDateChange('arrival_time', date);
  };

  const showArrivalTimeComponent = !!selectedDates['arrival_time'];
  const showDepartureTimeComponent = !!selectedDates['departure_time'];

  return (
    <form
      className={'flex flex-1 items-center justify-center flex-col text-gray-800'}
      id="formEditSchedule"
      onSubmit={handleSubmit}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
      ) : (
        <>
          <div className={'flex flex-col gap-2'}>
            <div className="wrapper flex flex-col gap-3">
              <label htmlFor="train_name" className={'flex text-white gap-3'}>
                Train&nbsp;Name:{' '}
                <input
                  id="train_name"
                  name="train_name"
                  className="form-control p-1 rounded text-gray-800 w-full"
                  placeholder="Train Name"
                  defaultValue={train_name}
                />
              </label>
              <label htmlFor="departure_station" className={'flex text-white gap-3'}>
                Departure&nbsp;Station:
                <input
                  id="departure_station"
                  name="departure_station"
                  className="form-control p-1 rounded text-gray-800 w-full"
                  placeholder="Departure Station"
                  defaultValue={departure_station}
                />
              </label>

              <label htmlFor="arrival_station" className={'flex text-white gap-3'}>
                Arrival&nbsp;Station:
                <input
                  id={'arrival_station'}
                  name="arrival_station"
                  className="form-control p-1 rounded text-gray-800 w-full"
                  placeholder="Arrival Station"
                  defaultValue={arrival_station}
                />
              </label>
            </div>

            {showArrivalTimeComponent && (
              <PartialDateTimePicker
                initialDate={selectedDates['departure_time']}
                onUpdateDateTime={handleUpdateDepartureTime}
                title={convertUnderscoreToSpace('departure_time')}
              />
            )}

            {showDepartureTimeComponent && (
              <PartialDateTimePicker
                initialDate={selectedDates['arrival_time']}
                onUpdateDateTime={handleUpdateArrivalTime}
                title={convertUnderscoreToSpace('arrival_time')}
              />
            )}
          </div>

          <button
            className="w-100 mt-8 btn btn-lg btn-primary bg-gray-100 px-3 py-1 rounded"
            form="formEditSchedule"
            type="submit"
          >
            Submit
          </button>
        </>
      )}
    </form>
  );
};
export default EditSchedule;
