'use client';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import secureLocalStorage from 'nextjs-secure-local-storage';
import { Datetimepicker, initTE, Input } from 'tw-elements';

import TimePicker from 'react-time-picker';

initTE({ Datetimepicker, Input });

type AuthType = 'login' | 'signup';

const EditSchedule = () => {
  const [schedule, setSchedule] = useState({});
  const { schedule: schedule_id } = useParams<Record<string, AuthType>>();

  const { train_name, departure_station, departure_time, arrival_station, arrival_time } = schedule;

  const fetchData = async () => {
    const { accessToken } = secureLocalStorage.getItem('authData');
    const reqOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
    };
    try {
      console.log('secureLocalStorage.getItem(): ', secureLocalStorage.getItem('authData'));
      const response = await fetch(`http://localhost:4000/train-schedule/${schedule_id}`, reqOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const schedule = await response.json();
      console.log('schedule: ', schedule);
      setSchedule(schedule);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log('formData: ', formData);
    const bodyData = { ...formData };
    console.log('bodyData: ', bodyData);
    //
    // const { accessToken } = secureLocalStorage.getItem('authData');
    //
    // const reqOptions = {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
    //   body: bodyData,
    // };
    // const res = await fetch(`http://localhost:4000/train-schedule/${schedule_id}`, reqOptions);
    //
    // const { train_name } = await res.json();
    // alert(`Train schedule on ${train_name} was removed successfully`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTimePicker = (time) => {
    console.log('time: ', time);
  };

  return (
    <form
      className={'flex items-center justify-center h-screen flex-col h-screen text-gray-800'}
      id="formEditSchedule"
      onSubmit={handleSubmit}
    >
      <h2 className="h3 mb-3 fw-normal text-gray-100">Train: {train_name}</h2>

      <div className={'flex flex-col'}>
        <input
          name="departure_station"
          className="form-control mb-1 p-1 rounded"
          placeholder="Departure Station"
          defaultValue={departure_station}
        />
        {/*// TODO: Change to something like this: https://tw-elements.com/docs/standard/forms/timepicker/*/}
        <input
          name="arrival_station"
          className="form-control mb-1 p-1 rounded"
          placeholder="Arrival Station"
          defaultValue={arrival_station}
        />

        <TimePicker onChange={handleTimePicker} className={''} clockClassName={'w-8'} />
        <TimePicker onChange={handleTimePicker} className={''} clockClassName={'w-8'} />
      </div>

      <button
        className="w-100 btn btn-lg btn-primary bg-gray-100 px-3 py-1 rounded"
        form="formEditSchedule"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default EditSchedule;
