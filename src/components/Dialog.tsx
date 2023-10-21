import { Fragment } from "react";
import { Dialog as HDialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
  title?: string;
  desc?: string;
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  onConfirm: () => void;
}

export default function Dialog(props: Props) {
  const { onConfirm, isOpen = false, setIsOpen, title = "", desc = "" } = props;

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HDialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <HDialog.Title
                  as="h3"
                  className="text-lg flex space-x-1 items-center font-medium leading-6 text-gray-900"
                >
                  <ExclamationTriangleIcon className="w-5" />
                  <span>{title}</span>
                </HDialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>

                <div className="mt-4 space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      onConfirm();
                      closeModal();
                    }}
                  >
                    Got it!
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancle
                  </button>
                </div>
              </HDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HDialog>
    </Transition>
  );
}
