
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmailSettings from '@/components/settings/EmailSettings';
import ContactsSettings from '@/components/settings/ContactsSettings';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("email");

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar activePage="settings" />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
              
              <div className="bg-white rounded-lg shadow p-6">
                <Tabs 
                  defaultValue="email" 
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value)}
                  className="w-full"
                >
                  <TabsList className="mb-6 bg-gray-100">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="email">
                    <EmailSettings />
                  </TabsContent>
                  <TabsContent value="contacts">
                    <ContactsSettings />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Settings;
