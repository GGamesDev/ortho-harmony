
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search as SearchIcon, 
  Filter, 
  FilePlus, 
  FileText 
} from 'lucide-react';
import { documents as initialDocuments, Document } from '@/utils/documentData';
import DocumentCard from '@/components/documents/DocumentCard';
import DocumentDetailsDialog from '@/components/documents/DocumentDetailsDialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleOpenDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  
  const handleAssignPatient = (documentId: string, patientId: string, patientName: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === documentId 
          ? { ...doc, assignedPatientId: patientId, assignedPatientName: patientName }
          : doc
      )
    );
    
    if (selectedDocument && selectedDocument.id === documentId) {
      setSelectedDocument({
        ...selectedDocument,
        assignedPatientId: patientId,
        assignedPatientName: patientName
      });
    }
  };
  
  const filteredDocuments = documents
    .filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(doc => !categoryFilter || doc.category === categoryFilter);
  
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    const dateA = new Date(sortOrder === 'newest' ? a.updatedAt : a.createdAt).getTime();
    const dateB = new Date(sortOrder === 'newest' ? b.updatedAt : b.createdAt).getTime();
    return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA;
  });
  
  const categories = ['Consent', 'Treatment', 'Medical', 'Financial', 'Other'];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activePage="documents" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
                <p className="text-gray-600">Manage and share patient documents</p>
              </div>
              
              <Button className="bg-ortho-primary hover:bg-ortho-primary/90">
                <FilePlus className="mr-2 h-4 w-4" />
                Add New Document
              </Button>
            </div>
            
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents by title or description..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {categories.map(category => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={categoryFilter === category}
                        onCheckedChange={() => 
                          setCategoryFilter(categoryFilter === category ? '' : category)
                        }
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {sortedDocuments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <FileText className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No documents found</h3>
                <p className="mt-1 text-gray-500">
                  {searchQuery || categoryFilter ? 
                    'Try adjusting your search or filter criteria.' : 
                    'Get started by adding a new document.'}
                </p>
                <div className="mt-6">
                  <Button>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Add New Document
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedDocuments.map((document) => (
                  <DocumentCard 
                    key={document.id} 
                    document={document}
                    onClick={() => handleOpenDocument(document)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <DocumentDetailsDialog 
        document={selectedDocument}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAssignPatient={handleAssignPatient}
      />
    </div>
  );
};

export default Documents;
