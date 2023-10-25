'use client';
import React, { SyntheticEvent, useState } from 'react';
import { useAuth } from '@/app/utils/hooks';
import PartialDateTimePicker from '@/app/components/partial/dataTimePicker';
import { ISchedules, ISelectedDates } from '@/app/types/common';

const CreateSchedule = () => {
  const {
    accessToken,
    user: { user_id },
  } = useAuth();
  const [selectedDates, setSelectedDates] = useState<ISelectedDates>({});

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const departureTime = selectedDates?.departure_time;
    const arrivalTime = selectedDates?.arrival_time;

    const formData = new FormData(e.currentTarget);

    const bodyData: ISchedules = {
      user_id,
      departure_time: new Date(departureTime).toISOString(),
      arrival_time: new Date(arrivalTime).toISOString(),
    };

    formData.forEach((value, key) => {
      bodyData[key] = value as string;
    });

    console.log('bodyData: ', bodyData);

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
      body: JSON.stringify(bodyData),
    };
    console.log('bodyData: ', bodyData);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}train-schedule`, reqOptions);

    const { train_name } = await response.json();
    alert(`Train schedule on ${train_name} was created successfully`);
  };

  const handleDateChange = (id: string, date: string) => {
    setSelectedDates((prevDates) => ({ ...prevDates, [id]: date }));
  };

  const handleUpdateArrivalTime = (date: ISchedules['arrival_time']) => {
    return handleDateChange('arrival_time', date);
  };

  const handleUpdateDepartureTime = (date: ISchedules['departure_time']) => {
    return handleDateChange('departure_time', date);
  };

  return (
    <form className="flex flex-1 items-center justify-center flex-col not:input:text-white" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-4">
        <label className="flex gap-4 justify-between">
          Train&nbsp;Name:
          <input
            name="train_name"
            className="form-control p-1 rounded w-full text-gray-800"
            placeholder="Train Name"
            required
          />
        </label>
        <label className="flex gap-4 justify-between">
          Departure&nbsp;Station:
          <input
            name="departure_station"
            className="form-control p-1 w-full rounded text-gray-800"
            placeholder="Departure Station"
            required
          />
        </label>

        <PartialDateTimePicker
          initialDate={new Date()}
          onUpdateDateTime={handleUpdateDepartureTime}
          title={'Departure Time'}
        />

        <label className="flex gap-4 justify-between">
          Arrival&nbsp;Station:
          <input
            name="arrival_station"
            className="form-control p-1 w-full rounded text-gray-800"
            placeholder="Arrival Station"
            required
          />
        </label>

        <PartialDateTimePicker
          initialDate={new Date()}
          onUpdateDateTime={handleUpdateArrivalTime}
          title={'Arrival Time'}
        />
      </div>

      <button className="btn btn-lg btn-primary bg-gray-100 px-3 py-1 rounded text-gray-800" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateSchedule;
