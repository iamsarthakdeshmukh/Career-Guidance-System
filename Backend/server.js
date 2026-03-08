// server.js
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config(); // Correct usage

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));