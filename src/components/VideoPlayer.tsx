import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  src: string | null;
}

const initialOptions = {
  controls: true,
  class: "medium",
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const player = useRef<Player | null>(null);

  useEffect(() => {
    if (src) {
      if (player.current) {
        // If the player instance exists, dispose of it before creating a new one
        player.current.dispose();
      }

      // Create a new Video.js player with the updated source
      player.current = videojs(videoRef.current, {
        ...initialOptions,
        sources: [
          {
            src: src,
            type: "video/webm",
          },
        ],
      }).ready(() => {});
    }

    return () => {
      if (player.current) {
        player.current.dispose();
        player.current = null;
      }
    };
  }, [src]);

  return <video ref={videoRef} className="video-js" />;
};

export default VideoPlayer;
