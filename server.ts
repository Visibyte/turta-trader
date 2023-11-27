import express from "express";
import { getPayloadClient } from "./get-payload-client";
import { nextApp, nextHandler } from "./next-utilts";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL}`);
      },
    },
  });

  // Forward requests to nextjs
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Client running");

    app.listen(PORT, async () => {
      payload.logger.info(`Client URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
};

startServer();
