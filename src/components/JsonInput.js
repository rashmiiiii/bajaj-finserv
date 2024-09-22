import React, { useState } from 'react';
import Select from 'react-select';

function JsonInput({ onSubmit, onOptionChange }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    console.log('Raw input:', input);
    
    try {
      let jsonInput = JSON.parse(input);
      console.log('Parsed input:', jsonInput);

      if (Array.isArray(jsonInput)) {
        console.log('Input is an array, wrapping in object');
        jsonInput = { data: jsonInput };
      }

      if (!jsonInput.data || !Array.isArray(jsonInput.data)) {
        throw new Error('Input must be an object with a "data" property that is an array');
      }

      console.log('Validated input:', jsonInput);
      onSubmit(jsonInput);
    } catch (err) {
      console.error('Input error:', err);
      if (err instanceof SyntaxError) {
        setError('Invalid JSON syntax. Please check your format.');
      } else {
        setError(err.message);
      }
    }
  };

  const handleSelectChange = (selectedOptions) => {
    onOptionChange(selectedOptions.map(option => option.value));
  };

  return (
    <form onSubmit={handleSubmit} className="json-input">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
        rows="5"
      />
      <Select
        options={options}
        isMulti
        onChange={handleSelectChange}
        placeholder="Select options to display"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default JsonInput;