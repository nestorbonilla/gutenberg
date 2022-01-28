import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import AllHighlights from "./allHighlights";
import Link from "next/link";

export interface Toc {
  label: string;
  href: string;
}

export interface Highlight {
  objectId: string;
  // either an ERC1155 or ERC721 token ID
  bookId: string;
  text: string;
  cfiRange: string;
  notes?: string;
  chapter: {
    href: string;
    label: string;
  };
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface RightSliderProps {
  bookId: number;
  marked: boolean;
  toc: Toc[];
  highlights: Highlight[];
  otherHighlights: Highlight[];
  show: boolean;
  setShow: (show: boolean) => void;
  select: (cfiRange: string) => void;
  delete: (cfiRange: string, id: string) => void;
}

export default function RightSlider(props: RightSliderProps) {
  const [mode, setMode] = useState("my");
  const tabs = props.marked
    ? [
        { name: "My Marks", mode: "my" },
        { name: "Others' Marks", mode: "other" },
      ]
    : [{ name: "My Marks", mode: "my", current: true }];

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={() => props.setShow(false)}
        style={{ zIndex: 100 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Notebook
                      </Dialog.Title>
                      <Link href={`/mint/${props.bookId}`}>
                        <a className="bg-indigo-600 border border-transparent rounded-md px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Mint Notes
                        </a>
                      </Link>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                          onClick={() => props.setShow(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200">
                    <div className="px-6">
                      <nav
                        className="-mb-px flex space-x-6"
                        x-descriptions="Tab component"
                      >
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            onClick={() => setMode(tab.mode)}
                            className={classNames(
                              tab.mode === mode
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <AllHighlights
                    toc={props.toc}
                    highlights={
                      mode === "my" ? props.highlights : props.otherHighlights
                    }
                    color="#7986cb"
                    select={props.select}
                    delete={props.delete}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
