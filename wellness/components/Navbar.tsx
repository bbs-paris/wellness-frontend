"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-title text-2xl font-bold">
            Wellness
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/challenges" className="hover:text-accent transition">
              Challenges
            </Link>
            <Link href="/leaderboard" className="hover:text-accent transition">
              Leaderboard
            </Link>
            <Link
              href="/login"
              className="bg-secondary px-4 py-2 rounded hover:bg-secondary/90 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/challenges"
                className="hover:text-accent transition"
                onClick={() => setIsOpen(false)}
              >
                Challenges
              </Link>
              <Link
                href="/leaderboard"
                className="hover:text-accent transition"
                onClick={() => setIsOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                href="/login"
                className="bg-secondary px-4 py-2 rounded hover:bg-secondary/90 transition inline-block"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}