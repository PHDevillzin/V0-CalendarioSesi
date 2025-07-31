"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, ChevronDown, Home, Building, GraduationCap, FileText, Settings, Info, Users } from "lucide-react"
import Link from "next/link"
import { SharedHeader } from "@/components/shared-header"
import { NotificationSidebar } from "@/components/notification-sidebar"
import { useState } from "react"

export default function TwoColumnTemplate() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const handleNotificationClick = () => {
    setIsNotificationOpen(true)
  }

  const handleNotificationClose = () => {
    setIsNotificationOpen(false)
  }

  return (
    <div className="min-h-screen bg-red-50">
      {/* Shared Header */}
      <SharedHeader onNotificationClick={handleNotificationClick} />

      {/* Main Content - 30% / 70% Split */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - 30% with Dropdown Menu */}
          <aside className="lg:w-[30%] space-y-6">
            <Card className="border-red-200 bg-white">
              <CardHeader className="bg-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Menu className="h-5 w-5" />
                  <span>Menu Principal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {/* Home */}
                  <div className="border-b border-red-100">
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                    >
                      <Home className="h-4 w-4 mr-3" />
                      Home
                    </a>
                  </div>

                  {/* Cadastros Gerais */}
                  <div className="border-b border-red-100">
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors cursor-pointer list-none">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-3" />
                          Cadastros Gerais
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="bg-red-25 border-t border-red-100">
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Usuários
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Empresas
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Departamentos
                        </a>
                      </div>
                    </details>
                  </div>

                  {/* Institucional */}
                  <div className="border-b border-red-100">
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors cursor-pointer list-none">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-3" />
                          Institucional
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="bg-red-25 border-t border-red-100">
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Entidades
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Unidades
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Grupo de Unidades
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Escolas Móveis
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Funcionários
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Cargos
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Código de Compra
                        </a>
                        <Link
                          href="/calendario"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Calendário do Sistema
                        </Link>
                      </div>
                    </details>
                  </div>

                  {/* Educacional */}
                  <div className="border-b border-red-100">
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors cursor-pointer list-none">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-3" />
                          Educacional
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="bg-red-25 border-t border-red-100">
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Cursos
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Disciplinas
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Professores
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Alunos
                        </a>
                      </div>
                    </details>
                  </div>

                  {/* Registra */}
                  <div className="border-b border-red-100">
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors cursor-pointer list-none">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-3" />
                          Registra
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="bg-red-25 border-t border-red-100">
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Documentos
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Certificados
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Histórico
                        </a>
                      </div>
                    </details>
                  </div>

                  {/* Sistema */}
                  <div>
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors cursor-pointer list-none">
                        <div className="flex items-center">
                          <Settings className="h-4 w-4 mr-3" />
                          Sistema
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="bg-red-25 border-t border-red-100">
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Configurações
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Backup
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Logs do Sistema
                        </a>
                        <Link
                          href="/controle-ambientes"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Controle de ambientes
                        </Link>
                      </div>
                    </details>
                  </div>
                </nav>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <Card className="border-red-200 bg-white">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span>Informações</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-700">Usuário:</span>
                    <span className="font-medium text-red-600">Admin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Perfil:</span>
                    <span className="font-medium text-red-600">Administrador</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Último acesso:</span>
                    <span className="font-medium text-red-600">Hoje, 14:30</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Right Column - 70% */}
          <section className="lg:w-[70%] space-y-6"></section>
        </div>
      </main>

      {/* Notification Sidebar */}
      {isNotificationOpen && <NotificationSidebar isOpen={isNotificationOpen} onClose={handleNotificationClose} />}
    </div>
  )
}
