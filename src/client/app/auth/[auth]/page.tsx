'use client';
import React, { SyntheticEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import secureLocalStorage from 'nextjs-secure-local-storage';

type AuthType = 'login' | 'signup';

const Auth = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { auth: authType } = useParams<Record<string, AuthType>>();
  const isRegister = authType === 'signup';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const bodyData = {
      ...(isRegister && { username: userName }),
      email,
      password,
    };

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    };

    const res = await fetch(`http://localhost:4000/auth/${authType}`, reqOptions);

    const { accessToken, user } = await res.json();

    if (accessToken && user) {
      secureLocalStorage.setItem('authData', { accessToken, user });
    } else secureLocalStorage.removeItem('authData');
  };

  const handleSetUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form
      className={'flex items-center justify-center h-screen flex-col h-screen text-gray-800'}
      onSubmit={handleSubmit}
    >
      <h1 className="h3 mb-3 fw-normal text-gray-100">Please {isRegister ? 'register' : 'login'}</h1>

      {isRegister && (
        <input className="form-control mb-1 p-1 rounded" placeholder="Name" required onChange={handleSetUserName} />
      )}

      <input
        type="email"
        className="form-control mb-1 p-1 rounded"
        placeholder="Email"
        required
        onChange={handleSetEmail}
      />

      <input
        type="password"
        className="form-control mb-3 p-1 rounded"
        placeholder="Password"
        required
        onChange={handleSetPassword}
      />

      <button className="w-100 btn btn-lg btn-primary bg-gray-100 px-3 py-1 rounded" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Auth;
