"use client"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SharedHeaderProps {
  onNotificationClick: () => void
}

export function SharedHeader({ onNotificationClick }: SharedHeaderProps) {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Sistema SEED</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onNotificationClick} className="text-white hover:bg-red-700">
              <Bell className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-red-700">
                <User className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="sm" className="text-white hover:bg-red-700">
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
