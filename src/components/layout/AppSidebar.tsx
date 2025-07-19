import { 
  Home, 
  Users, 
  Calendar, 
  ClipboardList, 
  Settings,
  FileText,
  FileImage
} from 'lucide-react';
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
    <Sidebar>
      <SidebarHeader className="pb-0">
        <div className="px-2 py-2">
          <h2 className="text-lg font-semibold text-ortho-primary">OrthoBE</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.active}
                tooltip={item.title} // tooltip en français aussi
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activePage === "settings"}
              tooltip="Paramètres"
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
