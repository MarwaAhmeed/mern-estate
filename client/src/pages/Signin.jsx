// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";

export default function SignIn() {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password:""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlechange = (e) => {
    setformData({...formData,[e.target.id]:e.target.value})
  };
  const handlesubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify(formData)
      
    })
    const data = await res.json();
    if (data.success===false) {
      setLoading(false);
      setError(data.message);
      return;
      
    }
    setLoading(false);
    setError(null)
    navigate('/');
  }
  console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handlechange}
        ></input>
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handlechange}
        ></input>
        <button disabled={loading} className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading?'Loading...':'Sign in'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error }</p>}
    </div>
  );
}
