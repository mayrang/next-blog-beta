import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className="fixed w-full h-14  bg-white z-10   shadow-sm">
      <div className="flex h-full w-full items-center px-5 justify-between border border-b">
        <Link href="/" className="font-bold text-2xl">
          Mayrang&apos;s Blog
        </Link>
        <div className="flex items-center">
          <Link className="text-lg mr-4" href="/">
            Home
          </Link>
          <Link className="text-lg mr-4" href="/about">
            About
          </Link>
          <Link className="text-lg mr-4" href="/posts">
            Post
          </Link>
          <Link className="text-lg" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
