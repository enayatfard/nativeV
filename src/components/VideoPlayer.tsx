import { RefObject, useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const VideoJS = (props) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const { options } = props;

  useEffect(() => {
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
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      ref={videoRef as RefObject<HTMLDivElement>}
      className="flex video-js h-fit w-96"
    />
  );
};

export default VideoJS;
