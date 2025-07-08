import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { User } from "lucide-react"
import { cookies } from "@/lib/utils"
import { useNavigate } from "react-router"

export function SiteHeader() {
    const navigate = useNavigate()

    const handleLogout = () => {
        cookies.deleteCookie(import.meta.env.VITE_API_COOKIES_AUTH)
        navigate('/')

    }


    return (
        <header className="flex bg-white z-[100] sticky top-0 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 lg:gap-2">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-2">
                <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex text-brand-100 cursor-pointer hover:text-brand-100  hover:bg-transparent">
                    <User className="!h-6 !w-6" />
                    <span className="text-brand-100">User</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 mr-3 mt-2  text-brand-100 ">
                    <div className="flex flex-col items-start gap-2">
                    <div>
                        <span className="font-semibold text-lg">User</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleLogout}>
                        Logout
                    </Button>
                    </div>
                </PopoverContent>
                </Popover>
            </div>
            </div>
        </header>
    )
}
