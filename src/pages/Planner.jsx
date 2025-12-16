import React, { useState } from 'react';

export default function Planner() {
  const [form, setForm] = useState({
    startingCity: '',
    destination: '',
    days: '',
    budget: '',
    interests: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Thanks! We’re generating your plan…');
  };

  return (
    <div className="min-h-screen px-8 py-16 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Trippligo Travel Planner
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="startingCity"
          value={form.startingCity}
          onChange={handleChange}
          placeholder="Starting City"
          className="w-full p-3 border rounded"
        />
        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="w-full p-3 border rounded"
        />
        <input
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="Number of Days"
          className="w-full p-3 border rounded"
        />
        <input
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="Budget (₹)"
          className="w-full p-3 border rounded"
        />
        <input
          name="interests"
          value={form.interests}
          onChange={handleChange}
          placeholder="Interests (comma separated)"
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Get Suggestions
        </button>
      </form>
    </div>
  );
}
