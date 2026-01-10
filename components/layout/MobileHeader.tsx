'use client'

import { ShoppingCart, Bell } from "lucide-react"
import { SearchBar } from "../home/SearchBar"
import Link from "next/link"

interface MobileHeaderProps {
  onSearch?: (query: string) => void
}

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  return (
    <header className="fixed w-full top-0 bg-linear-to-br from-amber-600 to-amber-700 h-52 text-white p-4 z-50 rounded-b-3xl">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs opacity-80">BizSmart</p>
          <div className="flex items-center gap-2 mt-1 pl-2">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-4xl" />
            <p className="font-semibold">Force des Saveurs</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/cart" className="bg-white p-2 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-amber-950" />
          </Link>
          <Link href="/profile/notifications" className="bg-white p-2 rounded-lg">
            <Bell className="w-6 h-6 text-amber-950" />
          </Link>
        </div>
      </div>
      
      <div className="mt-4">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  )
}