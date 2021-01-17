const { request_for_transcribe } = require("../services/google_speech_to_text");

module.exports.uploadfile = async (req, res) => {
  if (req.file) {
    const encoded = req.file.buffer.toString("base64");
    const content = await request_for_transcribe(encoded);
    return res.json({
      status: true,
      content,
    });
  }
  return res.json({ statue: false, message: "File missing" });
};
