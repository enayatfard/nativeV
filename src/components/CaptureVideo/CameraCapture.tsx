import { useEffect, useRef, useState } from "react";
import RecordButton from "./RecordButton";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Check for WebRTC support
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      (async () => {
        try {
          // Request access to the user's camera
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });

          // Set the video stream as the source
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        } catch (error) {
          console.error("Error accessing the camera:", error);
        }
      })();
    } else {
      console.error("WebRTC is not supported in this browser.");
    }
  }, []);

  const startRecording = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => [...prev, e.data]);
      }
    };
    mediaRecorderRef.current.onstop = () => {
      console.log(recordedChunks);
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      console.log(blob);
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  console.log(recordedVideoUrl);

  return (
    <div className="flex flex-col items-center space-y-3">
      {recordedVideoUrl ? (
        <video src={recordedVideoUrl} controls className="rounded-xl w-96" />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="rounded-xl w-96"
        />
      )}
      <RecordButton
        isRecording={isRecording}
        handleRecord={isRecording ? stopRecording : startRecording}
      />
    </div>
  );
};

export default CameraCapture;
