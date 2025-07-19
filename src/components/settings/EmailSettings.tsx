import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const emailSettingsSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" }),
  smtpServer: z.string().min(1, { message: "Le serveur SMTP est requis" }),
  smtpPort: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Le port doit être un nombre valide",
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
      title: "Paramètres enregistrés",
      description: `La configuration pour ${data.email} a été enregistrée.`,
    });
  };
  
  const handleTestConnection = () => {
    setTestingConnection(true);
    const values = form.getValues();
    
    // Simule le test de connexion
    setTimeout(() => {
      setTestingConnection(false);
      if (values.email && values.password && values.smtpServer) {
        toast({
          title: "Connexion réussie",
          description: "Le test de connexion au serveur email a réussi.",
        });
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Veuillez remplir tous les champs requis.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration de l'email</CardTitle>
        <CardDescription>
          Configurez vos paramètres email pour envoyer des documents aux patients.
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
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input placeholder="votre.email@example.com" {...field} />
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
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    Pour Gmail, vous devrez peut-être utiliser un mot de passe d'application.
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
                    <FormLabel>Serveur SMTP</FormLabel>
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
                    <FormLabel>Port SMTP</FormLabel>
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
                {testingConnection ? "Test en cours..." : "Tester la connexion"}
              </Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmailSettings;
