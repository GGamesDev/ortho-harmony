
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

// Define the Contact interface
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "doctor" | "staff" | "supplier" | "other";
}

const ContactsSettings = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: "Dr. Smith", email: "dr.smith@example.com", phone: "123-456-7890", type: "doctor" },
    { id: '2', name: "Jane Doe", email: "jane.doe@example.com", phone: "234-567-8901", type: "staff" },
    { id: '3', name: "Dental Supplies Co", email: "orders@dentalsupplies.com", phone: "345-678-9012", type: "supplier" }
  ]);
  const [newContact, setNewContact] = useState<Contact>({
    id: '',
    name: '',
    email: '',
    phone: '',
    type: "other"
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and email for the contact.",
        variant: "destructive"
      });
      return;
    }

    const contactWithId = {
      ...newContact,
      id: Date.now().toString()
    };
    
    setContacts([...contacts, contactWithId]);
    setNewContact({
      id: '',
      name: '',
      email: '',
      phone: '',
      type: "other"
    });
    
    toast({
      title: "Contact added",
      description: `${contactWithId.name} has been added to your contacts.`
    });
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || contact.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add New Contact</h3>
        <div className="grid gap-4 mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Contact name" 
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={newContact.type}
                onValueChange={(value: any) => setNewContact({...newContact, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="email@example.com" 
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                placeholder="Phone number" 
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
            </div>
          </div>
          
          <Button onClick={handleAddContact}>Add Contact</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Manage Contacts</h3>
        <div className="grid gap-4 mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input 
              placeholder="Search contacts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select 
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All contacts</SelectItem>
                <SelectItem value="doctor">Doctors</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="supplier">Suppliers</SelectItem>
                <SelectItem value="other">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-md">
            {filteredContacts.length > 0 ? (
              <div className="divide-y">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <div className="text-sm text-gray-500">
                        <p>{contact.email}</p>
                        <p>{contact.phone}</p>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 mt-1">
                          {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">No contacts found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsSettings;
