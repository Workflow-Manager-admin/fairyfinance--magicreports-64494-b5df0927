import React, { useState } from 'react';

// PUBLIC_INTERFACE
function FairyInputForm({ onAddRecord }) {
  const [input, setInput] = useState({
    age: '',
    tooth: '',
    date: '',
    earnings: '',
    notes: '',
  });

  // PUBLIC_INTERFACE
  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    if (!input.age || !input.tooth || !input.date || !input.earnings) return;
    onAddRecord(input);
    setInput({
      age: '',
      tooth: '',
      date: '',
      earnings: '',
      notes: '',
    });
  }

  return (
    <form className="fairy-form fairy-card" onSubmit={handleSubmit}>
      <div className="fairy-form-row">
        <label>
          Age:
          <input
            type="number"
            min="1"
            name="age"
            value={input.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tooth Lost:
          <input
            type="text"
            name="tooth"
            placeholder="e.g., incisor"
            value={input.tooth}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date Lost:
          <input
            type="date"
            name="date"
            value={input.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Earnings ($):
          <input
            type="number"
            min="0"
            step="0.01"
            name="earnings"
            value={input.earnings}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="fairy-form-row">
        <label style={{ flex: 1 }}>
          Notes:
          <input
            type="text"
            name="notes"
            placeholder="Optional magical details"
            value={input.notes}
            onChange={handleChange}
          />
        </label>
        <button className="fairy-btn" type="submit">
          Add Entry
        </button>
      </div>
    </form>
  );
}

export default FairyInputForm;
