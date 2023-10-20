import {
  ArrowUpTrayIcon,
  ArrowPathIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

const ReRecordUploadVideo = () => {
  return (
    <div>
      <div className="w-fit px-1 items-center flex justify-center h-14 rounded-full border-2 border-gray-200">
        <div className="flex space-x-6 justify-between items-center">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <PlayIcon className="w-7 h-7" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <ArrowPathIcon className="w-7 text-red-600 cursor-pointer" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <ArrowUpTrayIcon className="w-7 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReRecordUploadVideo;
