const mongoose = require("mongoose");
const config = require("config");

const currentTime = require("../../utils/timeService");

const name = config.get("DB_NAME");
const password = config.get("DB_PASSWORD");
const { hours, minutes, seconds } = currentTime();

mongoose
  .connect(
    `mongodb+srv://${name}:${password}@mentoring.1tlrllo.mongodb.net/mentoring`
  )
  .then(() =>
    console.log(
      `connect successfully to mongoDB Atlas at ${hours}:${minutes}:${seconds}!`
    )
  )
  .catch((error) =>
    console.log(
      `Mongodb Connection Error: could not connect to mongoDB ${error}`
    )
  );
