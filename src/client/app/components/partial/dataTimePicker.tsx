'use client';
import React, { useEffect, useState } from 'react';

const PartialDateTimePicker = ({ initialDate, onUpdateDateTime, title }) => {
  const newInitialDate = new Date(initialDate);
  const [selectedDate, setSelectedDate] = useState(newInitialDate || new Date());
  const [selectedTime, setSelectedTime] = useState(
    (newInitialDate || new Date()).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', hour12: false }),
  );

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      const newDate = new Date(`${year}-${month}-${day}`);
      setSelectedDate(newDate);
      if (onUpdateDateTime) {
        onUpdateDateTime(getISODateTime(newDate));
      }
    } else {
      console.log('Invalid date format. Please use "yyyy-MM-dd" format.');
    }
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (timeRegex.test(selectedTime)) {
      if (onUpdateDateTime) {
        onUpdateDateTime(getISODateTime(selectedDate));
      }
    } else {
      console.log('Invalid time format. Please use "HH:mm" format in 24-hour notation.');
    }
  };

  const getISODateTime = (date) => {
    const isoDate = date.toISOString();
    const isoTime = `T${selectedTime}:00.000Z`;
    return isoDate.substring(0, 10) + isoTime;
  };

  const inputSelectedDate = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    if (onUpdateDateTime) {
      onUpdateDateTime(getISODateTime(selectedDate));
    }
  }, [selectedDate, selectedTime]);

  return (
    <div className="text-gray-900 flex gap-4 justify-between">
      <p className="text-white capitalize">{title}</p>

      <label className="text-white">
        Date: <input className="text-gray-900" type="date" value={inputSelectedDate} onChange={handleDateChange} />
      </label>

      <label className="text-white">
        Time:{' '}
        <input
          className=" text-gray-900"
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          pattern="([0-1][0-9]|2[0-3]):[0-5][0-9]"
          required
        />
      </label>
    </div>
  );
};

export default PartialDateTimePicker;
