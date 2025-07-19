import { 
  Home, 
  Users, 
  Calendar, 
  ClipboardList, 
  Settings,
  FileText,
  FileImage
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
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
<Sidebar className="bg-white border-r shadow-md w-64 min-h-screen flex flex-col justify-between rounded-r-2xl">
  <SidebarHeader className="pb-0 border-b px-4 py-3">
    <h2 className="text-xl font-bold text-ortho-primary">OrthoBE</h2>
  </SidebarHeader>

  <SidebarContent className="flex-1 px-2">
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.active}
            tooltip={item.title}
            className={cn(
              "group flex items-center gap-3 px-4 py-2 rounded-xl transition-all hover:bg-ortho-light/70 text-sm font-medium",
              item.active
                ? "bg-ortho-primary text-white shadow"
                : "text-gray-700 hover:text-ortho-primary"
            )}
          >
            <Link to={item.href}>
              <item.icon
                className={cn(
                  "h-5 w-5",
                  item.active
                    ? "text-white"
                    : "text-ortho-primary group-hover:text-ortho-primary"
                )}
              />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarContent>

  <SidebarFooter className="border-t px-2 py-3">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={activePage === "settings"}
          tooltip="Paramètres"
          className={cn(
            "group flex items-center gap-3 px-4 py-2 rounded-xl transition-all hover:bg-ortho-light/70 text-sm font-medium",
            activePage === "settings"
              ? "bg-ortho-primary text-white shadow"
              : "text-gray-700 hover:text-ortho-primary"
          )}
        >
          <Link to="/settings">
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>
  );
}
