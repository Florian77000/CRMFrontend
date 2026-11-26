'use client' 

import { useState, useRef } from "react";
import { Camera } from "react-webcam-pro";

export default function Photo() {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("environment");
  const [photo, setPhoto] = useState(null);

  const toggleCameraFacing = () => {
    const next = facing === "user"
      ? "environment"
      : "user";

    cameraRef.current?.stopCamera?.();
    setFacing(next);
  };

  const takePhoto = () => {
    const image = cameraRef.current?.takePhoto();

    if (image) setPhoto(image);
  };

  return (
    <div style={{ width: "100%", maxWidth: 450 }}>
      <Camera
        ref={cameraRef}
        facingMode={facing}
        aspectRatio={4 / 3}
        style={{
          width: "100%",
          borderRadius: 16,
          overflow: "hidden"
        }}
      />
        <div className="flex justify-center gap-5">
            <button className="border-4 w-10 h-10 rounded-full ">
            ❌
            </button>
             <button onClick={takePhoto}
            className="border-4 w-10 h-10 rounded-full">
            </button>
            <button onClick={toggleCameraFacing}
            className="border-4 w-10 h-10 rounded-full">
            🔄️
            </button>
        </div>
      
      {/* {photo && (
        <img
          src={photo}
          alt="Photo capturée"
          style={{ width: "100%" }}
        />
      )} */}
    </div>
  );
}