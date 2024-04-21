import app from "./src/app";
import { connectDB, getConfig } from "./src/config";

const startServer = async () => {
  await connectDB();
  const port = getConfig('port');
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

startServer();
