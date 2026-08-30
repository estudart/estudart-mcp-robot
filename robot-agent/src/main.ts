import { app, port } from "./presentation/agent.route.js"

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});