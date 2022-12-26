import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="px-4 py-2 mb-2 flex flex-row  w-full rounded bg-midnight ">
      <Link href="/" className="flex flex-row items-center">
        <Image alt="logo" src="/images/bitcoin.svg" height={48} width={48} />
        <h1 className="ml-2 text-white text-xl">Crypto App</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
