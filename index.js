import cors from "cors";
import express from "express";

import { PORT } from "./config.js";
import { investorRoutes, pitcherRoutes, pitchRoutes } from "./routes/index.js";

const app = express();

// Middleware for Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app
  .use("/investor", investorRoutes)
  .use("/pitcher", pitcherRoutes)
  .use("/pitch", pitchRoutes);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
