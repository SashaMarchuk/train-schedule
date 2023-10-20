'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/users');
    const users = await response.json();
    console.log('users: ', users);

    setData(users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <main></main>;
}
