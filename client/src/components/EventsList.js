// src/components/EventsList.js

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EventsList({ user }) {
  const [events, setEvents] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then(res => setEvents(res.data))
      .catch(() => setMsg("Failed to load events"));
  }, []);

  const handleRSVP = async (eventId) => {
    const name = prompt("Enter your name to RSVP:");
    if (!name) return;
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/rsvp`, { name });
      setMsg("RSVP successful!");
      setEvents(events =>
        events.map(ev =>
          ev._id === eventId ? { ...ev, rsvps: [...ev.rsvps, name] } : ev
        )
      );
    } catch {
      setMsg("RSVP failed");
    }
  };

  return (
    <div>
      <h2>Events</h2>
      {msg && <p>{msg}</p>}
      {events.map(ev => (
        <div key={ev._id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
          <h3>{ev.title}</h3>
          <p>{ev.description}</p>
          <p>Date: {new Date(ev.date).toLocaleDateString()}</p>
          <p>Attendees: {ev.rsvps?.length || 0}</p>
          {ev.rsvps && ev.rsvps.length > 0 && (
            <ul>
              {ev.rsvps.map((name, idx) => <li key={idx}>{name}</li>)}
            </ul>
          )}
          {user && <button onClick={() => handleRSVP(ev._id)}>RSVP</button>}
        </div>
      ))}
    </div>
  );
}
