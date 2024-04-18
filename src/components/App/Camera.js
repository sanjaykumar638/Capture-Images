// Camera.js
import React, { useRef } from "react";
import Webcam from "react-webcam";



function Camera({ onCapture, cameraOn }) {
  const webcamRef = useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <>
      {cameraOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}
      <button onClick={captureImage} disabled={!cameraOn}>
        Capture Image
      </button>
    </>
  );
}

export default Camera;
