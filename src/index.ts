import cors from "cors";
import helmet from "helmet";
import { json } from "body-parser";
import express, { Application } from "express";
import main_routes from "./routes/index_routes";

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use("/v1", main_routes);

let port: number | string;
app.listen((port = process.env.PORT ?? 3000), (): void => {
  console.info("Releases-handler started on *:" + port);
});
