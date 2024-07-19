/**
 * Import express module
 * @const
 */
const express = require("express");
/**
 * Import constants module
 * @const
 */
const constants = require("./backend/utils/constants");
/**
 * Import path module
 * @const
 */
const path = require("path");
/**
 * Import mongoose module
 * @const
 */
const mongoose = require("mongoose");
/**
 * App instance
 * @const
 */
const app = express();
/**
 * Import server module
 * @const
 */
const server = require("http").Server(app);
/**
 * Import socket.io module
 * @const
 */
const io = require("socket.io")(server);

const fs = require("fs");


/**
 * Allow app to parse requests with JSON payloads
 */
app.use(express.json({ extended: true }));

/**
 * Allow app to use directory ./dist/ema-angular
 */
app.use(express.static(path.join(__dirname, "dist/ema-angular")));
/**
 * Allow app to use directory ./src/assets
 */
app.use(express.static(path.join(__dirname,"src/assets")))

/**
 * Reference the category router
 */
let categoryRouter = require("./backend/routers/category-router");
/**
 * Reference the event router
 */
let eventRouter = require("./backend/routers/event-router");
/**
 * Reference the status router
 */
const statsRouter = require("./backend/routers/stats-router");

/**
 * Imports the Google Cloud Translation library
 */
const { Translate } = require("@google-cloud/translate").v2;

/**
 * Imports the Google Cloud text to speech library
 */
const textToSpeech = require("@google-cloud/text-to-speech");

/**
 * Creates a text to speech client
 */
const client = new textToSpeech.TextToSpeechClient();
const SPEECH_OUTPUT_FILE_NAME = "speech.mp3"

function createTextToSpeechRequest(text) {
  return {
    input: { text: text },
    // Select the language and SSML Voice Gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    // Select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };
}

/**
 * Instantiates a client
 */
const translate = new Translate();

async function translateMyText(text, target) {
  let translation = await translate.translate(text, target);
  return translation;
}

/**
 * Mongodb database connection URL
 */
const url = "mongodb://localhost:27017/em-app";

/**
 * Method to connect to mongdb database
 * @param {string} url
 * @returns
 */
async function connect(url) {
  await mongoose.connect(url);
  return "Connected to datasource successfully";
}

/**
 * Connecting to mongodb database
 */
connect(url)
  .then(console.log)
  .catch((err) => console.log(err));

/**
 * Configure app to use event api
 */
app.use("/hoang/api/v1/event", eventRouter);
/**
 * Configure app to use category api
 */
app.use("/api/v1/category/32508085", categoryRouter);
/**
 * Configure app to use category api
 */
app.use("/api/v1/stats", statsRouter);

/**
 * Route to 404 if invalid url
 * @function
 * @param {string} path
 * @param {Function} callback
 */
app.get("*", function (req, res) {
  res.status(404).json("Page Not Found");
});

/**
 * Open connection via socket.io
 */
io.on("connection", function (socket) {
  // console.log("We got a connection from --:" + socket.id)
  socket.on("translator", async (data) => {
    let translateInput = data.translateInput;
    let targetLanguage = data.targetLanguage;
    let target = "en";

    if (targetLanguage == "Vietnamese") {
      target = "vi";
    } else if (targetLanguage == "Japanese") {
      target = "ja";
    } else if (targetLanguage == "Korean") {
      target = "ko";
    }

    let translateOutput = await translateMyText(translateInput, target);
    socket.emit("translationOutput", {
      translateOutput: translateOutput,
      finalTargetLanguage: target,
    });
  });

  socket.on("textToSpeech", async (data) => {
    let textInput = data.textInput;
    let request = createTextToSpeechRequest(textInput);

    // Performs the Text-to-Speech request
    client.synthesizeSpeech(request, (err, response) => {
      if (err) {
        console.error("ERROR:", err);
        return;
      }

      // Write the binary audio content to a local file
      fs.writeFile("./src/assets/" + SPEECH_OUTPUT_FILE_NAME, response.audioContent, "binary", (err) => {
        if (err) {
          console.error("ERROR:", err);
          return;
        }
        console.log("Audio content written to file: speech.mp3");
        socket.emit("textToSpeechOutput", {
          file: SPEECH_OUTPUT_FILE_NAME
        }); 
      });
    });

  });

});

/**
 * Configure port number for server
 * @function
 * @param {int} port
 * @param {Function} callback
 */
server.listen(constants.PORT_NUMBER, function () {
  console.log(`Listening on port ${constants.PORT_NUMBER}`);
});
