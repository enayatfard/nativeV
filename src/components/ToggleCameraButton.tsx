import { useState } from "react";

import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline";

interface Props {
  stop: () => void;
  start: () => void;
}
const ToggleCameraButton = (props: Props) => {
  const { start, stop } = props;

  const [show, setshow] = useState(true);

  function toggle() {
    setshow(() => !show);
    show ? stop() : start();
  }

  return (
    <button
      onClick={toggle}
      className={`items-center flex justify-center w-14 h-14 rounded-full border-2 border-gray-200 hover:bg-gray-200 cursor-pointer ${
        show ? "" : "bg-gray-200"
      }`}
    >
      {show ? (
        <VideoCameraIcon className="w-5" />
      ) : (
        <VideoCameraSlashIcon className="w-5" />
      )}
    </button>
  );
};

export default ToggleCameraButton;
