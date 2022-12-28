import React from "react";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
const OPTIONS = {
  filename: "clapup-webcam",
  fileType: "mp4"
};

export default function VideoRecord() {
  const {
    status,
    open,
    close,
    start,
    stop,
    retake,
    download,
    webcamRef,
    previewRef,
    getRecording
  } = useRecordWebcam(OPTIONS);
  const [videoPreview, setVideoPreview] = React.useState(null);
  const handleUploadVideo = (videoFile) => {
    setVideoPreview(URL.createObjectURL(videoFile));
  };
  if (videoPreview) {
    console.log({ videoPreview });
  }
  console.log({ status, flag: CAMERA_STATUS });
  const saveVideo = async () => {
    const blob = await getRecording();
    console.log({ blob });
  };
  return (
    <div
      style={{
        height: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Record Webcam: react-record-webcam
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {videoPreview &&
        (status !== CAMERA_STATUS?.OPEN ||
          status !== CAMERA_STATUS?.RECORDING ||
          status !== CAMERA_STATUS?.PREVIEW) ? (
          <video
            style={{ width: "460px", margin: "0 auto", height: "300px" }}
            src={videoPreview}
            controls
          >
            Your browser does not support HTML5 video.
          </video>
        ) : (
          status === CAMERA_STATUS?.CLOSED && (
            <video
              style={{ width: "460px", height: "300px", margin: "0 auto" }}
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              controls
            >
              Your browser does not support HTML5 video.
            </video>
          )
        )}

        {status === "INIT" ? (
          <div
            style={{
              width: "460px",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <b>loading...</b>
          </div>
        ) : null}
        <video
          ref={webcamRef}
          style={{
            display: `${
              !videoPreview &&
              (status === CAMERA_STATUS?.OPEN ||
                status === CAMERA_STATUS?.RECORDING)
                ? "block"
                : "none"
            }`,
            width: "460px",
            margin: "0 auto",
            height: "300px"
          }}
          autoPlay
          muted
        />
        <video
          ref={previewRef}
          style={{
            display: `${
              !videoPreview && status === CAMERA_STATUS?.PREVIEW
                ? "block"
                : "none"
            }`,
            width: "460px",
            margin: "0 auto",
            height: "300px"
          }}
          controls
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "15px auto"
        }}
      >
        <button
          disabled={
            status === CAMERA_STATUS?.OPEN ||
            status === CAMERA_STATUS?.RECORDING ||
            status === CAMERA_STATUS?.PREVIEW
          }
          onClick={() => {
            setVideoPreview(null);
            open();
          }}
        >
          Open camera
        </button>
        <button
          disabled={
            status === CAMERA_STATUS?.CLOSED
            // || status === CAMERA_STATUS?.PREVIEW
          }
          onClick={close}
        >
          Close camera
        </button>
        <button
          disabled={
            status === CAMERA_STATUS?.CLOSED ||
            status === CAMERA_STATUS?.RECORDING ||
            status === CAMERA_STATUS?.PREVIEW
          }
          onClick={() => {
            // record start
            start();
          }}
        >
          Start recording
        </button>
        <button disabled={status !== "RECORDING"} onClick={stop}>
          Stop recording
        </button>
        <button disabled={status !== CAMERA_STATUS?.PREVIEW} onClick={retake}>
          Retake
        </button>
        <button disabled={status !== CAMERA_STATUS?.PREVIEW} onClick={download}>
          Download
        </button>
        <button
          disabled={status !== CAMERA_STATUS?.PREVIEW}
          onClick={saveVideo}
        >
          Save
        </button>
        <input
          onChange={(e) => handleUploadVideo(e.target.files[0])}
          style={{ display: "none" }}
          id="upload"
          type="file"
          accept="video/*"
        />
        <button disabled={status !== CAMERA_STATUS?.CLOSED} type="button">
          <label htmlFor="upload">Upload</label>
        </button>
      </div>

      <p style={{ textAlign: "center" }}>Powered By Clapup</p>
      {/* <p>Camera status: {status}</p> */}
    </div>
  );
}
