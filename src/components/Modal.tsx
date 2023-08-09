"use client";
interface Props {
  children: JSX.Element | JSX.Element[];
  toggleModal: () => void;
  modal: boolean;
}

const Modal = ({ children, toggleModal, modal }: Props) => {
  return (
    <div
      className={`fixed top-0 left-0  justify-center right-0 z-50 
      ${!modal ? "opacity-0 hidden" : "opacity-100 flex"} transition-all
   bg-[#8080805e] w-full p-2 overflow-x-hidden overflow-y-hidden md:inset-0  h-screen max-h-full`}
      onClick={() => toggleModal()}
    >
      <div className="relative w-full max-w-xl max-h-full ">
        <div className="relative rounded-lg mx-auto shadow bg-slate-800">
          <button
            onClick={() => {
              toggleModal();
            }}
            type="button"
            className="absolute transition-colors z-10 top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div
            className="p-6  "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
