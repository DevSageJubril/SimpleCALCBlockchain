import { createApp } from "@deroll/app";
import { hexToString } from "viem";

// Create the application
const app = createApp({
    url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004",
});

// Handle input encoded in hex
app.addAdvanceHandler(async ({ metadata, payload }) => {
    const payloadString = hexToString(payload);
    console.log("payload:", payloadString);
    const jsonPayload = JSON.parse(payloadString);

    let result = null;
    switch (jsonPayload.operation) {
        case "add":
            result = jsonPayload.a + jsonPayload.b;
            break;
        case "subtract":
            result = jsonPayload.a - jsonPayload.b;
            break;
        case "multiply":
            result = jsonPayload.a * jsonPayload.b;
            break;
        case "divide":
            result = jsonPayload.a / jsonPayload.b;
            break;
        default:
            result = "Invalid operation";
    }

    console.log("Calculation result:", result);
    
    // Here you might want to store the result or return a notice to the blockchain

    return "accept";
});

// Start the application
app.start().catch((e) => {
    console.error(e);
    process.exit(1);
});
