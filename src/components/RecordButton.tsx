interface Props {
  isRecording: boolean;
  onClick: () => void;
}

const square =
  "bg-red-600 w-5 h-5 rounded-sm transition-transform transform hover:scale-110";

const circle =
  "bg-red-600 w-11 h-11 rounded-full transition-transform transform hover:scale-110";

export default function RecordButton(props: Props) {
  const { isRecording, onClick } = props;

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-gray-200 cursor-pointer"
    >
      <span className={isRecording ? square : circle} />
    </button>
  );
}
