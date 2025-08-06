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

// Available colors for event types
const availableColors = [
  { value: "bg-red-500", label: "Vermelho", color: "bg-red-500" },
  { value: "bg-blue-500", label: "Azul", color: "bg-blue-500" },
  { value: "bg-green-500", label: "Verde", color: "bg-green-500" },
  { value: "bg-yellow-500", label: "Amarelo", color: "bg-yellow-500" },
  { value: "bg-purple-500", label: "Roxo", color: "bg-purple-500" },
  { value: "bg-pink-500", label: "Rosa", color: "bg-pink-500" },
  { value: "bg-orange-500", label: "Laranja", color: "bg-orange-500" },
  { value: "bg-indigo-500", label: "Índigo", color: "bg-indigo-500" },
  { value: "bg-teal-500", label: "Verde-azulado", color: "bg-teal-500" },
  { value: "bg-gray-500", label: "Cinza", color: "bg-gray-500" },
]

// Municipalities and Schools data based on the provided image
const municipalitiesData = {
  Todos: [
    "Escola SESI-SP de Alumínio",
    "Escola SESI-SP de Álvares Machado",
    "SESI - Americana - DR. ESTEVAM FARAONE",
    "Escola SESI-SP Mandel Steinbruch",
    "Escola SESI-SP de Americana - Machadinho",
    "Escola SESI-SP de Anápolis",
    "SESI - Araraquara - Francisca da Silva Vilela",
    "Escola SESI-SP de Araraquara - 14. Presidente",
    "SESI - Araraquara - WALTON LINO",
    "SESI - Araras - MARIA HELENA NOGUEIRA",
    "SESI - Estação de Cultura - Atibaia",
    "SESI - Barueri - CAT Maria Antonieta Junqueira Pamplona de Menezes",
    "SESI - Bauru - RAPHAEL NOSCHESE",
    "Escola SESI-SP de Bebedouro",
    "SESI - Bebedouro - SALVADOR BIONARIO",
    "Escola SESI-SP de Birigui",
    "Escola SESI-SP de Botucatu",
    "SESI - Botucatu - SALVADOR FIMACE",
    "Escola SESI-SP de Botucatu",
    "Escola SESI-SP de Bragança Paulista",
    "Escola SESI-SP Carlos Eduardo Moreira Ferreira",
    "Escola SESI-SP de Cachoeira - Pg. Residencial Maria Elmira",
    "Escola SESI-SP de Cajamar",
    "SESI - Campinas Americana - PROFESSORA MARIA BIAZ",
    "SESI - Campinas Santos Dumont - JOAQUIM GABRIEL PENTEADO",
    "Escola SESI-SP de Campinas - Parque Itália",
    "Escola SESI-SP de Campinas - Bacuri",
    "Escola SESI-SP de Campo Limpo Paulista",
    "Escola SESI-SP de Caraguatatuba",
    "Escola SESI-SP de Catanduva",
    "SESI - Cotia - MARIA HELENA NOGUEIRA",
    "SESI - Cubatão Af Carvalho - MARIO AMATO",
    "SESI - Estação de Cultura - Cosmópolis",
    "SESI - Cotia - Olívia Espírito Santos",
    "SESI - Cruzeiro - OCTAVIO MENDES FILHO",
    "Escola SESI-SP de Cotia",
    "Escola SESI-SP de Cruzeiro",
    "SESI - Cruzeiro - JOSÉ BENEDITO NOVAES",
    "Escola SESI-SP de Diadema - Tabata",
    "Escola SESI-SP de Descalvado",
    "SESI - Diadema - JOSÉ ROBERTO MAGALHÃES TEIXEIRA",
    "Escola SESI-SP de Diadema - Tabata",
    "Escola SESI-SP de Fernandópolis",
    "Escola SESI-SP Parque de Viracopos",
    "SESI - França - JOSÉ BENEDITO VIEIRA",
    "Escola SESI-SP de França - Vila Scarlaccci",
    "Escola SESI-SP de Garça",
    "Escola SESI-SP de Guaratinguetá",
    "SESI - Guarulhos - ADRIANA DIAS DE FIGUEIREDO",
    "Escola SESI-SP de Guarulhos - Jardim Adriana",
    "Escola SESI-SP de Hortolândia",
    "Escola SESI-SP de Igaraçu do Tietê",
    "SESI - Indaiatuba - ANTÔNIO ERMÍRIO DE MORAES",
    "Escola SESI-SP de Indaiatuba",
    "SESI - Itapetininga - BENEDITO MARQUES DA SILVA",
    "Escola SESI-SP de Itapetininga",
    "Escola SESI-SP de Itapira",
    "Escola SESI-SP Comandante Emílio Benjamin Jales",
    "SESI - Itaquaquecetuba - NOEMIA FERREIRA",
    "SESI - Jacarei - KANAM SIMÃO HACY",
    "SESI - Jau - RUY MARTINS ALTENFELDER SILVA",
    "SESI - Jundiaí - ELCIO GUERRAZZI",
    "SESI - Limeira - MARIO PUGLIESI",
    "SESI - Limeira - JOSÉ BENEDITO NOVAES",
    "SESI - Matão - PROFESSOR AZOR SILVEIRA LEITE",
    "SESI - Mauá - MN. RAPHAEL DE ALMEIDA MAGALHÃES",
    "SESI - Mogi das Cruzes - ADRIANA DIAS DE FIGUEIREDO",
    "Escola SESI-SP de Mogi das Cruzes",
    "SESI - Mogi Guaçu - MN. ROBERTO DELLA MANNA",
    "Escola SESI-SP de Mogi Guaçu",
    "Escola SESI-SP de Monte Alto",
    "Escola SESI-SP Chafi Gohara",
    "SESI - Osasco - LUIS EULÁLIA DE BUENO VIDIGAL FILHO",
    "Escola SESI-SP de Osasco - Jardim Piratininga",
    "Escola SESI-SP de Ourinhos",
    "SESI - Ourinhos - MANOEL DA COSTA SANTOS",
    "Escola SESI-SP de Ourinhos",
    "Escola SESI-SP Carlos Arnaldo Gomes",
    "Escola SESI-SP de Peruíbe",
    "Escola SESI-SP de Penápolis",
    "Escola SESI-SP Paulo Saul",
    "SESI - Piracicaba - MARIO MANTONI",
    "Escola SESI-SP de Piracicaba - Vila Industrial",
    "Escola SESI-SP de Piracicaba",
    "Escola SESI-SP de Pirassununga",
    "Escola SESI-SP de Pompéia",
    "SESI - Presidente Epitácio - CARLOS CARDOSO DE ALMEIDA AMORIM",
    "Escola SESI-SP de Presidente Epitácio",
    "SESI - Presidente Prudente - BELMIRO JESUS",
    "SESI - Ribeirão Pires - JOSÉ BENEDITO DE OLIVEIRA JUNIOR",
    "SESI - Rio Claro - JOSÉ FELÍCIO CASTELLANO",
    "SESI - Santa Bárbara D'Oeste - AMÉRICO EMÍLIO ROMI",
    "SESI - Estação de Cultura - Santa Rita do Passa Quatro",
    "SESI - Santana de Parnaíba - JOSÉ CARLOS - NATALINI",
    "SESI - Santo André - MARIO COVAS JUNIOR",
    "SESI - Santos - PAULO DE CASTRO CORREIA",
    "SESI - São Bernardo do Campo - ALBANO FRANCO",
    "SESI - São Carlos - ERNESTO PEREIRA LOPES FILHO",
    "SESI - São José do Rio Preto - JORGE DUPRAT FIGUEIREDO",
    "SESI - São José dos Campos - SANTOS DUMONT",
    "SESI - Belenzinho",
    "SESI - Ipiranga",
    "SESI - Tatuapé",
    "SESI - Vila Bianca",
    "SESI - Vila Carrão",
    "SESI - Vila Císper",
    "SESI - Vila Espanhola",
    "SESI - Vila Leopoldina",
    "SESI - Vila das Mercês",
    "SESI - Paulista",
    "SESI - Cidade Carvalho",
    "SESI - Lauzane Paulista",
    "SESI - Sertãozinho - NELSON ABRÃO JOÃO",
    "SESI - Sorocaba - SEN JOSÉ ERMÍRIO DE MORAES",
    "SESI - Sumaré - FUAD ASSEF MALUF",
    "SESI - Suzano - Max Feffer",
    "SESI - Tatuí - WILSON SANPAIA",
    "SESI - Taubaté - LUIZ QUEIROZ VILLARES",
    "SESI - Valinhos - JOSÉ BENEDITO NORAES FILHO",
  ],
  Alumínio: ["Escola SESI-SP de Alumínio"],
  "Álvares Machado": ["Escola SESI-SP de Álvares Machado"],
  Americana: [
    "SESI - Americana - DR. ESTEVAM FARAONE",
    "Escola SESI-SP Mandel Steinbruch",
    "Escola SESI-SP de Americana - Machadinho",
  ],
  Anápolis: ["Escola SESI-SP de Anápolis"],
  Araraquara: [
    "SESI - Araraquara - Francisca da Silva Vilela",
    "Escola SESI-SP de Araraquara - 14. Presidente",
    "SESI - Araraquara - WALTON LINO",
  ],
  Araras: ["SESI - Araras - MARIA HELENA NOGUEIRA"],
  Atibaia: ["SESI - Estação de Cultura - Atibaia"],
  Barueri: ["SESI - Barueri - CAT Maria Antonieta Junqueira Pamplona de Menezes"],
  Bauru: ["SESI - Bauru - RAPHAEL NOSCHESE"],
  Bebedouro: ["Escola SESI-SP de Bebedouro", "SESI - Bebedouro - SALVADOR BIONARIO"],
  Birigui: ["Escola SESI-SP de Birigui"],
  Botucatu: ["Escola SESI-SP de Botucatu", "SESI - Botucatu - SALVADOR FIMACE"],
  "Bragança Paulista": ["Escola SESI-SP de Bragança Paulista"],
  Britas: ["Escola SESI-SP Carlos Eduardo Moreira Ferreira"],
  Cachoeira: ["Escola SESI-SP de Cachoeira - Pg. Residencial Maria Elmira"],
  Cajamar: ["Escola SESI-SP de Cajamar"],
  Campinas: [
    "SESI - Campinas Americana - PROFESSORA MARIA BIAZ",
    "SESI - Campinas Santos Dumont - JOAQUIM GABRIEL PENTEADO",
    "Escola SESI-SP de Campinas - Parque Itália",
    "Escola SESI-SP de Campinas - Bacuri",
  ],
  "Campo Limpo Paulista": ["Escola SESI-SP de Campo Limpo Paulista"],
  Caraguatatuba: ["Escola SESI-SP de Caraguatatuba"],
  Catanduva: ["Escola SESI-SP de Catanduva"],
  Cotia: ["SESI - Cotia - MARIA HELENA NOGUEIRA"],
  "Cubatão Af Carvalho": ["SESI - Cubatão Af Carvalho - MARIO AMATO"],
  Cosmópolis: ["SESI - Estação de Cultura - Cosmópolis"],
  Cotia: ["SESI - Cotia - Olívia Espírito Santos", "Escola SESI-SP de Cotia"],
  Cruzeiro: [
    "SESI - Cruzeiro - OCTAVIO MENDES FILHO",
    "Escola SESI-SP de Cruzeiro",
    "SESI - Cruzeiro - JOSÉ BENEDITO NOVAES",
  ],
  Descalvado: ["Escola SESI-SP de Descalvado"],
  Diadema: ["SESI - Diadema - JOSÉ ROBERTO MAGALHÃES TEIXEIRA", "Escola SESI-SP de Diadema - Tabata"],
  Fernandópolis: ["Escola SESI-SP de Fernandópolis"],
  "Franca de Viracopos": ["Escola SESI-SP Parque de Viracopos"],
  França: ["SESI - França - JOSÉ BENEDITO VIEIRA", "Escola SESI-SP de França - Vila Scarlaccci"],
  Garça: ["Escola SESI-SP de Garça"],
  Guaratinguetá: ["Escola SESI-SP de Guaratinguetá"],
  Guarulhos: ["SESI - Guarulhos - ADRIANA DIAS DE FIGUEIREDO", "Escola SESI-SP de Guarulhos - Jardim Adriana"],
  Hortolândia: ["Escola SESI-SP de Hortolândia"],
  "Igaraçu do Tietê": ["Escola SESI-SP de Igaraçu do Tietê"],
  Indaiatuba: ["SESI - Indaiatuba - ANTÔNIO ERMÍRIO DE MORAES", "Escola SESI-SP de Indaiatuba"],
  Itapetininga: ["SESI - Itapetininga - BENEDITO MARQUES DA SILVA", "Escola SESI-SP de Itapetininga"],
  Itapira: ["Escola SESI-SP de Itapira"],
  Itabira: ["Escola SESI-SP Comandante Emílio Benjamin Jales"],
  Itaquaquecetuba: ["SESI - Itaquaquecetuba - NOEMIA FERREIRA"],
  Jacarei: ["SESI - Jacarei - KANAM SIMÃO HACY"],
  Jau: ["SESI - Jau - RUY MARTINS ALTENFELDER SILVA"],
  Jundiaí: ["SESI - Jundiaí - ELCIO GUERRAZZI"],
  Limeira: ["SESI - Limeira - MARIO PUGLIESI", "SESI - Limeira - JOSÉ BENEDITO NOVAES"],
  Matão: ["SESI - Matão - PROFESSOR AZOR SILVEIRA LEITE"],
  Mauá: ["SESI - Mauá - MN. RAPHAEL DE ALMEIDA MAGALHÃES"],
  "Mogi das Cruzes": ["SESI - Mogi das Cruzes - ADRIANA DIAS DE FIGUEIREDO", "Escola SESI-SP de Mogi das Cruzes"],
  "Mogi Guaçu": ["SESI - Mogi Guaçu - MN. ROBERTO DELLA MANNA", "Escola SESI-SP de Mogi Guaçu"],
  "Monte Alto": ["Escola SESI-SP de Monte Alto"],
  "Nova Odessa": ["Escola SESI-SP Chafi Gohara"],
  Osasco: ["SESI - Osasco - LUIS EULÁLIA DE BUENO VIDIGAL FILHO", "Escola SESI-SP de Osasco - Jardim Piratininga"],
  Ourinhos: ["SESI - Ourinhos - MANOEL DA COSTA SANTOS", "Escola SESI-SP de Ourinhos"],
  "Paraguaçu Paulista": ["Escola SESI-SP Carlos Arnaldo Gomes"],
  Peruíbe: ["Escola SESI-SP de Peruíbe"],
  Penápolis: ["Escola SESI-SP de Penápolis"],
  "Piracicaba/Iracemápolis": ["Escola SESI-SP Paulo Saul"],
  Piracicaba: [
    "SESI - Piracicaba - MARIO MANTONI",
    "Escola SESI-SP de Piracicaba - Vila Industrial",
    "Escola SESI-SP de Piracicaba",
  ],
  Pirassununga: ["Escola SESI-SP de Pirassununga"],
  Pompéia: ["Escola SESI-SP de Pompéia"],
  "Presidente Epitácio": [
    "SESI - Presidente Epitácio - CARLOS CARDOSO DE ALMEIDA AMORIM",
    "Escola SESI-SP de Presidente Epitácio",
  ],
  "Presidente Prudente": ["SESI - Presidente Prudente - BELMIRO JESUS"],
  "Ribeirão Pires": ["SESI - Ribeirão Pires - JOSÉ BENEDITO DE OLIVEIRA JUNIOR"],
  "Rio Claro": ["SESI - Rio Claro - JOSÉ FELÍCIO CASTELLANO"],
  "Santa Bárbara D'Oeste": ["SESI - Santa Bárbara D'Oeste - AMÉRICO EMÍLIO ROMI"],
  "Santa Rita do Passa Quatro": ["SESI - Estação de Cultura - Santa Rita do Passa Quatro"],
  "Santana de Parnaíba": ["SESI - Santana de Parnaíba - JOSÉ CARLOS - NATALINI"],
  "Santo André": ["SESI - Santo André - MARIO COVAS JUNIOR"],
  Santos: ["SESI - Santos - PAULO DE CASTRO CORREIA"],
  "São Bernardo do Campo": ["SESI - São Bernardo do Campo - ALBANO FRANCO"],
  "São Carlos": ["SESI - São Carlos - ERNESTO PEREIRA LOPES FILHO"],
  "São José do Rio Preto": ["SESI - São José do Rio Preto - JORGE DUPRAT FIGUEIREDO"],
  "São José dos Campos": ["SESI - São José dos Campos - SANTOS DUMONT"],
  "São Paulo": [
    "SESI - Belenzinho",
    "SESI - Ipiranga",
    "SESI - Tatuapé",
    "SESI - Vila Bianca",
    "SESI - Vila Carrão",
    "SESI - Vila Císper",
    "SESI - Vila Espanhola",
    "SESI - Vila Leopoldina",
    "SESI - Vila das Mercês",
    "SESI - Paulista",
    "SESI - Cidade Carvalho",
    "SESI - Lauzane Paulista",
  ],
  Sertãozinho: ["SESI - Sertãozinho - NELSON ABRÃO JOÃO"],
  Sorocaba: ["SESI - Sorocaba - SEN JOSÉ ERMÍRIO DE MORAES"],
  Sumaré: ["SESI - Sumaré - FUAD ASSEF MALUF"],
  Suzano: ["SESI - Suzano - Max Feffer"],
  Tatuí: ["SESI - Tatuí - WILSON SANPAIA"],
  Taubaté: ["SESI - Taubaté - LUIZ QUEIROZ VILLARES"],
  Valinhos: ["SESI - Valinhos - JOSÉ BENEDITO NORAES FILHO"],
}

// Function to generate unique ID
const generateUniqueId = () => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Function to generate unique event type ID
const generateEventTypeId = () => {
  return `eventtype_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
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

  // Event types state - starts empty, user creates their own types
  const [eventTypes, setEventTypes] = useState([])
  const [isEventTypeModalOpen, setIsEventTypeModalOpen] = useState(false)
  const [eventTypeForm, setEventTypeForm] = useState({
    name: "",
    color: "",
  })

  // State for municipality and school selection
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("")
  const [selectedSchool, setSelectedSchool] = useState<string>("")

  // Form state for modal
  const [eventForm, setEventForm] = useState({
    title: "",
    type: "",
    isRecurring: false,
    recurringYears: 5, // Default to 5 years ahead
    makeSaturdayNonAcademic: false, // Option for Saturdays
  })

  // Academic year state
  const [academicYearStart, setAcademicYearStart] = useState<string>("")
  const [academicYearEnd, setAcademicYearEnd] = useState<string>("")
  const [savedAcademicYear, setSavedAcademicYear] = useState<{ start: string; end: string } | null>(null)

  // Add new state to control the configuration modal
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)

  // Recess period state
  const [recessStart, setRecessStart] = useState<string>("")
  const [recessEnd, setRecessEnd] = useState<string>("")
  const [savedRecess, setSavedRecess] = useState<{ start: string; end: string } | null>(null)

  // Get available schools based on selected municipality
  const getAvailableSchools = () => {
    if (!selectedMunicipality || selectedMunicipality === "Todos") {
      return municipalitiesData["Todos"]
    }
    return municipalitiesData[selectedMunicipality] || []
  }

  // Handle municipality change
  const handleMunicipalityChange = (value: string) => {
    setSelectedMunicipality(value)
    setSelectedSchool("") // Reset school selection when municipality changes
  }

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

  // Calculate recess days
  const calculateRecessDays = () => {
    if (!savedRecess?.start || !savedRecess?.end) return 0

    const start = new Date(savedRecess.start)
    const end = new Date(savedRecess.end)
    const timeDifference = end.getTime() - start.getTime()
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1

    return totalDays > 0 ? totalDays : 0
  }

  // Save recess function
  const saveRecess = () => {
    if (!recessStart || !recessEnd) {
      alert("Por favor, preencha todas as datas do recesso.")
      return
    }

    const startDate = new Date(recessStart)
    const endDate = new Date(recessEnd)

    if (startDate >= endDate) {
      alert("A data de início do recesso deve ser anterior à data de fim.")
      return
    }

    setSavedRecess({
      start: recessStart,
      end: recessEnd,
    })

    alert("Recesso salvo com sucesso!")
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
    
    // Count bridge days (emenda) within academic year period
    let bridgeDaysInAcademicYear = 0
    Object.entries(schoolEvents).forEach(([dateString, eventList]) => {
      const eventDate = new Date(dateString)
      
      // Check if the event date is within the academic year period
      if (eventDate >= startDate && eventDate <= endDate) {
        // Count bridge days (emenda type events)
        const bridgeDays = eventList.filter((event) => event.type === "emenda")
        bridgeDaysInAcademicYear += bridgeDays.length
      }
    })
    
    // Subtract recess days if recess period overlaps with academic year
    let recessDaysInAcademicYear = 0
    if (savedRecess?.start && savedRecess?.end) {
      const recessStart = new Date(savedRecess.start)
      const recessEnd = new Date(savedRecess.end)
      
      // Check if recess period overlaps with academic year
      const overlapStart = new Date(Math.max(startDate.getTime(), recessStart.getTime()))
      const overlapEnd = new Date(Math.min(endDate.getTime(), recessEnd.getTime()))
      
      if (overlapStart <= overlapEnd) {
        const overlapDays = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 3600 * 24)) + 1
        recessDaysInAcademicYear = overlapDays > 0 ? overlapDays : 0
      }
    }
    
    const academicDays = totalDays - holidays - bridgeDaysInAcademicYear - recessDaysInAcademicYear

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

  // Save new event type
  const saveEventType = () => {
    if (!eventTypeForm.name || !eventTypeForm.color) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    // Check if event type name already exists
    const existingType = eventTypes.find(
      (type) => type.label.toLowerCase() === eventTypeForm.name.toLowerCase()
    )
    if (existingType) {
      alert("Já existe um tipo de evento com este nome.")
      return
    }

    const newEventType = {
      id: generateEventTypeId(),
      value: eventTypeForm.name.toLowerCase().replace(/\s+/g, "_"),
      label: eventTypeForm.name,
      color: eventTypeForm.color,
    }

    setEventTypes([...eventTypes, newEventType])
    setEventTypeForm({ name: "", color: "" })
    alert("Tipo de evento cadastrado com sucesso!")
  }

  // Delete event type (only if not in use)
  const deleteEventType = (eventTypeId: string) => {
    // Check if event type is being used
    const isInUse = Object.values(schoolEvents).some((eventList) =>
      eventList.some((event) => {
        const eventType = eventTypes.find((et) => et.id === eventTypeId)
        return eventType && event.type === eventType.value
      })
    )

    if (isInUse) {
      alert("Este tipo de evento está sendo usado em eventos cadastrados e não pode ser excluído.")
      return
    }

    setEventTypes(eventTypes.filter((type) => type.id !== eventTypeId))
    alert("Tipo de evento removido com sucesso!")
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

  const isRecessDay = (day: number) => {
    if (!savedRecess?.start || !savedRecess?.end) return false

    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const date = new Date(dateString)
    const recessStart = new Date(savedRecess.start)
    const recessEnd = new Date(savedRecess.end)

    return date >= recessStart && date <= recessEnd
  }

  const isAcademicDay = (day: number) => {
    if (!savedAcademicYear?.start || !savedAcademicYear?.end) return false

    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const date = new Date(dateString)
    const academicStart = new Date(savedAcademicYear.start)
    const academicEnd = new Date(savedAcademicYear.end)
    const dayOfWeek = date.getDay()

    // Check if it's within academic year period and exclude Sundays (0)
    // Sundays are never academic days
    if (dayOfWeek === 0) return false

    // Check if it's a Saturday marked as non-academic
    if (dayOfWeek === 6) {
      const events = getEventForDate(day)
      const hasNonAcademicSaturday = events.some((event) => event.type === "sabado_nao_letivo")
      if (hasNonAcademicSaturday) return false
    }

    return date >= academicStart && date <= academicEnd
  }

  // Handle day click - opens modal
  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    setSelectedDate(dateString)
    setEventForm({ title: "", type: "", isRecurring: false, recurringYears: 5, makeSaturdayNonAcademic: false })
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

        // If it's a Saturday and makeSaturdayNonAcademic is checked, add special event type
        if (new Date(eventYear, baseMonth, baseDay).getDay() === 6 && eventForm.makeSaturdayNonAcademic) {
          const nonAcademicId = generateUniqueId()
          newEvents[clickedDateString].push({
            id: nonAcademicId,
            title: "Sábado não letivo",
            type: "sabado_nao_letivo",
            displayDate: eventDateString,
            createdAt: new Date().toISOString(),
            isRecurring: true,
            recurringGroup: `recurring_${Date.now()}`,
            recurringYear: eventYear,
          })
        }
      }

      alert(
        `Evento recorrente criado para ${eventForm.recurringYears} anos (${currentYear}-${currentYear + eventForm.recurringYears - 1})`,
      )
    } else {
      // Regular single event logic (existing code)
      const uniqueId = generateUniqueId()
      const clickedDateString = `${year}-${String(month + 1).padStart(2, "00")}-${String(selectedDay).padStart(2, "0")}`
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

      // If it's a Saturday and makeSaturdayNonAcademic is checked, add special event type
      if (new Date(year, month, selectedDay).getDay() === 6 && eventForm.makeSaturdayNonAcademic) {
        const nonAcademicId = generateUniqueId()
        newEvents[clickedDateString].push({
          id: nonAcademicId,
          title: "Sábado não letivo",
          type: "sabado_nao_letivo",
          displayDate: eventDateString,
          createdAt: new Date().toISOString(),
          isRecurring: false,
        })
      }
    }

    setSchoolEvents(newEvents)
    setIsModalOpen(false)
    setEventForm({ title: "", type: "", isRecurring: false, recurringYears: 5, makeSaturdayNonAcademic: false })
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

  // Calculate monthly statistics for current displayed month
  const calculateMonthlyStats = () => {
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    
    let academicDays = 0
    let holidays = 0
    let bridgeDays = 0
    let weekends = 0
    
    // Count each day of the month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month, day)
      const dayOfWeek = currentDate.getDay()
      
      // Count weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++
        continue
      }
      
      // Check if day has events
      const events = getEventForDate(day)
      
      // Check if day has holiday events
      const hasHoliday = events.some((event) => event.type === "feriado")
      
      if (hasHoliday) {
        holidays++
        continue
      }
      
      // Check if day has bridge day events (only events specifically marked as "emenda")
      const hasBridgeEvent = events.some((event) => event.type === "emenda")
      
      if (hasBridgeEvent) {
        bridgeDays++
        continue
      }
      
      // Count as academic day if it's within academic year and not in recess
      // Sundays are automatically excluded by isAcademicDay function
      if (isAcademicDay(day) && !isRecessDay(day)) {
        academicDays++
      }
    }
    
    return { academicDays, holidays, bridgeDays, weekends }
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
                          className="block px-8 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors bg-red-100 font-medium"
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
          <section className="lg:w-[70%] space-y-6">

            <div className="space-y-8">
              <div className="space-y-8">
                {/* Calendar - Takes 3 columns */}
                <div>
                  <Card className="border-red-200 bg-white">

                    {/* Menu Horizontal */}
                    <div className="px-6 py-3 border-b border-red-100 bg-red-600">
                      <div className="flex items-center space-x-1">
                        <div className="relative">
                          <details className="group">
                            <summary className="flex items-center justify-between px-4 py-2 text-white hover:bg-red-700 hover:text-white transition-colors cursor-pointer list-none rounded">
                              <div className="flex items-center">
                                <span>Cadastros</span>
                              </div>
                              <ChevronDown className="h-4 w-4 ml-2 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="absolute top-full left-0 mt-1 bg-white border border-red-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                              <button
                                onClick={() => setIsEventTypeModalOpen(true)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors border-b border-red-100"
                              >
                                Cadastrar Tipos de Eventos
                              </button>
                              <button
                                onClick={() => setIsConfigModalOpen(true)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                              >
                                Configurações
                              </button>
                            </div>
                          </details>
                        </div>
                      </div>
                    </div>



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
    <h3 className="text-lg font-semibold text-red-800">Filtros</h3>

    {/* Comboboxes stacked vertically with labels on the left */}
    <div className="space-y-3">
      {/* Município Combobox */}
      <div className="flex items-center gap-4">
        <Label className="text-red-700 text-sm font-medium w-20">Município</Label>
        <Select value={selectedMunicipality} onValueChange={handleMunicipalityChange}>
          <SelectTrigger className="border-red-200 focus:border-red-500 bg-white flex-1">
            <SelectValue placeholder="Selecione um município" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            {Object.keys(municipalitiesData).filter(key => key !== "Todos").sort().map((municipality) => (
              <SelectItem key={municipality} value={municipality}>
                {municipality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Unidade Combobox */}
      <div className="flex items-center gap-4">
        <Label className="text-red-700 text-sm font-medium w-20">Unidade</Label>
        <Select value={selectedSchool} onValueChange={setSelectedSchool}>
          <SelectTrigger className="border-red-200 focus:border-red-500 bg-white flex-1">
            <SelectValue placeholder="Selecione uma unidade" />
          </SelectTrigger>
          <SelectContent>
            {getAvailableSchools().map((school, index) => (
              <SelectItem key={`${school}-${index}`} value={school}>
                {school}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Turma Combobox */}
      <div className="flex items-center gap-4">
        <Label className="text-red-700 text-sm font-medium w-20">Turma</Label>
        <Select>
          <SelectTrigger className="border-red-200 focus:border-red-500 bg-white flex-1">
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
                        ${day && isAcademicDay(day) && !isRecessDay(day) ? "!bg-green-100 hover:!bg-green-200" : ""}
                        ${day && isRecessDay(day) ? "!bg-orange-100 hover:!bg-orange-200" : ""}
                      `}
                            onClick={() => day && handleDayClick(day)}
                          >
                            {day && (
                              <>
                                <div
                                  className={`
                            text-sm font-medium mb-1
                            ${isToday(day) ? "text-red-700 font-bold" : ""}
                            ${isWeekend(day) || isHoliday(day) ? "text-red-600 font-semibold" : ""}
                            ${isRecessDay(day) ? "text-orange-700 font-semibold" : ""}
                            ${isAcademicDay(day) && !isRecessDay(day) && !isHoliday(day) && !isWeekend(day) ? "text-green-700 font-semibold" : ""}
                            ${!isToday(day) && !isWeekend(day) && !isHoliday(day) && !isRecessDay(day) && !isAcademicDay(day) ? "text-gray-700" : ""}
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

                      {/* Monthly Summary */}
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-blue-800 text-sm font-medium mb-3">
                          Resumo de {monthNames[month]} {year}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span className="text-blue-700">
                              <strong>{calculateMonthlyStats().academicDays}</strong> dias letivos
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded"></div>
                            <span className="text-blue-700">
                              <strong>{calculateMonthlyStats().holidays}</strong> feriados
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            <span className="text-blue-700">
                              <strong>{calculateMonthlyStats().bridgeDays}</strong> emendas
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-gray-400 rounded"></div>
                            <span className="text-blue-700">
                              <strong>{calculateMonthlyStats().weekends}</strong> dias de fim de semana
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tooltips - Legenda e Resumo Escolar */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Legenda */}
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="text-red-800 text-sm font-medium mb-3">Legenda</h4>
                          <div className="space-y-2">
                            {/* Event Types */}
                            {eventTypes.length === 0 ? (
                              <div className="text-center py-2">
                                <p className="text-xs text-gray-500 mb-1">Nenhum tipo de evento cadastrado</p>
                                <p className="text-xs text-red-600">
                                  Cadastre em "Cadastros" → "Cadastrar Tipos de Eventos"
                                </p>
                              </div>
                            ) : (
                              <>
                                {eventTypes.map((eventType) => (
                                  <div key={eventType.value} className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 ${eventType.color} rounded`}></div>
                                    <span className="text-xs text-red-700">{eventType.label}</span>
                                  </div>
                                ))}
                                <div className="border-t border-gray-300 pt-2 mt-2"></div>
                              </>
                            )}
                            
                            {/* System Legend Items */}
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                              <span className="text-xs text-red-700">Fins de Semana e Feriados</span>
                            </div>
                            {savedAcademicYear && (
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                                <span className="text-xs text-red-700">Período Letivo</span>
                              </div>
                            )}
                            {savedRecess && (
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded"></div>
                                <span className="text-xs text-red-700">Período de Recesso</span>
                              </div>
                            )}
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

                            {/* Recess info - only show if recess is configured */}
                            {savedRecess && (
                              <div className="border-t border-gray-200 pt-3 mt-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <CalendarIcon className="h-4 w-4 text-orange-600" />
                                    <span className="text-xs text-red-700">Dias de Recesso</span>
                                  </div>
                                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                    {calculateRecessDays()} dias
                                  </Badge>
                                </div>
                              </div>
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
                          if (savedRecess) count++
                          return count
                        })()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {!savedAcademicYear && !savedRecess ? (
                        <div className="text-center py-8">
                          <Settings className="h-12 w-12 text-red-300 mx-auto mb-4" />
                          <p className="text-red-600 font-medium mb-2">Nenhuma configuração salva</p>
                          <p className="text-red-500 text-sm">
                            Clique no botão "Configurações" para definir o ano letivo e recesso
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

                          {/* Recess Configuration */}
                          {savedRecess && (
                            <div className="flex items-center justify-between p-3 border border-red-100 rounded-lg hover:bg-red-50 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-orange-500 rounded flex-shrink-0"></div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-red-800">Período de Recesso</div>
                                  <div className="text-xs text-red-600">
                                    {new Date(savedRecess.start).toLocaleDateString("pt-BR")} a{" "}
                                    {new Date(savedRecess.end).toLocaleDateString("pt-BR")}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {calculateRecessDays()} dias de recesso
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSavedRecess(null)
                                  setRecessStart("")
                                  setRecessEnd("")
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
              <span>Configurações - Ano letivo e recesso</span>
            </DialogTitle>
            <div className="text-red-600 text-sm">Configuração do ano letivo e período de recesso</div>
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

              {/* Recess Period Subsection */}
              <div className="border-b border-red-100 pb-6">
                <h4 className="text-red-800 font-medium mb-4 flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Período de recesso</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="recessStart" className="text-red-700 text-sm">
                      Data de início *
                    </Label>
                    <Input
                      id="recessStart"
                      type="date"
                      value={recessStart}
                      onChange={(e) => setRecessStart(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recessEnd" className="text-red-700 text-sm">
                      Data de fim *
                    </Label>
                    <Input
                      id="recessEnd"
                      type="date"
                      value={recessEnd}
                      onChange={(e) => setRecessEnd(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                    />
                  </div>

                  <Button onClick={saveRecess} className="bg-red-600 hover:bg-red-700 text-white">
                    Salvar Recesso
                  </Button>
                </div>

                {savedRecess && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-orange-800 font-medium text-sm">Recesso configurado</span>
                    </div>
                    <div className="text-orange-700 text-sm space-y-1">
                      <div>
                        <strong>Início:</strong> {new Date(savedRecess.start).toLocaleDateString("pt-BR")}
                      </div>
                      <div>
                        <strong>Fim:</strong> {new Date(savedRecess.end).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="pt-1 border-t border-orange-300">
                        <strong>Total de dias:</strong> {calculateRecessDays()} dias
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Dica:</strong> Configure o período do ano letivo e o recesso para visualizar no calendário
                  os dias letivos e os dias de recesso. Os feriados cadastrados são automaticamente subtraídos do total 
                  de dias letivos. Os dias de recesso aparecem destacados em laranja no calendário.
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
            <Button onClick={saveEvent} className="bg-red-600 hover:bg-red-700 text-white">
              Salvar
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
                  <SelectValue placeholder={eventTypes.length === 0 ? "Nenhum tipo de evento cadastrado" : "Selecione o tipo"} />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-500 text-center">
                      Nenhum tipo de evento cadastrado.
                      <br />
                      Clique em "Cadastros" → "Cadastrar Tipos de Eventos"
                    </div>
                  ) : (
                    eventTypes.map((eventType) => (
                      <SelectItem key={eventType.value} value={eventType.value}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 ${eventType.color} rounded`}></div>
                          <span>{eventType.label}</span>
                        </div>
                      </SelectItem>
                    ))
                  )}
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

            {/* Saturday Non-Academic Option - only show for Saturdays */}
            {selectedDay && new Date(year, month, selectedDay).getDay() === 6 && (
              <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="makeSaturdayNonAcademic"
                    checked={eventForm.makeSaturdayNonAcademic}
                    onChange={(e) => setEventForm({ ...eventForm, makeSaturdayNonAcademic: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <Label htmlFor="makeSaturdayNonAcademic" className="text-blue-800 font-medium">
                    Tornar este sábado não letivo
                  </Label>
                </div>
                <p className="text-xs text-blue-700 ml-6">
                  Marque esta opção se este sábado não deve contar como dia letivo, mesmo estando dentro do período letivo.
                </p>
              </div>
            )}

            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              <strong>ℹ️ Informação:</strong> Um ID único será gerado automaticamente para este evento. Domingos nunca contam como dias letivos.
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

      {/* Modal for event type registration */}
      <Dialog open={isEventTypeModalOpen} onOpenChange={setIsEventTypeModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-red-800 flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Cadastrar Tipo de Evento</span>
            </DialogTitle>
            <p className="text-sm text-red-600">
              Crie tipos de eventos personalizados com nome e cor
            </p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Form Section */}
            <div className="space-y-4 border-b border-red-100 pb-6">
              <div className="space-y-2">
                <Label htmlFor="eventTypeName" className="text-red-700">
                  Nome do Tipo de Evento *
                </Label>
                <Input
                  id="eventTypeName"
                  value={eventTypeForm.name}
                  onChange={(e) => setEventTypeForm({ ...eventTypeForm, name: e.target.value })}
                  placeholder="Ex: Feriado, Reunião, Avaliação..."
                  className="border-red-200 focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventTypeColor" className="text-red-700">
                  Cor do Tipo de Evento *
                </Label>
                <Select value={eventTypeForm.color} onValueChange={(value) => setEventTypeForm({ ...eventTypeForm, color: value })}>
                  <SelectTrigger className="border-red-200 focus:border-red-500">
                    <SelectValue placeholder="Selecione uma cor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 ${color.color} rounded`}></div>
                          <span>{color.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preview */}
              {eventTypeForm.name && eventTypeForm.color && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <Label className="text-red-700 text-sm">Pré-visualização:</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className={`w-4 h-4 ${eventTypeForm.color} rounded`}></div>
                    <span className="text-sm font-medium text-red-800">{eventTypeForm.name}</span>
                  </div>
                </div>
              )}

              {/* Cadastrar Button */}
              <div className="flex justify-end">
                <Button onClick={saveEventType} className="bg-red-600 hover:bg-red-700 text-white">
                  Cadastrar
                </Button>
              </div>
            </div>

            {/* List of Registered Event Types */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-red-800 font-medium">Tipos de Eventos Cadastrados</h4>
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  {eventTypes.length}
                </Badge>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {eventTypes.length === 0 ? (
                  <div className="text-center py-8">
                    <Plus className="h-8 w-8 text-red-300 mx-auto mb-2" />
                    <p className="text-red-600 font-medium mb-1">Nenhum tipo de evento cadastrado</p>
                    <p className="text-red-500 text-sm">
                      Preencha o formulário acima para criar seu primeiro tipo
                    </p>
                  </div>
                ) : (
                  eventTypes.map((eventType) => (
                    <div
                      key={eventType.id}
                      className="flex items-center justify-between p-3 border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 ${eventType.color} rounded flex-shrink-0`}></div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-red-800 truncate">{eventType.label}</div>
                          <div className="text-xs text-gray-500 mt-1">ID: {eventType.id}</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteEventType(eventType.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-100 border-red-300 flex-shrink-0"
                        title={`Remover tipo de evento (ID: ${eventType.id})`}
                      >
                        Remover
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEventTypeModalOpen(false)
                setEventTypeForm({ name: "", color: "" })
              }}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Fechar
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