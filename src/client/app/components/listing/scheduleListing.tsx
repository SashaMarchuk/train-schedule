import React from 'react';
import Schedule from '@/app/components/schedule';

function ScheduleListing({ schedules }) {
  return schedules.map((schedule, index) => <Schedule schedule={schedule} key={schedule?.schedule_id || index} />);
}

export default ScheduleListing;
