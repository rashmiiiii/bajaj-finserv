import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import ResponseDisplay from './components/ResponseDisplay';
import './App.css';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (jsonInput) => {
    console.log('Submitting data:', jsonInput);
    try {
      const res = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jsonInput,
          selected_options: selectedOptions
        }),
      });
      
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Received data:', data);
      setResponse(data);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`An error occurred while processing your request: ${err.message}`);
      setResponse(null);
    }
  };

  const handleOptionChange = (options) => {
    setSelectedOptions(options);
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <JsonInput onSubmit={handleSubmit} onOptionChange={handleOptionChange} />
      {error && <p className="error">{error}</p>}
      {response && <ResponseDisplay response={response} />}
    </div>
  );
}

export default App;