import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  ClipboardList,
  Settings,
  FileText,
  FileImage,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils"; // ou clsx/classnames selon ton setup

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activePage: string;
}

export function AppSidebar({ activePage }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const menuItems = [
    {
      title: "Tableau de bord",
      href: "/",
      icon: Home,
      active: activePage === "dashboard",
    },
    {
      title: "Patients",
      href: "/patients",
      icon: Users,
      active: activePage === "patients",
    },
    {
      title: "Rendez-vous",
      href: "/appointments",
      icon: Calendar,
      active: activePage === "appointments",
    },
    {
      title: "Plans de traitement",
      href: "/treatments",
      icon: ClipboardList,
      active: activePage === "treatments",
    },
    {
      title: "Documents",
      href: "/documents",
      icon: FileText,
      active: activePage === "documents",
    },
    {
      title: "Radiographies",
      href: "/radiographies",
      icon: FileImage,
      active: activePage === "radiographies",
    },
  ];

  return (
    <Sidebar
      className={cn(
        "bg-white border-r shadow-md min-h-screen flex flex-col justify-between transition-all",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <SidebarHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          {isOpen && (
            <h2 className="text-xl font-bold text-ortho-primary">OrthoBE</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 text-ortho-primary hover:text-ortho-dark ml-auto"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 px-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={cn(
                "flex",
                isOpen ? "justify-start" : "justify-center"
              )}
            >
              <SidebarMenuButton
                asChild
                isActive={item.active}
                tooltip={item.title}
                className={cn(
                  "group flex items-center gap-3 px-4 py-2 rounded-xl transition-colors hover:bg-ortho-light/70 text-sm font-medium",
                  item.active
                    ? "bg-ortho-primary text-white shadow"
                    : "text-gray-700 hover:text-ortho-primary"
                )}
              >
                <Link to={item.href}>
                  <item.icon
                    className={cn(
                      isOpen ? "h-5 w-5" : "h-6 w-6",
                      item.active
                        ? "text-white"
                        : "text-ortho-primary group-hover:text-ortho-primary"
                    )}
                  />
                  {isOpen && (
                    <span className="whitespace-nowrap">{item.title}</span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem
            className={cn(
              "flex",
              isOpen ? "justify-start" : "justify-center"
            )}
          >
            <SidebarMenuButton
              asChild
              isActive={activePage === "settings"}
              tooltip="Paramètres"
              className={cn(
                "group flex items-center gap-3 px-4 py-2 rounded-xl transition-colors hover:bg-ortho-light/70 text-sm font-medium",
                activePage === "settings"
                  ? "bg-ortho-primary text-white shadow"
                  : "text-gray-700 hover:text-ortho-primary"
              )}
            >
              <Link to="/settings">
                <Settings
                  className={cn(
                    isOpen ? "h-5 w-5" : "h-6 w-6",
                    activePage === "settings"
                      ? "text-white"
                      : "text-ortho-primary group-hover:text-ortho-primary"
                  )}
                />
                {isOpen && (
                  <span className="whitespace-nowrap">Paramètres</span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
