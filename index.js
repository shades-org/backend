import express from "express";

import { PORT } from "./config.js";
import { investorRoutes, pitcherRoutes } from "./routes/index.js";
import { getUser } from "./utils/firebase.js";

const app = express();

// Middleware for Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/investor", investorRoutes).use("/pitcher", pitcherRoutes);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
