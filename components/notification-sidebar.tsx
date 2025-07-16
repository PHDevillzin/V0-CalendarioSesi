"use client"
import { X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface NotificationSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationSidebar({ isOpen, onClose }: NotificationSidebarProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="ml-auto w-80 bg-white shadow-xl h-full overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-red-800 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notificações
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-red-600 hover:bg-red-50">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <Card className="border-red-200">
              <CardContent className="p-3">
                <p className="text-sm text-red-700">
                  <strong>Sistema:</strong> Backup realizado com sucesso
                </p>
                <p className="text-xs text-red-500 mt-1">Há 2 horas</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="p-3">
                <p className="text-sm text-red-700">
                  <strong>Educacional:</strong> Novo curso cadastrado
                </p>
                <p className="text-xs text-red-500 mt-1">Há 4 horas</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="p-3">
                <p className="text-sm text-red-700">
                  <strong>Usuários:</strong> 3 novos usuários cadastrados
                </p>
                <p className="text-xs text-red-500 mt-1">Ontem</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
