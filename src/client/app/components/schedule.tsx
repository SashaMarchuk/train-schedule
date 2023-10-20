import React from 'react';
import secureLocalStorage from 'nextjs-secure-local-storage';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

function Schedule({
  schedule: { train_name, schedule_id, departure_station, departure_time, arrival_station, arrival_time },
}) {
  const handleDelete = async (e) => {
    // TODO fetch route `http://localhost:4000/train-schedule/${schedule_id}`
    const { accessToken } = secureLocalStorage.getItem('authData');

    const formData = new FormData(e.currentTarget);
    const bodyData = { ...formData };

    const reqOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
      body: bodyData,
    };
    const res = await fetch(`http://localhost:4000/train-schedule/${schedule_id}`, reqOptions);

    const { train_name } = await res.json();
    alert(`Train schedule on ${train_name} was deleted successfully`);
  };

  const departureTime = format(parseISO(departure_time), 'LLLL d, yyyy');
  const arrivalTime = format(parseISO(arrival_time), 'LLLL d, yyyy');

  return (
    <div className={'flex flex-col mb-8 p-4 max-w-fit border-4 border-gray-200 rounded'}>
      <header className={'flex justify-between'}>
        <h2>Train:&nbsp;{train_name}</h2>
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
