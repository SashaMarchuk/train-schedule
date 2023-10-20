'use client';
import React, { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import secureLocalStorage from 'nextjs-secure-local-storage';

type AuthType = 'login' | 'signup';

const CreateSchedule = () => {
  const [schedule, setSchedule] = useState({});
  const { schedule: schedule_id } = useParams<Record<string, AuthType>>();

  const { train_name, departure_station, departure_time, arrival_station, arrival_time } = schedule;

  const fetchData = async () => {
    const {
      user: { user_id },
      accessToken,
    } = secureLocalStorage.getItem('authData');
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
    };
    try {
      console.log('secureLocalStorage.getItem(): ', secureLocalStorage.getItem('authData'));
      const response = await fetch(`http://localhost:4000/train-schedule/${schedule_id}`, reqOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const schedule = await response.json();
      setSchedule(schedule);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent): FormEvent<HTMLFormElement> => {
    e.preventDefault();
    const {
      user: { user_id },
      accessToken,
    } = secureLocalStorage.getItem('authData');

    const formData = new FormData(e.currentTarget);
    const bodyData = { ...formData };

    const { accessToken } = secureLocalStorage.getItem('authData');

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
      body: bodyData,
    };
    const res = await fetch(`http://localhost:4000/train-schedule/${schedule_id}`, reqOptions);

    const { train_name } = await res.json();
    alert(`Train schedule on ${train_name} was created successfully`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form
      className={'flex items-center justify-center h-screen flex-col h-screen text-gray-800'}
      onSubmit={handleSubmit}
    >
      <input name="train_name" className="form-control mb-1 p-1 rounded" placeholder="Departure Station" />

      <div className={'flex'}>
        <input name="departure_station" className="form-control mb-1 p-1 rounded" placeholder="Departure Station" />
        <input name="departure_time" className="form-control mb-1 p-1 rounded" placeholder="Departure Time" />
        <input name="arrival_station" className="form-control mb-1 p-1 rounded" placeholder="Arrival Station" />
        <input name="arrival_time" className="form-control mb-1 p-1 rounded" placeholder="Arrival Time" />
      </div>

      <button className="w-100 btn btn-lg btn-primary bg-gray-100 px-3 py-1 rounded" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateSchedule;
