export const sendMessageToBot = async (message) => {
    try {
        const response = await fetch("/api/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        // Use text() first to avoid json() issues with empty/malformed responses
        const responseText = await response.text();
        let data = null;
        try {
            data = responseText ? JSON.parse(responseText) : null;
        } catch (e) {
            console.error("Failed to parse chatbot response as JSON:", responseText);
        }

        if (!response.ok) {
            let errorMsg = data?.error || data?.message || "Server Error";
            // If the error message is too long, it's probably a stack trace or detailed API error
            if (errorMsg.length > 100) {
                errorMsg = "Something went wrong. Please try again later.";
            }
            console.error("Chatbot API Error:", response.status, errorMsg);
            return { error: errorMsg };
        }

        if (!data) {
            return { error: "Received empty response from server." };
        }

        console.log("Chatbot API Success:", data);
        return data;
    } catch (err) {
        console.error("Chatbot Network Error:", err);
        return { error: "Network error. Please try again later." };
    }
};
