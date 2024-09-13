export const transformCode = async (code, isMultiLine) => {
    // Determine the endpoint based on the transformation type
    const endpoint = isMultiLine ? '/transform/multi-line' : '/transform/single-line';

    try {
        const response = await fetch(`https://chainlink-functions-formatter-api.netlify.app/.netlify/functions/index${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the text response
        const result = await response.text();

        // Return the transformed code
        return result;
    } catch (error) {
        console.error('Error during transformation:', error);
        return 'Error during transformation';
    }
};
