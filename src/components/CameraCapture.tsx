import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import RecordButton from "./RecordButton";
import ReRecordUploadVideo from "./ReRecordUploadVideo";
import ToggleCamera from "./ToggleCamera";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);

  let mediaStream: MediaStream | null = null;

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      (async () => {
        try {
          // Request access to the user's camera
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          // Set the video stream as the source
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            mediaStream = stream; // Store the MediaStream object
          }
        } catch (error) {
          console.error("Error accessing the camera:", error);
        }
      })();
    } else {
      console.error("WebRTC is not supported in this browser.");
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
      mediaStream = null;
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

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: recordedVideoUrl,
        type: "video/mp4",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center space-y-3 justify-between h-screen p-2 sm:justify-center">
      {recordedVideoUrl ? (
        <VideoPlayer options={videoJsOptions} />
      ) : (
        <video ref={videoRef} className="w-96" />
      )}
      {recordedVideoUrl ? (
        <ReRecordUploadVideo onClick={ReRecord} />
      ) : (
        <div className="flex space-x-2">
          <RecordButton
            isRecording={isRecording}
            onClick={isRecording ? stopRecording : startRecording}
          />
          <ToggleCamera start={startCamera} stop={stopCamera} />
        </div>
      )}
    </div>
  );
};
export default CameraCapture;
