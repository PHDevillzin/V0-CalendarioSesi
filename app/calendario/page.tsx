"use client"

import { DialogTitle } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  BookOpen,
  Users,
  Clock,
  Plus,
  AlertTriangle,
  Home,
  Building,
  GraduationCap,
  FileText,
  Settings,
  Info,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { SharedHeader } from "@/components/shared-header"
import { NotificationSidebar } from "@/components/notification-sidebar"

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

// Event types
const eventTypes = [
  { value: "feriado", label: "Feriado", color: "bg-red-500" },
  { value: "inicio", label: "Início de Período", color: "bg-green-500" },
  { value: "reuniao", label: "Reunião", color: "bg-blue-500" },
  { value: "avaliacao", label: "Avaliação", color: "bg-yellow-500" },
  { value: "periodo", label: "Fim de Período", color: "bg-purple-500" },
]

// Estados brasileiros
const estadosBrasileiros = [
  { value: "ac", label: "Acre" },
  { value: "al", label: "Alagoas" },
  { value: "ap", label: "Amapá" },
  { value: "am", label: "Amazonas" },
  { value: "ba", label: "Bahia" },
  { value: "ce", label: "Ceará" },
  { value: "df", label: "Distrito Federal" },
  { value: "es", label: "Espírito Santo" },
  { value: "go", label: "Goiás" },
  { value: "ma", label: "Maranhão" },
  { value: "mt", label: "Mato Grosso" },
  { value: "ms", label: "Mato Grosso do Sul" },
  { value: "mg", label: "Minas Gerais" },
  { value: "pa", label: "Pará" },
  { value: "pb", label: "Paraíba" },
  { value: "pr", label: "Paraná" },
  { value: "pe", label: "Pernambuco" },
  { value: "pi", label: "Piauí" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "rn", label: "Rio Grande do Norte" },
  { value: "rs", label: "Rio Grande do Sul" },
  { value: "ro", label: "Rondônia" },
  { value: "rr", label: "Roraima" },
  { value: "sc", label: "Santa Catarina" },
  { value: "sp", label: "São Paulo" },
  { value: "se", label: "Sergipe" },
  { value: "to", label: "Tocantins" },
]

// Function to generate unique ID
const generateUniqueId = () => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export default function CalendarioEscolar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [schoolEvents, setSchoolEvents] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [eventToDelete, setEventToDelete] = useState<any>(null)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [selectedEstado, setSelectedEstado] = useState<string>("")

  // Form state for modal
  const [eventForm, setEventForm] = useState({
    title: "",
    type: "",
    isRecurring: false,
    recurringYears: 5, // Default to 5 years ahead
  })

  // Academic year state
  const [academicYearStart, setAcademicYearStart] = useState<string>("")
  const [academicYearEnd, setAcademicYearEnd] = useState<string>("")
  const [savedAcademicYear, setSavedAcademicYear] = useState<{ start: string; end: string } | null>(null)

  // Add new state to control the configuration modal
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)

  // Add new state variables for semesters after the existing academic year state
  const [firstSemesterStart, setFirstSemesterStart] = useState<string>("")
  const [firstSemesterEnd, setFirstSemesterEnd] = useState<string>("")
  const [secondSemesterStart, setSecondSemesterStart] = useState<string>("")
  const [secondSemesterEnd, setSecondSemesterEnd] = useState<string>("")
  const [savedSemesters, setSavedSemesters] = useState<{
    first: { start: string; end: string } | null
    second: { start: string; end: string } | null
  } | null>(null)

  // Count holidays within the academic year period
  const countHolidaysInAcademicYear = () => {
    if (!savedAcademicYear?.start || !savedAcademicYear?.end) return 0

    const startDate = new Date(savedAcademicYear.start)
    const endDate = new Date(savedAcademicYear.end)
    let holidayCount = 0

    // Check all events for holidays within the academic year period
    Object.entries(schoolEvents).forEach(([dateString, eventList]) => {
      const eventDate = new Date(dateString)

      // Check if the event date is within the academic year period
      if (eventDate >= startDate && eventDate <= endDate) {
        // Count holidays (feriado type events)
        const holidays = eventList.filter((event) => event.type === "feriado")
        holidayCount += holidays.length
      }
    })

    return holidayCount
  }

  // Add new functions after the existing countHolidaysInAcademicYear function

  // Count holidays within a specific period
  const countHolidaysInPeriod = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    let holidayCount = 0

    Object.entries(schoolEvents).forEach(([dateString, eventList]) => {
      const eventDate = new Date(dateString)
      if (eventDate >= start && eventDate <= end) {
        const holidays = eventList.filter((event) => event.type === "feriado")
        holidayCount += holidays.length
      }
    })

    return holidayCount
  }

  // Calculate academic days for a semester
  const calculateSemesterDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0

    const start = new Date(startDate)
    const end = new Date(endDate)
    const timeDifference = end.getTime() - start.getTime()
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1

    if (totalDays <= 0) return 0

    const holidays = countHolidaysInPeriod(startDate, endDate)
    const academicDays = totalDays - holidays

    return academicDays > 0 ? academicDays : 0
  }

  // Calculate recess period between semesters
  const calculateRecessPeriod = () => {
    if (!savedSemesters?.first?.end || !savedSemesters?.second?.start) {
      return { days: 0, startDate: "", endDate: "" }
    }

    const firstEnd = new Date(savedSemesters.first.end)
    const secondStart = new Date(savedSemesters.second.start)

    // Add one day to first semester end to get recess start
    const recessStart = new Date(firstEnd)
    recessStart.setDate(recessStart.getDate() + 1)

    // Subtract one day from second semester start to get recess end
    const recessEnd = new Date(secondStart)
    recessEnd.setDate(recessEnd.getDate() - 1)

    const timeDifference = recessEnd.getTime() - recessStart.getTime()
    const recessDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1

    return {
      days: recessDays > 0 ? recessDays : 0,
      startDate: recessStart.toISOString().split("T")[0],
      endDate: recessEnd.toISOString().split("T")[0],
    }
  }

  // Save semesters function
  const saveSemesters = () => {
    if (!firstSemesterStart || !firstSemesterEnd || !secondSemesterStart || !secondSemesterEnd) {
      alert("Por favor, preencha todas as datas dos semestres.")
      return
    }

    const firstStart = new Date(firstSemesterStart)
    const firstEnd = new Date(firstSemesterEnd)
    const secondStart = new Date(secondSemesterStart)
    const secondEnd = new Date(secondSemesterEnd)

    if (firstStart >= firstEnd) {
      alert("A data de início do primeiro semestre deve ser anterior à data de fim.")
      return
    }

    if (secondStart >= secondEnd) {
      alert("A data de início do segundo semestre deve ser anterior à data de fim.")
      return
    }

    if (firstEnd >= secondStart) {
      alert("O primeiro semestre deve terminar antes do início do segundo semestre.")
      return
    }

    setSavedSemesters({
      first: { start: firstSemesterStart, end: firstSemesterEnd },
      second: { start: secondSemesterStart, end: secondSemesterEnd },
    })

    alert("Semestres salvos com sucesso!")
    setIsConfigModalOpen(false) // Fechar o modal
  }

  // Calculate total days in academic year
  const calculateAcademicYearDays = () => {
    if (!savedAcademicYear?.start || !savedAcademicYear?.end) return 0

    const startDate = new Date(savedAcademicYear.start)
    const endDate = new Date(savedAcademicYear.end)
    const timeDifference = endDate.getTime() - startDate.getTime()
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1 // +1 to include both start and end dates

    if (totalDays <= 0) return 0

    // Subtract holidays from total days
    const holidays = countHolidaysInAcademicYear()
    const academicDays = totalDays - holidays

    return academicDays > 0 ? academicDays : 0
  }

  // Save academic year
  const saveAcademicYear = () => {
    if (!academicYearStart || !academicYearEnd) {
      alert("Por favor, selecione as datas de início e fim do ano letivo.")
      return
    }

    const startDate = new Date(academicYearStart)
    const endDate = new Date(academicYearEnd)

    if (startDate >= endDate) {
      alert("A data de início deve ser anterior à data de fim.")
      return
    }

    setSavedAcademicYear({
      start: academicYearStart,
      end: academicYearEnd,
    })

    alert("Ano letivo salvo com sucesso!")
    setIsConfigModalOpen(false) // Fechar o modal
  }

  // Count events by type
  const countEventsByType = (eventType: string) => {
    let count = 0
    Object.entries(schoolEvents).forEach(([dateString, eventList]) => {
      const eventsOfType = eventList.filter((event) => event.type === eventType)
      count += eventsOfType.length
    })
    return count
  }

  // Count meetings
  const countMeetings = () => countEventsByType("reuniao")

  // Count evaluations
  const countEvaluations = () => countEventsByType("avaliacao")

  // Count holidays
  const countHolidays = () => countEventsByType("feriado")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of the month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Generate calendar days
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(month - 1)
    } else {
      newDate.setMonth(month + 1)
    }
    setCurrentDate(newDate)
  }

  const getEventForDate = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return schoolEvents[dateString] || []
  }

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find((et) => et.value === type)
    return eventType ? eventType.color : "bg-gray-500"
  }

  const isToday = (day: number) => {
    const today = new Date()
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  }

  const isWeekend = (day: number) => {
    const date = new Date(year, month, day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6 // Sunday (0) or Saturday (6)
  }

  const isHoliday = (day: number) => {
    const events = getEventForDate(day)
    return events.some((event) => event.type === "feriado")
  }

  // Handle day click - opens modal
  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    setSelectedDate(dateString)
    setEventForm({ title: "", type: "", isRecurring: false, recurringYears: 5 })
    setIsModalOpen(true)
  }

  // Save event from modal
  const saveEvent = () => {
    if (!eventForm.title || !eventForm.type || !selectedDay) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    const newEvents = { ...schoolEvents }

    // If it's a recurring event, create events for multiple years
    if (eventForm.isRecurring) {
      const currentYear = year
      const baseMonth = month
      const baseDay = selectedDay

      for (let i = 0; i < eventForm.recurringYears; i++) {
        const eventYear = currentYear + i
        const uniqueId = generateUniqueId()

        // Create date string for each year
        const clickedDateString = `${eventYear}-${String(baseMonth + 1).padStart(2, "0")}-${String(baseDay).padStart(2, "0")}`
        const eventDateString = addDayToDate(clickedDateString)

        if (!newEvents[clickedDateString]) {
          newEvents[clickedDateString] = []
        }

        // Save recurring event with unique ID for each year
        newEvents[clickedDateString].push({
          id: uniqueId,
          title: eventForm.title,
          type: eventForm.type,
          displayDate: eventDateString,
          createdAt: new Date().toISOString(),
          isRecurring: true,
          recurringGroup: `recurring_${Date.now()}`, // Group ID for recurring events
          recurringYear: eventYear,
        })
      }

      alert(
        `Evento recorrente criado para ${eventForm.recurringYears} anos (${currentYear}-${currentYear + eventForm.recurringYears - 1})`,
      )
    } else {
      // Regular single event logic (existing code)
      const uniqueId = generateUniqueId()
      const clickedDateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
      const eventDateString = addDayToDate(clickedDateString)

      if (!newEvents[clickedDateString]) {
        newEvents[clickedDateString] = []
      }

      newEvents[clickedDateString].push({
        id: uniqueId,
        title: eventForm.title,
        type: eventForm.type,
        displayDate: eventDateString,
        createdAt: new Date().toISOString(),
        isRecurring: false,
      })
    }

    setSchoolEvents(newEvents)
    setIsModalOpen(false)
    setEventForm({ title: "", type: "", isRecurring: false, recurringYears: 5 })
    setSelectedDay(null)
  }

  // Get all events as a list for management
  const getAllEvents = () => {
    const events = []
    Object.entries(schoolEvents).forEach(([date, eventList]) => {
      eventList.forEach((event) => {
        events.push({
          ...event,
          originalDate: date, // Mantém a data original para referência
          date: event.displayDate || date, // Usa displayDate se existir, senão usa a data original
        })
      })
    })
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  // Find event by unique ID
  const findEventById = (eventId: string) => {
    for (const [date, eventList] of Object.entries(schoolEvents)) {
      const event = eventList.find((e) => e.id === eventId)
      if (event) {
        return { event, date }
      }
    }
    return null
  }

  // Open delete confirmation modal
  const openDeleteModal = (event: any) => {
    setEventToDelete(event)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete event function
  const confirmDeleteEvent = () => {
    if (!eventToDelete || !eventToDelete.id) return

    const eventData = findEventById(eventToDelete.id)
    if (!eventData) {
      console.error("Evento não encontrado:", eventToDelete.id)
      return
    }

    const { date } = eventData
    const newEvents = { ...schoolEvents }

    if (newEvents[date]) {
      // Remove o evento específico usando o ID único
      newEvents[date] = newEvents[date].filter((event) => event.id !== eventToDelete.id)

      // Se não há mais eventos naquela data, remove a entrada completamente
      if (newEvents[date].length === 0) {
        delete newEvents[date]
      }
    }

    // Atualiza o estado - isso remove o evento tanto da lista quanto do calendário
    setSchoolEvents(newEvents)

    // Log para debug
    console.log(`Evento removido com ID: ${eventToDelete.id}`)

    // Fecha o modal e limpa o evento selecionado
    setIsDeleteModalOpen(false)
    setEventToDelete(null)
  }

  // Cancel delete
  const cancelDelete = () => {
    setIsDeleteModalOpen(false)
    setEventToDelete(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  // New function to format date in full
  const formatDateExtended = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${day} de ${monthNames[month]} de ${year}`
  }

  const getEventTypeLabel = (type: string) => {
    const eventType = eventTypes.find((et) => et.value === type)
    return eventType ? eventType.label : type
  }

  const handleNotificationClick = () => {
    setIsNotificationOpen(true)
  }

  const handleNotificationClose = () => {
    setIsNotificationOpen(false)
  }

  const addDayToDate = (dateString: string) => {
    return dateString
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
                    <Link
                      href="/"
                      className="flex items-center px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                    >
                      <Home className="h-4 w-4 mr-3" />
                      Home
                    </Link>
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
                          Sobre a Instituição
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Missão e Valores
                        </a>
                        <a
                          href="#"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                        >
                          Organograma
                        </a>
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
                        <Link
                          href="/calendario"
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors bg-red-100 font-medium"
                        >
                          Calendário do Sistema
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
          <section className="lg:w-[70%] space-y-6">
            {/* Page Title */}
            <Card className="border-red-200 bg-white">
              <CardHeader>
                <CardTitle className="text-red-800">Calendário Escolar</CardTitle>
                <div className="text-red-600">Sistema de gerenciamento de eventos e feriados escolares</div>
              </CardHeader>
            </Card>

            <div className="space-y-8">
              <div className="space-y-8">
                {/* Calendar - Takes 3 columns */}
                <div>
                  <Card className="border-red-200 bg-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-red-800 flex items-center space-x-2">
                          <CalendarIcon className="h-5 w-5" />
                          <span>
                            {monthNames[month]} {year}
                          </span>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigateMonth("prev")}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentDate(new Date())}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Hoje
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigateMonth("next")}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Add Visualization Section here */}
                    <div className="px-6 py-4 border-b border-red-100 bg-red-25">
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-red-800">Visualização</h3>

    {/* Comboboxes in line with labels above */}
    <div className="grid grid-cols-4 gap-4">
      {/* Estados Combobox */}
      <div className="space-y-2">
        <Label className="text-red-700 text-sm font-medium">Estados</Label>
        <Select
          value={selectedEstado}
          onValueChange={(value) => setSelectedEstado(value)}
        >
          <SelectTrigger className="border-red-200 focus:border-red-500 bg-white">
            <SelectValue placeholder="Selecione um estado" />
          </SelectTrigger>
          <SelectContent>
            {estadosBrasileiros.map((estado) => (
              <SelectItem key={estado.value} value={estado.value}>
                {estado.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Unidade Combobox */}
      <div className="space-y-2">
        <Label className="text-red-700 text-sm font-medium">Unidade</Label>
        <Select>
          <SelectTrigger className="border-red-200 focus:border-red-500 bg-white">
            <SelectValue placeholder="Selecione uma unidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unidade1">Unidade Central</SelectItem>
            <SelectItem value="unidade2">Unidade Norte</SelectItem>
            <SelectItem value="unidade3">Unidade Sul</SelectItem>
            <SelectItem value="unidade4">Unidade Leste</SelectItem>
            <SelectItem value="unidade5">Unidade Oeste</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Turma Combobox */}
      <div className="space-y-2">
        <Label className="text-red-700 text-sm font-medium">Turma</Label>
        <Select>
          <SelectTrigger className="border-red-200 focus:border-red-500 bg-white">
            <SelectValue placeholder="Selecione uma turma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1a">1º Ano A</SelectItem>
            <SelectItem value="1b">1º Ano B</SelectItem>
            <SelectItem value="2a">2º Ano A</SelectItem>
            <SelectItem value="2b">2º Ano B</SelectItem>
            <SelectItem value="3a">3º Ano A</SelectItem>
            <SelectItem value="3b">3º Ano B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Docentes Combobox */}
      <div className="space-y-2">
        <Label className="text-red-700 text-sm font-medium">Docentes</Label>
        <Select>
          <SelectTrigger className="border-red-200 focus:border-red-500 bg-white">
            <SelectValue placeholder="Selecione um docente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maria">Prof. Maria Silva</SelectItem>
            <SelectItem value="joao">Prof. João Santos</SelectItem>
            <SelectItem value="ana">Prof. Ana Costa</SelectItem>
            <SelectItem value="carlos">Prof. Carlos Oliveira</SelectItem>
            <SelectItem value="lucia">Prof. Lúcia Ferreira</SelectItem>
            <SelectItem value="pedro">Prof. Pedro Almeida</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    {/* Configurações button below comboboxes */}
    <div className="flex justify-center pt-2">
      <Button
        onClick={() => setIsConfigModalOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        Configurações
      </Button>
    </div>
  </div>
</div>

                    <CardContent>
                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 mb-4">
                        {/* Day headers */}
                        {dayNames.map((day) => (
                          <div
                            key={day}
                            className="p-2 text-center text-sm font-medium text-red-700 bg-red-100 rounded"
                          >
                            {day}
                          </div>
                        ))}

                        {/* Calendar days */}
                        {calendarDays.map((day, index) => (
                          <div
                            key={index}
                            className={`
                        min-h-[80px] p-1 border border-red-100 rounded relative cursor-pointer transition-all
                        ${day ? "bg-white hover:bg-red-50" : "bg-gray-50"}
                        ${isToday(day) ? "ring-2 ring-red-500 bg-red-50" : ""}
                        ${day && (isWeekend(day) || isHoliday(day)) ? "bg-red-50" : ""}
                      `}
                            onClick={() => day && handleDayClick(day)}
                          >
                            {day && (
                              <>
                                <div
                                  className={`
                            text-sm font-medium mb-1
                            ${isToday(day) ? "text-red-700 font-bold" : ""}
                            ${isWeekend(day) || isHoliday(day) ? "text-red-600 font-semibold" : "text-gray-700"}
                          `}
                                >
                                  {day}
                                </div>

                                {/* Events for this day */}
                                <div className="space-y-1">
                                  {getEventForDate(day).map((event) => (
                                    <div
                                      key={event.id}
                                      className={`
                                        text-xs px-1 py-0.5 rounded text-white truncate relative
                                        ${getEventTypeColor(event.type)}
                                      `}
                                      title={`${event.title} - ${getEventTypeLabel(event.type)} ${event.isRecurring ? "(Recorrente)" : ""} (ID: ${event.id})`}
                                    >
                                      {event.title}
                                      {event.isRecurring && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-white"></span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Tooltips - Legenda e Resumo Escolar */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Legenda */}
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="text-red-800 text-sm font-medium mb-3">Legenda</h4>
                          <div className="space-y-2">
                            {eventTypes.map((eventType) => (
                              <div key={eventType.value} className="flex items-center space-x-2">
                                <div className={`w-3 h-3 ${eventType.color} rounded`}></div>
                                <span className="text-xs text-red-700">{eventType.label}</span>
                              </div>
                            ))}
                            <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                              <span className="text-xs text-red-700">Fins de Semana</span>
                            </div>
                          </div>
                        </div>

                        {/* Resumo Escolar */}
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="text-red-800 text-sm font-medium mb-3">Resumo Escolar</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4 text-red-600" />
                                <span className="text-xs text-red-700">Dias Letivos</span>
                              </div>
                              <Badge variant="secondary" className="bg-red-100 text-red-700">
                                {calculateAcademicYearDays()}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-red-600" />
                                <span className="text-xs text-red-700">Feriados</span>
                              </div>
                              <Badge variant="secondary" className="bg-red-100 text-red-700">
                                {countHolidays()}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-red-600" />
                                <span className="text-xs text-red-700">Reuniões</span>
                              </div>
                              <Badge variant="secondary" className="bg-red-100 text-red-700">
                                {countMeetings()}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-red-600" />
                                <span className="text-xs text-red-700">Avaliações</span>
                              </div>
                              <Badge variant="secondary" className="bg-red-100 text-red-700">
                                {countEvaluations()}
                              </Badge>
                            </div>

                            {/* Semester totals - only show if semesters are configured */}
                            {savedSemesters?.first && savedSemesters?.second && (
                              <>
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <CalendarIcon className="h-4 w-4 text-blue-600" />
                                      <span className="text-xs text-red-700">1º Semestre</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                      {calculateSemesterDays(savedSemesters.first.start, savedSemesters.first.end)} dias
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center space-x-2">
                                      <CalendarIcon className="h-4 w-4 text-purple-600" />
                                      <span className="text-xs text-red-700">2º Semestre</span>
                                    </div>
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                      {calculateSemesterDays(savedSemesters.second.start, savedSemesters.second.end)} dias
                                    </Badge>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>💡 Como usar:</strong> Clique em qualquer dia do calendário para adicionar um evento
                          ou feriado.
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          <strong>🆔 Sistema:</strong> Cada evento possui um ID único para identificação segura.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Events List */}
                <Card className="border-red-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5" />
                        <span>Eventos e Feriados Cadastrados</span>
                      </div>
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        {getAllEvents().length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {getAllEvents().length === 0 ? (
                        <div className="text-center py-8">
                          <CalendarIcon className="h-12 w-12 text-red-300 mx-auto mb-4" />
                          <p className="text-red-600 font-medium mb-2">Nenhum evento cadastrado</p>
                          <p className="text-red-500 text-sm">
                            Clique em qualquer dia do calendário para adicionar seu primeiro evento
                          </p>
                        </div>
                      ) : (
                        getAllEvents().map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between p-3 border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 ${getEventTypeColor(event.type)} rounded flex-shrink-0`}></div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-red-800 truncate">{event.title}</div>
                                <div className="text-xs text-red-600 flex items-center space-x-1">
                                  <span className="text-red-500">• {getEventTypeLabel(event.type)}</span>
                                  {event.isRecurring && <span className="text-yellow-600 font-medium">• Recorrente</span>}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">ID: {event.id}</div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDeleteModal(event)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-100 border-red-300 flex-shrink-0"
                              title={`Desmarcar evento (ID: ${event.id})`}
                            >
                              Desmarcar
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Configuration List - New section */}
                <Card className="border-red-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Configurações Salvas</span>
                      </div>
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        {(() => {
                          let count = 0
                          if (savedAcademicYear) count++
                          if (savedSemesters?.first && savedSemesters?.second) count += 2 // Semestres + Recesso
                          return count
                        })()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {!savedAcademicYear && (!savedSemesters?.first || !savedSemesters?.second) ? (
                        <div className="text-center py-8">
                          <Settings className="h-12 w-12 text-red-300 mx-auto mb-4" />
                          <p className="text-red-600 font-medium mb-2">Nenhuma configuração salva</p>
                          <p className="text-red-500 text-sm">
                            Clique no botão "Configurações" para definir o ano letivo e semestres
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Academic Year Configuration */}
                          {savedAcademicYear && (
                            <div className="flex items-center justify-between p-3 border border-red-100 rounded-lg hover:bg-red-50 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-green-500 rounded flex-shrink-0"></div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-red-800">Ano Letivo</div>
                                  <div className="text-xs text-red-600">
                                    {new Date(savedAcademicYear.start).toLocaleDateString("pt-BR")} a{" "}
                                    {new Date(savedAcademicYear.end).toLocaleDateString("pt-BR")}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {calculateAcademicYearDays()} dias letivos • {countHolidaysInAcademicYear()} feriados
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSavedAcademicYear(null)
                                  setAcademicYearStart("")
                                  setAcademicYearEnd("")
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-100 border-red-300 flex-shrink-0"
                                title="Remover configuração do ano letivo"
                              >
                                Remover
                              </Button>
                            </div>
                          )}

                          {/* Semesters Configuration */}
                          {savedSemesters?.first && savedSemesters?.second && (
                            <div className="flex items-center justify-between p-3 border border-red-100 rounded-lg hover:bg-red-50 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-blue-500 rounded flex-shrink-0"></div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-red-800">Configuração de Semestres</div>
                                  <div className="text-xs text-red-600 space-y-1">
                                    <div>
                                      <strong>1º Semestre:</strong>{" "}
                                      {new Date(savedSemesters.first.start).toLocaleDateString("pt-BR")} a{" "}
                                      {new Date(savedSemesters.first.end).toLocaleDateString("pt-BR")} (
                                      {calculateSemesterDays(savedSemesters.first.start, savedSemesters.first.end)} dias)
                                    </div>
                                    <div>
                                      <strong>2º Semestre:</strong>{" "}
                                      {new Date(savedSemesters.second.start).toLocaleDateString("pt-BR")} a{" "}
                                      {new Date(savedSemesters.second.end).toLocaleDateString("pt-BR")} (
                                      {calculateSemesterDays(savedSemesters.second.start, savedSemesters.second.end)}{" "}
                                      dias)
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Recesso: {(() => {
                                      const recess = calculateRecessPeriod()
                                      return `${recess.days} dias (${new Date(recess.startDate).toLocaleDateString("pt-BR")} a ${new Date(recess.endDate).toLocaleDateString("pt-BR")})`
                                    })()}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSavedSemesters(null)
                                  setFirstSemesterStart("")
                                  setFirstSemesterEnd("")
                                  setSecondSemesterStart("")
                                  setSecondSemesterEnd("")
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-100 border-red-300 flex-shrink-0"
                                title="Remover configuração dos semestres"
                              >
                                Remover
                              </Button>
                            </div>
                          )}

                          {/* Recess Period Configuration */}
                          {savedSemesters?.first && savedSemesters?.second && (
                            <div className="flex items-center justify-between p-3 border border-red-100 rounded-lg hover:bg-red-50 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-orange-500 rounded flex-shrink-0"></div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-red-800">Período de Recesso</div>
                                  <div className="text-xs text-red-600">
                                    {(() => {
                                      const recess = calculateRecessPeriod()
                                      return `${new Date(recess.startDate).toLocaleDateString("pt-BR")} a ${new Date(recess.endDate).toLocaleDateString("pt-BR")}`
                                    })()}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {(() => {
                                      const recess = calculateRecessPeriod()
                                      return `${recess.days} dias de recesso entre semestres`
                                    })()}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSavedSemesters(null)
                                  setFirstSemesterStart("")
                                  setFirstSemesterEnd("")
                                  setSecondSemesterStart("")
                                  setSecondSemesterEnd("")
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-100 border-red-300 flex-shrink-0"
                                title="Remover configuração do recesso"
                              >
                                Remover
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Notification Sidebar */}
      <NotificationSidebar isOpen={isNotificationOpen} onClose={handleNotificationClose} />

      {/* Modal for configurations */}
      <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-red-800 flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Configurações - Datas fixas e recorrentes</span>
            </DialogTitle>
            <div className="text-red-600 text-sm">Configuração de períodos e datas fixas do sistema educacional</div>
          </DialogHeader>

          <div className="py-4">
            {/* Academic Year Subsection */}
            <div className="space-y-6">
              <div className="border-b border-red-100 pb-6">
                <h4 className="text-red-800 font-medium mb-4 flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Ano letivo</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="academicStart" className="text-red-700 text-sm">
                      Data de início *
                    </Label>
                    <Input
                      id="academicStart"
                      type="date"
                      value={academicYearStart}
                      onChange={(e) => setAcademicYearStart(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="academicEnd" className="text-red-700 text-sm">
                      Data de fim *
                    </Label>
                    <Input
                      id="academicEnd"
                      type="date"
                      value={academicYearEnd}
                      onChange={(e) => setAcademicYearEnd(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                    />
                  </div>

                  <Button onClick={saveAcademicYear} className="bg-red-600 hover:bg-red-700 text-white">
                    Salvar Ano Letivo
                  </Button>
                </div>

                {savedAcademicYear && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 font-medium text-sm">Ano letivo configurado</span>
                    </div>
                    <div className="text-green-700 text-sm space-y-1">
                      <div>
                        <strong>Início:</strong> {new Date(savedAcademicYear.start).toLocaleDateString("pt-BR")}
                      </div>
                      <div>
                        <strong>Fim:</strong> {new Date(savedAcademicYear.end).toLocaleDateString("pt-BR")}
                      </div>
                      <div>
                        <strong>Total de dias:</strong> {(() => {
                          const startDate = new Date(savedAcademicYear.start)
                          const endDate = new Date(savedAcademicYear.end)
                          const timeDifference = endDate.getTime() - startDate.getTime()
                          return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1
                        })()} dias
                      </div>
                      <div>
                        <strong>Feriados:</strong> {countHolidaysInAcademicYear()} dias
                      </div>
                      <div className="pt-1 border-t border-green-300">
                        <strong>Dias letivos:</strong> {calculateAcademicYearDays()} dias
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* First Semester Subsection */}
              <div className="border-b border-red-100 pb-6">
                <h4 className="text-red-800 font-medium mb-4 flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Primeiro semestre</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstSemesterStart" className="text-red-700 text-sm">
                      Data de início *
                    </Label>
                    <Input
                      id="firstSemesterStart"
                      type="date"
                      value={firstSemesterStart}
                      onChange={(e) => setFirstSemesterStart(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstSemesterEnd" className="text-red-700 text-sm">
                      Data de fim *
                    </Label>
                    <Input
                      id="firstSemesterEnd"
                      type="date"
                      value={firstSemesterEnd}
                      onChange={(e) => setFirstSemesterEnd(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                    />
                  </div>
                </div>

                {savedSemesters?.first && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-800 font-medium text-sm">Primeiro semestre configurado</span>
                    </div>
                    <div className="text-blue-700 text-sm space-y-1">
                      <div>
                        <strong>Período:</strong> {new Date(savedSemesters.first.start).toLocaleDateString("pt-BR")} a{" "}
                        {new Date(savedSemesters.first.end).toLocaleDateString("pt-BR")}
                      </div>
                      <div>
                        <strong>Total de dias:</strong> {(() => {
                          const start = new Date(savedSemesters.first.start)
                          const end = new Date(savedSemesters.first.end)
                          const timeDifference = end.getTime() - start.getTime()
                          return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1
                        })()} dias
                      </div>
                      <div>
                        <strong>Feriados:</strong>{" "}
                        {countHolidaysInPeriod(savedSemesters.first.start, savedSemesters.first.end)} dias
                      </div>
                      <div className="pt-1 border-t border-blue-300">
                        <strong>Dias letivos:</strong>{" "}
                        {calculateSemesterDays(savedSemesters.first.start, savedSemesters.first.end)} dias
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Second Semester Subsection */}
              <div className="border-b border-red-100 pb-6">
                <h4 className="text-red-800 font-medium mb-4 flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Segundo semestre</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="secondSemesterStart" className="text-red-700 text-sm">
                      Data de início *
                    </Label>
                    <Input
                      id="secondSemesterStart"
                      type="date"
                      value={secondSemesterStart}
                      onChange={(e) => setSecondSemesterStart(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondSemesterEnd" className="text-red-700 text-sm">
                      Data de fim *
                    </Label>
                    <Input
                      id="secondSemesterEnd"
                      type="date"
                      value={secondSemesterEnd}
                      onChange={(e) => setSecondSemesterEnd(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                    />
                  </div>
                </div>

                {savedSemesters?.second && (
                  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-800 font-medium text-sm">Segundo semestre configurado</span>
                    </div>
                    <div className="text-purple-700 text-sm space-y-1">
                      <div>
                        <strong>Período:</strong> {new Date(savedSemesters.second.start).toLocaleDateString("pt-BR")} a{" "}
                        {new Date(savedSemesters.second.end).toLocaleDateString("pt-BR")}
                      </div>
                      <div>
                        <strong>Total de dias:</strong> {(() => {
                          const start = new Date(savedSemesters.second.start)
                          const end = new Date(savedSemesters.second.end)
                          const timeDifference = end.getTime() - start.getTime()
                          return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1
                        })()} dias
                      </div>
                      <div>
                        <strong>Feriados:</strong>{" "}
                        {countHolidaysInPeriod(savedSemesters.second.start, savedSemesters.second.end)} dias
                      </div>
                      <div className="pt-1 border-t border-purple-300">
                        <strong>Dias letivos:</strong>{" "}
                        {calculateSemesterDays(savedSemesters.second.start, savedSemesters.second.end)} dias
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save Semesters Button */}
              <div className="flex justify-center">
                <Button onClick={saveSemesters} onClick={saveSemesters} className="bg-red-600 hover:bg-red-700 text-white px-8">
                  Salvar Configuração dos Semestres
                </Button>
              </div>

              {/* Recess Period Display */}
              {savedSemesters?.first && savedSemesters?.second && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-orange-800 font-medium text-sm">Período de Recesso</span>
                  </div>
                  <div className="text-orange-700 text-sm space-y-1">
                    {(() => {
                      const recess = calculateRecessPeriod()
                      return (
                        <>
                          <div>
                            <strong>Período:</strong> {new Date(recess.startDate).toLocaleDateString("pt-BR")} a{" "}
                            {new Date(recess.endDate).toLocaleDateString("pt-BR")}
                          </div>
                          <div>
                            <strong>Duração:</strong> {recess.days} dias
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Dica:</strong> Configure o período do ano letivo e dos semestres para calcular
                  automaticamente os dias letivos disponíveis. Os feriados cadastrados no calendário são automaticamente
                  subtraídos do total de dias letivos. O período de recesso é calculado automaticamente entre os
                  semestres.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfigModalOpen(false)}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal for adding events */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-800 flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Adicionar Evento</span>
            </DialogTitle>
            {selectedDay && (
              <div className="space-y-1">
                <p className="text-sm text-red-600">
                  Data clicada: {selectedDay} de {monthNames[month]} de {year}
                </p>
              </div>
            )}
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle" className="text-red-700">
                Nome do Evento *
              </Label>
              <Input
                id="eventTitle"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="Ex: Dia da Independência, Reunião Pedagógica..."
                className="border-red-200 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-red-700">
                Tipo de Evento *
              </Label>
              <Select value={eventForm.type} onValueChange={(value) => setEventForm({ ...eventForm, type: value })}>
                <SelectTrigger className="border-red-200 focus:border-red-500">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((eventType) => (
                    <SelectItem key={eventType.value} value={eventType.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 ${eventType.color} rounded`}></div>
                        <span>{eventType.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isRecurring"
                  checked={eventForm.isRecurring}
                  onChange={(e) => setEventForm({ ...eventForm, isRecurring: e.target.checked })}
                  className="w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500 focus:ring-2"
                />
                <Label htmlFor="isRecurring" className="text-yellow-800 font-medium">
                  Evento recorrente (todos os anos)
                </Label>
              </div>

              {eventForm.isRecurring && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="recurringYears" className="text-yellow-700 text-sm">
                    Criar evento para quantos anos? *
                  </Label>
                  <Select
                    value={eventForm.recurringYears.toString()}
                    onValueChange={(value) => setEventForm({ ...eventForm, recurringYears: Number.parseInt(value) })}
                  >
                    <SelectTrigger className="border-yellow-300 focus:border-yellow-500 w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 anos</SelectItem>
                      <SelectItem value="5">5 anos</SelectItem>
                      <SelectItem value="10">10 anos</SelectItem>
                      <SelectItem value="15">15 anos</SelectItem>
                      <SelectItem value="20">20 anos</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-yellow-700">
                    O evento será criado para {eventForm.recurringYears} anos consecutivos, sempre no dia {selectedDay}{" "}
                    de {monthNames[month]}.
                  </p>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              <strong>ℹ️ Informação:</strong> Um ID único será gerado automaticamente para este evento.
            </div>
          </div>

          <DialogFooter className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Cancelar
            </Button>
            <Button onClick={saveEvent} className="bg-red-600 hover:bg-red-700 text-white">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal for delete confirmation */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-800 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Confirmar</span>
            </DialogTitle>
          </DialogHeader>

          {eventToDelete && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-4 h-4 ${getEventTypeColor(eventToDelete.type)} rounded flex-shrink-0`}></div>
                  <div className="font-medium text-red-800">{eventToDelete.title}</div>
                </div>
                <div className="text-sm text-red-600 space-y-1">
                  <div className="flex items-center space-x-1"></div>
                  <div>Tipo: {getEventTypeLabel(eventToDelete.type)}</div>
                  <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-100 rounded">
                    <strong>ID único:</strong> {eventToDelete.id}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-red-700 font-medium mb-2">Tem certeza que deseja desmarcar este evento?</p>
                <p className="text-red-600 text-sm">
                  Esta ação removerá o evento do calendário e da lista de eventos cadastrados.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={cancelDelete} className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={confirmDeleteEvent} className="bg-red-600 hover:bg-red-700 text-white">
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
