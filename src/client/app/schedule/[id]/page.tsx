'use client';
import React, { useEffect, useState } from 'react';
import Schedule from '@/app/components/common/schedule';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/utils/hooks';
import { ISchedules } from '@/app/types/common';

function InfoSchedule({}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [schedule, setSchedule] = useState<ISchedules>({});
  const { schedule: id } = useParams<Record<string, string>>();
  const { accessToken } = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    const reqOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}train-schedule/${id}`, reqOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const schedule = await response.json();
      setSchedule(schedule);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={'flex justify-center'}>
      {isLoading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
      ) : (
        <Schedule schedule={schedule} />
      )}
    </div>
  );
}

export default InfoSchedule;
