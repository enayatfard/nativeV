import { useState } from "react";
import Dialog from "./Dialog";
import { ArrowPathIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface Props {
  onClick: () => void;
}
const ReRecordUploadVideo = (props: Props) => {
  const { onClick } = props;

  const [show, setShow] = useState<boolean>(false);

  function handleReRecord() {
    setShow(true);
  }
  return (
    <>
      <div className="w-fit px-1 items-center flex justify-center h-14 rounded-full border-2 border-gray-200">
        <div className="flex space-x-6 justify-between items-center">
          <button
            onClick={handleReRecord}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowPathIcon className="w-7 text-red-600" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <ArrowUpTrayIcon className="w-7 cursor-pointer" />
          </button>
        </div>
      </div>
      <Dialog
        isOpen={show}
        setIsOpen={setShow}
        onConfirm={onClick}
        title="Confirm Re-Recording"
        desc="Are you sure you want to re-record the video? "
      />
    </>
  );
};

export default ReRecordUploadVideo;
