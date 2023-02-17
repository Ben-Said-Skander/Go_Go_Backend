const { format } = require("date-fns");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;
const { v4: uuid } = require("uuid");

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd \t HH:mm:ss")})`;
  const logItem = `${dateTime}\t${uuid()}\t${message}/n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "log"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "log"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "log", "eventLog.txt"),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};
const logger = (req, res, next) => {
  logEvents(`${req.method}/t${req.header.origin},${req.url}`);
  console.log(`${req.method}/t${req.header.origin},${req.url}`);
  next();
};

module.exports = { logger };
