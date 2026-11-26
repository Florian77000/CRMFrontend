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

      <button onClick={toggleCameraFacing}>
        Changer de caméra
      </button>

      <button onClick={takePhoto}>
        Prendre une photo
      </button>

      {photo && (
        <img
          src={photo}
          alt="Photo capturée"
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}