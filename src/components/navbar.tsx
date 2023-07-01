import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ConnectKitButton } from "connectkit";
import { Box } from "@chakra-ui/react";

const CustomDivider = ({ disabled }: { disabled: boolean }) => {
  if (disabled) {
    return null;
  }
  return (
    <Box
      as="hr"
      height={0.2}
      width={{
        base: "90%",
        "2xl": "55%",
        xl: "75%",
        lg: "90%",
        md: "95%",
        sm: "95%",
      }}
      m={0}
      border="none"
      mt={[4, 5]}
      mx="auto"
      bg="gray.400"
      className="divider"
    />
  );
};

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { pathname } = useRouter();
  const [navbarBg, setNavbarBg] = useState("bg-transparent");
  const [dividerDisabled, setDividerDisabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = 50;

      if (scrollY > triggerHeight) {
        setNavbarBg("bg-white");
        setDividerDisabled(true);
      } else {
        setNavbarBg("bg-transparent");
        setDividerDisabled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar fixed z-10 w-full mx-auto px-2 sm:px-4 py-3 rounded drop-shadow-md ${navbarBg} bg-opacity-90`}
      >
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-1">
            <span className="flex flex-row items-center self-center text-2xl font-semibold whitespace-nowrap">
           
              lensclient-example
            </span>
          </Link>
          <div className="flex md:order-2" style={{ marginLeft: "2rem" }}>
            <ConnectKitButton />
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="ml-2 md:ml-0 inline-flex items-center py-2 px-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div
            className={`${
              isOpenMenu ? "block" : "hidden"
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li></li>
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`${
                    pathname === "/about" ? "underline" : ""
                  } block underline-offset-4 py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0`}
                  aria-current="page"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <CustomDivider disabled={dividerDisabled} />
      </nav>
    </>
  );
};

export default Navbar;
