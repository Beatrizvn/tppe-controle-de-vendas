"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header
      className="
        w-full                     
        bg-white                   
        px-6 sm:px-10 py-4          
        border-b border-gray-200   
        flex items-center justify-between
      "
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3 ml-15">
          <Image
            src="/images/logo.png"
            alt="Sales Control Logo"
            width={120}
            height={40}
          />
        </Link>

        <nav className="flex ml-20 text-base font-semibold">
          <ul className="flex items-center gap-6 md:gap-8">
            <li>
              <Link
                href="/"
                className="text-dark hover:text-black transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/sales"
                className="text-dark hover:text-black transition-colors"
              >
                Sales
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-dark hover:text-black transition-colors"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <button
        onClick={logout}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Logout
      </button>
    </header>
  );
}
