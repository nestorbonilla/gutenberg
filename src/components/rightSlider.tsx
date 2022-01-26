/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import ChapterHighlights from './chapterHighlights';

export interface Toc {
  label: string;
  href: string;
}

export interface Highlight {
  objectId: string;
  text: string;
  cfiRange: string;
  notes?: string;
  chapter: {
    href: string;
    label: string;
  }
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface RightSliderProps {
  toc: Toc[];
  highlights: Highlight[];
  show: boolean;
  setShow: (show: boolean) => void;
  select: (cfiRange: string) => void;
  delete: (cfiRange: string, id: string) => void;
}

export default function RightSlider(props: RightSliderProps) {
  const groupedHighlights = props.highlights.reduce((acc, item) => {
    const chapter = item.chapter.href;
    if (!acc[chapter]) {
      acc[chapter] = [];
    }
    acc[chapter].push(item);
    return acc;
  }, {} as { [chapter: string]: Highlight[] });

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
                  <ul role="list" className="divide-y divide-gray-200">
                    {props.toc
                      .filter(chapter => groupedHighlights[chapter.href])
                      .map(chapter => (
                        <ChapterHighlights
                          key={chapter.href}
                          chapterLabel={chapter.label}
                          highlights={groupedHighlights[chapter.href]}
                          select={props.select}
                          delete={props.delete}
                        />
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
