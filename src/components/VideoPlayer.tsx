import * as React from "react";
import videojs from "video.js";
// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialOptions: any = {
  controls: true,
  fluid: true,
  loop: true,
  class: "medium",
  aspectRatio: "4:3",
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef<HTMLVideoElement>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const player = React.useRef<any>();

  React.useEffect(() => {
    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options,
    }).ready(function () {
      // console.log('onPlayerReady', this);
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return <video ref={videoNode} className="video-js" />;
};

export default VideoPlayer;
