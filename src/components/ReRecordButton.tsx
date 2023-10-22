import { useState } from "react";
import Dialog from "./Dialog";
import { ArrowPathIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface Props {
  onClick: () => void;
}
const ReRecordButton = (props: Props) => {
  const { onClick } = props;

  const [show, setShow] = useState<boolean>(false);

  const handleReRecord = () => setShow(true);

  return (
    <>
      <div className="flex items-center justify-center space-x-5">
        <button
          onClick={handleReRecord}
          className="items-center flex justify-center w-14 h-14 rounded-full border-2 border-gray-200 cursor-pointer"
        >
          <ArrowPathIcon className="w-7 text-red-600" />
        </button>
        <button
          disabled
          className="items-center flex justify-center w-14 h-14 rounded-full border-2 border-gray-200 cursor-not-allowed"
        >
          <ArrowUpTrayIcon className="w-7 opacity-20" />
        </button>
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

export default ReRecordButton;
