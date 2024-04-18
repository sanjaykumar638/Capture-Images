// App.js
import "./App.css";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import Camera from "./Camera"; 
import ImageGallery from "./ImageGallery"; 
import dataURItoBlob from "../../utils/dataURItoBlob"; 

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [cameraOn, setCameraOn] = useState(true); 
  const [capturing, setCapturing] = useState(false);

  const uploadFile = () => {
    if (imageUpload == null) return;

    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // Store image URL and GPS location in Firebase
          setImageUrls((prev) => [...prev, { url, latitude, longitude }]);
          setCapturing(false); // Reset capturing state
          window.location.reload(); // Auto-refresh the page
        });
      });
    });
  };

  const handleCapture = (imageSrc) => {
    if (!capturing) {
      setCapturing(true); // Start capturing
      const blob = dataURItoBlob(imageSrc);
      setImageUpload(blob);
    }
  };

  const toggleCamera = () => {
    if (!capturing) {
      setCameraOn((prev) => !prev); // Toggle camera status
    }
  };

  useEffect(() => {
    if (cameraOn && !capturing) {
      const imagesListRef = ref(storage, "images/");
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      });
    }
  }, [cameraOn, capturing]);

  return (
    <div className="App">
      <div class="button">
        <Camera class="camera" onCapture={handleCapture} cameraOn={cameraOn} />
        <button onClick={toggleCamera} disabled={capturing}>
          {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>
        <button onClick={uploadFile}>Upload Image</button>
      </div>
      <ImageGallery class="images" imageUrls={imageUrls} />
    </div>
  );
}

export default App;
