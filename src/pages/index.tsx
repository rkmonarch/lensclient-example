import Head from "next/head";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <>
        <div className="bg-gradient-to-r">
          <div className="ramp md:text-left h-[calc(100vh-60px)] flex flex-col md:flex-row justify-center lg:mt-0 md:mt-0 sm:mt-24">
            <div className="flex flex-col justify-center m-5 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="block bg-gradient-to-r from-[#732fff] to-pink-600 text-transparent bg-clip-text pb-4">
                  lensclient-example
                </span>
              </h1>
             
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center md:justify-start lg:justify-start flex-row">
                <div>
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-3xl text-white bg-black hover:shadow-2xl"
                  >
                    Let's get in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
