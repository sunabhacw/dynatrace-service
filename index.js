import express, { json } from "express";
import { StatusIOApi } from "statusio";

const STATUS_PAGE_ID = "61e1ea9b682d750536ef4cdb";
const API_ID = "ec3f8349-df81-4197-ae41-f3f25cdf92d8";
const API_KEY =
  "va5GXvxil59PgLURe5Ew+zEQrgbcRyZ4+HXFmec27KqfWbkAwa+VWmNXdSlcCJT37H1WzEi9+WU+BqQIcl15Zg==";

const app = express();
app.use(json()); // Use express.json() instead of bodyParser

const api = new StatusIOApi(
  "ec3f8349-df81-4197-ae41-f3f25cdf92d8",
  "va5GXvxil59PgLURe5Ew+zEQrgbcRyZ4+HXFmec27KqfWbkAwa+VWmNXdSlcCJT37H1WzEi9+WU+BqQIcl15Zg=="
);

// Webhook to list components
app.post("/webhook/components/list", (req, res) => {
  const { statusPageId } = req.body;

  api.components.list(statusPageId, (error, data) => {
    if (error) {
      console.error("Error fetching components:", data);
      res.status(500).send({ error: "Failed to fetch components" });
    } else {
      console.log("Components list:", data);
      res.status(200).send(data);
    }
  });
});

// Webhook to update component status
app.post("/webhook/components/status-update", (req, res) => {
  const { component_id, status } = req.body;

  api.components.statusUpdate({ component_id, status }, (error, data) => {
    if (error) {
      console.error("Error updating component status:", data);
      res.status(500).send({ error: "Failed to update component status" });
    } else {
      console.log("Component status updated:", data);
      res.status(200).send(data);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});

// Export the app for Vercel
export default app;
