
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Trash2, UserPlus, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'doctor' | 'staff' | 'supplier' | 'other';
}

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  type: z.enum(['doctor', 'staff', 'supplier', 'other']),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactsSettings = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Dr. John Smith', email: 'john.smith@example.com', phone: '+1 234 567 890', type: 'doctor' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', type: 'staff' },
    { id: '3', name: 'Medical Supplies Inc.', email: 'orders@medsupplies.com', phone: '+1 987 654 321', type: 'supplier' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'other',
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...data,
    };
    
    setContacts([...contacts, newContact]);
    setDialogOpen(false);
    form.reset();
    toast({
      title: "Contact added",
      description: `${newContact.name} has been added to your contacts.`,
    });
  };
  
  const handleDelete = (id: string) => {
    const contactToDelete = contacts.find(contact => contact.id === id);
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact deleted",
      description: `${contactToDelete?.name} has been removed from your contacts.`,
    });
  };
  
  const filteredContacts = contacts.filter(contact => {
    const matchesQuery = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === null || contact.type === filterType;
    
    return matchesQuery && matchesType;
  });
  
  const contactTypeColors: Record<string, string> = {
    doctor: 'bg-blue-100 text-blue-800',
    staff: 'bg-green-100 text-green-800',
    supplier: 'bg-purple-100 text-purple-800',
    other: 'bg-gray-100 text-gray-800',
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacts Management</CardTitle>
        <CardDescription>
          Manage your contacts for quick access when sending documents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {['doctor', 'staff', 'supplier', 'other'].map((type) => (
                <Badge 
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'} 
                  onClick={() => setFilterType(filterType === type ? null : type)}
                  className="cursor-pointer capitalize"
                >
                  {type}
                </Badge>
              ))}
            </div>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Add Contact</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                  <DialogDescription>
                    Add a new contact to your list. Fill in the details below.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Type</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                            >
                              <option value="doctor">Doctor</option>
                              <option value="staff">Staff</option>
                              <option value="supplier">Supplier</option>
                              <option value="other">Other</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter className="mt-6">
                      <Button type="submit">Add Contact</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No contacts found matching your search.</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div 
                key={contact.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{contact.name}</h4>
                    <Badge className={`${contactTypeColors[contact.type]} capitalize`}>
                      {contact.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Mail className="h-3.5 w-3.5 mr-2" />
                    <span>{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Phone className="h-3.5 w-3.5 mr-2" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(contact.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsSettings;
