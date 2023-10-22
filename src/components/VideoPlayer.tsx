import { useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

const VIDEO_OPTIONS = {
  fluid: true,
  autoplay: true,
  controls: true,
  responsive: true,
};

interface Props {
  src: string;
}

export const VideoPlayer = (props: Props) => {
  const { src } = props;

  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const options = {
      ...VIDEO_OPTIONS,
      sources: [
        {
          src,
          type: "video/mp4",
        },
      ],
    };

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");

      videoRef.current?.appendChild(videoElement);

      playerRef.current = videojs(videoElement, options, () => {});
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [src, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return <div ref={videoRef} className="flex video-js h-fit w-96" />;
};

export default VideoPlayer;
