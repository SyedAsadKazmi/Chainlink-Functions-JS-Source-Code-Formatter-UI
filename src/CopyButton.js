import React, { useState } from 'react';

const CopyButton = ({ textToCopy }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false); // Revert after 2 seconds
            }, 2000);
        });
    };

    return (
        <button
            className={`copy-button ${isCopied ? 'copied' : ''}`}
            onClick={handleCopy}
        >
            <span className={`copy-icon ${isCopied ? 'copied-icon' : ''}`}>
                {isCopied ? '✔' : '📋'}
            </span>
            {isCopied ? 'Copied' : 'Copy code'}
        </button>
    );
};

export default CopyButton;
