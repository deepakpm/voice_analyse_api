const speech = require("@google-cloud/speech");

const config = () => {
  const encoding = "LINEAR16";
  const sampleRateHertz = 16000;
  const languageCode = "en-US";
  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };

  return config;
};

const request_for_transcribe = async (mediaString) => {
  try {
    const client = new speech.SpeechClient();
    const audio = {
      content: mediaString,
    };
    const request = {
      config: config(),
      audio: audio,
    };
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    return Promise.resolve(transcription);
  } catch (err) {
    return Promise.reject(`Service error${err.message}`);
  }
};

module.exports = { request_for_transcribe };
