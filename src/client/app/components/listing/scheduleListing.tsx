import React from 'react';
import Schedule from '@/app/components/common/schedule';
import { ISchedules } from '@/app/types/common';

interface IScheduleListingProps {
  schedules: ISchedules;
  setSchedule: (schedules: (schedules: ISchedules[]) => ISchedules[]) => void;
}

function ScheduleListing({ schedules, setSchedule }: IScheduleListingProps) {
  return schedules.map((schedule: ISchedules, index: number) => (
    <Schedule schedule={schedule} setSchedule={setSchedule} key={schedule?.schedule_id || index} />
  ));
}

export default ScheduleListing;
