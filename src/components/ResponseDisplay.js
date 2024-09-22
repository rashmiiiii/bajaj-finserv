import React from 'react';

function ResponseDisplay({ response }) {
  return (
    <div className="response-display">
      <h2>Response</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default ResponseDisplay;