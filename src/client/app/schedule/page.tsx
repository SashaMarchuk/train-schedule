'use client';
import React, { useEffect, useState } from 'react';
import ScheduleListing from '@/app/components/listing/scheduleListing';
import secureLocalStorage from 'nextjs-secure-local-storage';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const fetchData = async () => {
    const {
      user: { user_id },
      accessToken,
    } = secureLocalStorage.getItem('authData');
    const reqOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
    };
    try {
      console.log('secureLocalStorage.getItem(): ', secureLocalStorage.getItem('authData'));
      const response = await fetch(`http://localhost:4000/train-schedule/user/${user_id}`, reqOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const schedules = await response.json();
      setScheduleData(schedules);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log('scheduleData: ', scheduleData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={'flex flex-col items-center'}>
      <ScheduleListing schedules={scheduleData} />
    </div>
  );
};

export default Schedule;
