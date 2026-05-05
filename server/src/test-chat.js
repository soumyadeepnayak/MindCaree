import { sendMessage } from "./controllers/chat.controller.js";
import * as dotenv from "dotenv";
dotenv.config({ path: '../.env' });

const req = {
  body: { message: "I am feeling very sad today." },
  user: { id: "38d1e35f-d841-4d8c-95c4-28bcc301e4c1" }
};

const res = {
  json: (data) => console.log("JSON:", JSON.stringify(data, null, 2)),
  status: (code) => {
    console.log("STATUS:", code);
    return {
      json: (data) => console.log("ERROR JSON:", JSON.stringify(data, null, 2))
    };
  }
};

async function test() {
  await sendMessage(req, res);
}

test();
