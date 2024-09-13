import React, { useState } from 'react';
import { transformCode } from './codeTransformer';
import CopyButton from './CopyButton';
import './App.css';

const App = () => {
  const [code, setCode] = useState('');
  const [multiLineCode, setMultiLineCode] = useState('');
  const [singleLineCode, setSingleLineCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTransform = async () => {
    if (!code.trim()) {
      setError('This cannot be empty');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const multiLineResult = await transformCode(code, true);
      const singleLineResult = await transformCode(code, false);
      setMultiLineCode(multiLineResult);
      setSingleLineCode(singleLineResult);
    } catch (error) {
      console.error('Error during transformation:', error);
      setMultiLineCode('Error during transformation');
      setSingleLineCode('Error during transformation');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Chainlink Functions JS Source Code Formatter</h1>
      <textarea
        className={`code-input ${error ? 'error-input' : ''}`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your Chainlink Functions JS source code here (Make sure that it's executable on https://functions.chain.link/playground)"
      />

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Transforming<span className="dots"></span></p>
        </div>
      ) : (
        <button className="transform-button" onClick={handleTransform}>Transform</button>
      )}

      <div className="output-container">
        {/* Multi-Line Output */}
        <h2 className="output-title">Multi-Line Source String</h2>
        <div className="output-block multi-line-output">
          <CopyButton textToCopy={multiLineCode} />
          <pre>{multiLineCode}</pre>
        </div>

        {/* Single-Line Output */}
        <h6 className="output-title">Single-Line Source String</h6>
        <div className="output-block single-line-output">
          <CopyButton textToCopy={singleLineCode} />
          <pre>{singleLineCode}</pre>
        </div>
      </div>
    </div>
  );
};

export default App;
