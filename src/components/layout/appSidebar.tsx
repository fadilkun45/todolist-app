import { ChevronRightIcon, Grid2X2 } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenuSubButton, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import type { NavbarMenu } from "@/interface/rbac/menu"


export function AppSidebar() {
    const [menu, setMenu] = useState<NavbarMenu[]>()

    useEffect(() => {
        setMenu([{ title: "Dashboard", url: "/dashboard", items: [] }])
    }, [])


    return (
        <Sidebar collapsible="icon" >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel >
                        <p>Todo</p>
                        <span>T</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menu?.map((item) =>
                                item.items.length !== 0 ? (
                                    <Collapsible
                                        key={item.title}
                                        asChild
                                        defaultOpen={item.isActive}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton size="lg" tooltip={item.title}>
                                                    <Grid2X2 />
                                                    <span className="flex justify-between w-full cursor-pointer">{item.title}                                                     <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /></span>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item?.items.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton isActive={location.pathname === subItem.url} asChild>
                                                                <Link to={subItem.url ?? "#"}>
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem key={item.title} >
                                        <SidebarMenuButton isActive={location.pathname === item.url} size="lg" tooltip={item.title} className="data-[slot=sidebar-menu-button]:!p-1.5" asChild>
                                            <Link to={item.url ?? "#"}>
                                                <Grid2X2 />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}