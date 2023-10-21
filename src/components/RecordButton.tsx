import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline";

interface Props {
  isRecording: boolean;
  onClick: () => void;
}

export default function RecordButton(props: Props) {
  const { isRecording, onClick } = props;

  return (
    <div className="flex space-x-4">
      <div
        className="items-center flex justify-center w-14 h-14 rounded-full border-2 border-gray-200 cursor-pointer"
        onClick={onClick}
      >
        {isRecording ? (
          <div className="bg-red-600 w-5 h-5 rounded-sm transition-transform transform hover:scale-110"></div>
        ) : (
          <div className="bg-red-600 w-11 h-11 rounded-full transition-transform transform hover:scale-110"></div>
        )}
      </div>

      <button className="items-center flex justify-center w-14 h-14 rounded-full border-2 border-gray-200 cursor-pointer">
        <VideoCameraIcon className="w-5" />
      </button>
      <button className="items-center flex justify-center w-14 h-14 rounded-full border-2 border-gray-200 cursor-pointer">
        <VideoCameraSlashIcon className="w-5" />
      </button>
    </div>
  );
}
