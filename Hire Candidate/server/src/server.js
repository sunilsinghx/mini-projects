import express from "express";
import cors from "cors";
import candidateRoutes from "./routes/candidateRoute.js";
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use("/", candidateRoutes);

app.get("/example", (req, res) => {
  res.send("CORS is enabled!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});
