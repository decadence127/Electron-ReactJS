const express = require("express");
const cors = require("cors");
const TCPController = require("./TCPController/TCPController");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", require("./routes"));

async function start() {
  try {
    app.listen(9119, () => {
      console.log("Tunnel is ready");
    });
  } catch (e) {
    console.error(e);
  }
}

start();
