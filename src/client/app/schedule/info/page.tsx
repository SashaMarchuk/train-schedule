import React, { useState } from 'react';
import Schedule from '@/app/components/schedule';
import secureLocalStorage from 'nextjs-secure-local-storage';
import { useParams } from 'next/navigation';

function InfoSchedule({}) {
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
      setSchedule(schedule);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return <Schedule schedule={schedule} />;
}

export default InfoSchedule;
