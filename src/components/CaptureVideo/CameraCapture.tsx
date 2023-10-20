import { useEffect, useRef, useState } from "react";
import RecordButton from "./RecordButton";
import ReRecordUploadVideo from "../ReRecordUploadVideo";
import VideoPlayer from "../VideoPlayer";

const mimeType = "video/webm";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [recorded, setRecorded] = useState<boolean>(false);

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

  const startRecording = async () => {
    setIsRecording(true);

    const stream = videoRef.current?.srcObject as MediaStream;

    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    const localVideoChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunks.push(event.data);
    };
    setRecordedChunks(localVideoChunks);
  };

  const stopRecording = () => {
    setIsRecording(false);

    mediaRecorder.current?.stop();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(recordedChunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      setRecordedVideoUrl(videoUrl);
      setRecorded(true);
      setRecordedChunks([]);
    };
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {recordedVideoUrl && recorded ? (
        <VideoPlayer
          options={{
            sources: [
              {
                src: recordedVideoUrl,
                type: "video/webm",
              },
            ],
          }}
        />
      ) : (
        <video ref={videoRef} className="rounded-xl w-96" />
      )}
      {recorded ? (
        <ReRecordUploadVideo />
      ) : (
        <RecordButton
          isRecording={isRecording}
          handleRecord={isRecording ? stopRecording : startRecording}
        />
      )}
    </div>
  );
};

export default CameraCapture;
