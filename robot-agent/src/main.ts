import { app, port } from "./presentation/routes/agent.route.js"

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});