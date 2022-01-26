/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon, XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';

export interface Highlight {
  id: string;
  text: string;
  cfiRange: string;
  notes?: string;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface RightSliderProps {
  highlights: Highlight[];
  show: boolean;
  setShow: (show: boolean) => void;
  select: (cfiRange: string) => void;
  delete: (cfiRange: string, id: string) => void;
}

export default function RightSlider(props: RightSliderProps) {
  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={() => props.setShow(false)} style={{ zIndex: 100 }} >
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
                      <Dialog.Title className="text-lg font-medium text-gray-900">Highlights</Dialog.Title>
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
                  <div className="border-b border-gray-200" />
                  <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                    {props.highlights.map((highlight) => (
                      <li key={highlight.cfiRange}>
                        <div className="flex items-center">
                          <button className="relative group py-6 px-5 flex-1 truncate" onClick={() => props.select(highlight.cfiRange)}>
                            <div className="absolute inset-0 group-hover:bg-gray-100" aria-hidden="true" />
                            <div className="flex-1 flex items-center min-w-0 relative">
                              <div className="ml-4 truncate">
                                <p className="text-sm font-medium text-gray-900 truncate">{highlight.text}</p>
                              </div>
                            </div>
                          </button>
                          <button
                            className="relative group px-5 flex self-stretch items-center justify-center"
                            onClick={() => props.delete(highlight.cfiRange, highlight.id)}>
                            <div className="absolute inset-0 group-hover:bg-gray-100" aria-hidden="true" />
                            <TrashIcon
                              className="w-5 text-gray-400 group-hover:text-gray-500 justify-content-stretch z-50"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
