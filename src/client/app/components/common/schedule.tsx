import React from 'react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useAuth } from '@/app/utils/hooks';
import { ISchedules } from '@/app/types/common';
import { useRouter } from 'next/navigation';

interface IScheduleProps {
  schedule: ISchedules;
  setSchedule: (schedules: (schedules: ISchedules[]) => ISchedules[]) => void;
  isList?: boolean;
}

function Schedule({ schedule, setSchedule, isList = true }: IScheduleProps) {
  const router = useRouter();
  const { train_name, schedule_id, departure_station, departure_time, arrival_station, arrival_time } = schedule;
  const { accessToken } = useAuth();

  if (!schedule?.schedule_id) {
    alert('Something went wrong. Please reload the page');
    return router.push('/schedule');
  }
  const handleDelete = async (e) => {
    const reqOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}train-schedule/${schedule_id}`, reqOptions);
      if (response.ok) {
        if (isList) setSchedule((schedules: ISchedules[]) => schedules.filter((s) => s.schedule_id !== schedule_id));
        else router.push('/schedule');
        alert(`The train ${train_name} is deleted successfully`);
      } else {
        alert('Failed to delete the train schedule.');
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };
  const dateFormat: string = 'LLLL/dd/yyyy, HH:mm';

  const departureTime: string = departure_time && format(parseISO(departure_time), dateFormat);
  const arrivalTime: string = arrival_time && format(parseISO(arrival_time), dateFormat);

  return (
    <div className={`flex flex-col mb-8 p-4 max-w-fit border-gray-200 rounded ${isList ? 'border-4' : ''}`}>
      <header className={'flex justify-between'}>
        <h2>
          <Link href={`/schedule/${schedule_id}`}>Train:&nbsp;{train_name}</Link>
        </h2>
        <div className="actions">
          <Link
            className={'mr-4 px-3 py-1 border-2 rounded hover:bg-gray-600 hover:bg-gray-300 hover:text-gray-900'}
            href={`/schedule/edit/${schedule_id}`}
          >
            Go to edit
          </Link>
          <button
            className="delete px-3 py-1 border-2 border-red-500 rounded hover:bg-gray-600 hover:bg-gray-300 hover:text-red-500"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </header>

      <article className={'grid grid-cols-2 gap-2 mt-4'}>
        <div className="infoElem flex">
          <p className="subtitle capitalize">departure station</p>:&nbsp;{departure_station}
        </div>
        <div className="infoElem flex">
          <p className="subtitle capitalize">departure time</p>:&nbsp;{departureTime}
        </div>
        <div className="infoElem flex">
          <p className="subtitle capitalize">arrival station</p>:&nbsp;{arrival_station}
        </div>
        <div className="infoElem flex">
          <p className="subtitle capitalize">arrival time</p>:&nbsp;{arrivalTime}
        </div>
      </article>
    </div>
  );
}

export default Schedule;
