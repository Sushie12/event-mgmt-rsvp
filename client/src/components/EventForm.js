// src/components/EventForm.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EventForm({ user }) {
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/events", form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMsg("Event created!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
