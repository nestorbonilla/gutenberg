import Davatar from "@davatar/react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const navigation = [
  { name: "My Library", href: "/library" },
  // { name: "Features", href: "#" },
  // { name: "Marketplace", href: "#" },
  { name: "About", href: "/about" },
];

const MarketingLayout = ({ children }: any) => {
  const { isAuthenticated, authenticate, user } = useMoralis();
  const [wallet, setWallet] = useState<any>(false);
  const [address, setAddress] = useState("");

  const formatAndSaveWallet = (address: string) => {
    let concat =
      address.substring(0, 6) +
      "..." +
      address.substring(address.length - 4, address.length);
    setWallet(concat);
  };

  const connectWallet = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: "Authorize linking of your wallet",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setAddress(user.get("ethAddress"));
      formatAndSaveWallet(user.get("ethAddress"));
    }
  }, [user]);

  return (
    <div className="relative bg-black overflow-hidden min-h-screen">
      <div
        className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
        aria-hidden="true"
      >
        <div className="relative h-full max-w-7xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width={404}
            height={784}
            fill="non"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-green-300 text-opacity-30"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-p-300 text-opacity-30"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
            />
          </svg>
        </div>
      </div>

      <div className="relative pt-6 pb-16 sm:pb-24">
        <Popover>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav
              className="relative flex items-center justify-between sm:h-10 md:justify-center"
              aria-label="Global"
            >
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <a className="flex flex-row space-x-2">
                      <span className="sr-only">Gutenburg NFT</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt=""
                      />
                      <h1 className="text-3xl font-semibold text-indigo-600">
                        {"Gutenburg NFT"}
                      </h1>
                    </a>
                  </Link>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-indigo-600 rounded-md p-2 inline-flex items-center justify-center text-green-200 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a className="font-medium text-gray-50 hover:text-gray-900">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <span className="inline-flex rounded-md shadow">
                  <a
                    onClick={connectWallet}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    {wallet ? (
                      <div className="space-x-2 flex flex-row">
                        <Davatar
                          size={24}
                          address={address}
                          // provider={provider} // optional
                          // graphApiKey={apiKey} // optional
                          generatedAvatarType="jazzicon" // optional, 'jazzicon' or 'blockies'
                        />
                        <div>{wallet}</div>
                      </div>
                    ) : (
                      "Connect Wallet"
                    )}
                  </a>
                </span>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <a
                  onClick={connectWallet}
                  className="block w-full px-5 py-3 text-center font-medium text-green-200 bg-indigo-600 hover:bg-green-200 hover:text-indigo-600"
                >
                  {wallet ? wallet : "Connect Wallet"}
                </a>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-12">{children}</main>
      </div>
    </div>
  );
};

export default MarketingLayout;
