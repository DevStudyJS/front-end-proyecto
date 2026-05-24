import DashboardShell from '@/app/components/Dashboard/DashboardShell'
import TiendaVisual from "@/app/components/Dashboard/Tienda/Tienda"

export default function shopPage() {
  return (
    <DashboardShell>
      <TiendaVisual />
    </DashboardShell>
  )
}
