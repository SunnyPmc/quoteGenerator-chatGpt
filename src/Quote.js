import React, { useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('/api/quote');
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="quote-card">
          <p className="quote">{quote}</p>
          <button className="change-button" onClick={fetchQuote}>
            Change Quote
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
