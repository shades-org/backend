import express from "express";

import { PORT } from "./config.js";

const app = express();

// Middleware for Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
