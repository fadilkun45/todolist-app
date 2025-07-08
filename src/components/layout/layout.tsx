import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/appSidebar"
import { SiteHeader } from "./navbar"
import loadingStore from "@/store/LoadingStore"
import Loading from "../utilities/loading"
import { useEffect } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const isLoading = loadingStore((state) => state.isLoading)
  const setLoading = loadingStore((state) => state.setLoading)

  useEffect(() => {
    setLoading(false)
  },[])


  return (
    <SidebarProvider>
      <AppSidebar />
      {
        isLoading && <Loading />
      }
      <main className="w-full min-h-screen flex flex-col bg-slate-50">
        <SiteHeader />
        <div className="px-4 py-3">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}