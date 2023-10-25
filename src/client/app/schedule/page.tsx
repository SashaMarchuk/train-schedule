'use client';
import React, { useEffect, useState } from 'react';
import ScheduleListing from '@/app/components/listing/scheduleListing';
import { useAuth } from '@/app/utils/hooks';

const SchedulePage = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const { user, accessToken } = useAuth();

  const fetchData = async () => {
    const reqOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}train-schedule/user/${user.user_id}`, reqOptions);
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
      <ScheduleListing schedules={scheduleData} setSchedule={setScheduleData} />
    </div>
  );
};

export default SchedulePage;
