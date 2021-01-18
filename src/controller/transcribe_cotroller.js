const { ModelStatus } = require("@aws-sdk/client-transcribe");
const {
  request_for_transcribe,
  read_transcription,
} = require("../services/speech_to_text_service");

module.exports.uploadfile = async (req, res) => {
  console.log("Uploading........");
  if (req.file) {
    const encoded = req.file.location;
    console.log(`Uploading........ ${req.file.location}`);
    try {
      const content = await request_for_transcribe(encoded);
      return res.json({
        status: true,
        jobName: content,
      });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }

  return res.status.json({ statue: false, message: "File missing" });
};

module.exports.read_transcribe = async (req, res) => {
  try {
    const { status, text } = await read_transcription(req.query.q);
    if (status === ModelStatus.COMPLETED) {
      return res.json({ status: status, text: text });
    } else {
      return res.json({ status: status, text: "" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: ModelStatus.FAILED, message: err.message });
  }
};
