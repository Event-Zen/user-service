import "dotenv/config";
import { createApp } from "./app";
import { connectDB } from "./config/db";

const port = Number(process.env.PORT || 4001);

async function start() {
  await connectDB();
  createApp().listen(port, () => console.log(`user-service on ${port}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});