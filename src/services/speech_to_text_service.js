const {
  TranscribeClient,
  StartTranscriptionJobCommand,
  ListTranscriptionJobsCommand,
  ModelStatus,
} = require("@aws-sdk/client-transcribe");
const aws = require("aws-sdk");

const config = {
  REGION: "ap-south-1",
  params: {
    TranscriptionJobName: "sample_job",
    LanguageCode: "en-US",
    MediaSampleRateHertz: 16000,
    MediaFormat: "wav",
  },
};

const client = new TranscribeClient({ region: config.REGION });

const request_for_transcribe = async (mediaUrl) => {
  try {
    console.log("Requesting transcript");
    const jobName = "voice-analyse-" + Date.now().toString();
    console.log("Requesting transcript " + jobName);
    let data = await client.send(
      new StartTranscriptionJobCommand({
        ...config.params,
        OutputBucketName: "voiceanalysisapp",
        TranscriptionJobName: jobName,
        Media: {
          MediaFileUri: mediaUrl,
        },
      })
    );
    console.log("Requesting transcript " + data);
    return Promise.resolve(jobName);
  } catch (err) {
    console.log("Requesting transcript error " + err.stack);
    return Promise.reject(`Service error ${err.stack}`);
  }
};

const read_transcription = async (jobName) => {
  try {
    const params = {
      JobNameContains: jobName, // Not required. Returns only transcription
      // job names containing this string
    };
    const response = await client.send(
      new ListTranscriptionJobsCommand(params)
    );

    const { TranscriptionJobSummaries } = response;
    const {
      TranscriptionJobStatus,
      TranscriptionJobName,
    } = TranscriptionJobSummaries[0];

    if (TranscriptionJobStatus === ModelStatus.COMPLETED) {
      const s3params = {
        Bucket: "voiceanalysisapp",
        Key: `${TranscriptionJobName}.json`,
      };
      const awsS3 = new aws.S3();
      return new Promise((resolve, reject) => {
        awsS3.getObject(s3params, function (err, res) {
          if (err) {
            reject(err.message);
          } else {
            resolve({
              status: TranscriptionJobStatus,
              text: JSON.parse(res.Body.toString()).results.transcripts[0]
                .transcript,
            });
          }
        });
      });
    } else {
      return Promise.resolve({
        status: TranscriptionJobStatus,
        text: "",
      });
    }
  } catch (err) {
    return Promise.reject(err.message);
  }
};

module.exports = { request_for_transcribe, read_transcription };
