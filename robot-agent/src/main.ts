import express, { Application } from "express"
import robotRoutes from "./presentation/routes/agent.route";

export const app: Application = express()
export const port: number = Number(process.env.API_PORT) ?? 5000

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use(robotRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});