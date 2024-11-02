import "./db";
import express from "express";
import morgan from "morgan";
import authRouter from "./route/auth";
import agencyRouter from "./route/agency";
import { sendErrorResponse } from "./utils";
import vehicleRouter from "./route/vehicle";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRouter);
app.use("/agency", agencyRouter);
app.use("/vehicle", vehicleRouter);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ alive: true });
});

app.get("*", (req, res) => {
  sendErrorResponse({ res, message: "Route not found!", status: 404 });
});

app.post("*", (req, res) => {
  sendErrorResponse({ res, message: "Route not found!", status: 404 });
});

app.listen(PORT, () =>
  console.log("app is running on: http://localhost:" + PORT)
);
