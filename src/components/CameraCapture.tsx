import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import RecordButton from "./RecordButton";
import ReRecordUploadVideo from "./ReRecordUploadVideo";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);

  const startCamera = async () => {
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
  };

  useEffect(() => {
    startCamera();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);

    const stream = videoRef.current?.srcObject as MediaStream;
    const media = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorder.current = media;
    mediaRecorder.current.start();

    const localVideoChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined" || event.data.size === 0) return;
      localVideoChunks.push(event.data);
    };

    setRecordedChunks(localVideoChunks);
  };

  const stopRecording = () => {
    setIsRecording(false);

    mediaRecorder.current?.stop();

    mediaRecorder.current!.onstop = () => {
      const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(videoBlob);

      setRecordedVideoUrl(videoUrl);
      setRecordedChunks([]);
    };
  };

  const ReRecord = () => {
    setRecordedVideoUrl(null);
    startCamera();
  };

  return (
    <div className="flex flex-col items-center space-y-3 justify-between h-screen p-2 sm:justify-center">
      <VideoPlayer src={recordedVideoUrl} />
      <video ref={videoRef} />
      {recordedVideoUrl ? (
        <ReRecordUploadVideo onClick={ReRecord} />
      ) : (
        <RecordButton
          isRecording={isRecording}
          onClick={isRecording ? stopRecording : startRecording}
        />
      )}
    </div>
  );
};
export default CameraCapture;
