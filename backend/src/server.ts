import dotenv from 'dotenv';
import app from './app.js';

// Initialize environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Set up server listener to allow connections from all interfaces (including Tailscale)
app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server is listening on 0.0.0.0:${PORT}`);
});
