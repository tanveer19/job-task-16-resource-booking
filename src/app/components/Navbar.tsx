"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Resource Booking
        </h1>

        <div className="flex gap-6">
          <Link
            href="/"
            className={cn(
              "text-gray-700 dark:text-gray-300 hover:text-blue-600",
              pathname === "/" && "font-semibold underline"
            )}
          >
            Form
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              "text-gray-700 dark:text-gray-300 hover:text-blue-600",
              pathname === "/dashboard" && "font-semibold underline"
            )}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
