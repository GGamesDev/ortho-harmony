
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const emailSettingsSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  smtpServer: z.string().min(1, { message: "SMTP server is required" }),
  smtpPort: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Port must be a valid number",
  }),
});

type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

const EmailSettings = () => {
  const { toast } = useToast();
  const [testingConnection, setTestingConnection] = useState(false);
  
  const defaultValues: EmailSettingsFormValues = {
    email: "",
    password: "",
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
  };
  
  const form = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues,
  });

  const onSubmit = (data: EmailSettingsFormValues) => {
    console.log(data);
    toast({
      title: "Email settings saved",
      description: `Email configuration for ${data.email} has been saved.`,
    });
  };
  
  const handleTestConnection = () => {
    setTestingConnection(true);
    const values = form.getValues();
    
    // Simulate testing connection
    setTimeout(() => {
      setTestingConnection(false);
      if (values.email && values.password && values.smtpServer) {
        toast({
          title: "Connection successful",
          description: "Email server connection test passed successfully.",
        });
      } else {
        toast({
          title: "Connection failed",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>
          Configure your email settings for sending documents to patients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    For Gmail, you may need to use an app password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="smtpServer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Server</FormLabel>
                    <FormControl>
                      <Input placeholder="smtp.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="smtpPort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Port</FormLabel>
                    <FormControl>
                      <Input placeholder="587" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex items-center justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleTestConnection}
                disabled={testingConnection}
              >
                {testingConnection ? "Testing..." : "Test Connection"}
              </Button>
              <Button type="submit">Save Settings</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmailSettings;
