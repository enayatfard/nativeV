import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import VideoCapture from "./components/VideoCapture";
import ReRecordButton from "./components/ReRecordButton";

function App() {
  const [src, setSrc] = useState<string | null>(null); // Video source to play

  const reRecord = () => setSrc("");

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {src ? (
        <div className="space-y-5">
          <VideoPlayer src={src} />
          <ReRecordButton onClick={reRecord} />
        </div>
      ) : (
        <VideoCapture onRecorded={setSrc} />
      )}
    </div>
  );
}

export default App;
