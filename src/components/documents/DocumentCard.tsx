
import React from 'react';
import { format } from 'date-fns';
import { FileText, Clock, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Document } from '@/utils/documentData';
import { Badge } from '@/components/ui/badge';

interface DocumentCardProps {
  document: Document;
  onClick: () => void;
}

const DocumentCard = ({ document, onClick }: DocumentCardProps) => {
  const categoryColors = {
    'Consent': 'bg-blue-100 text-blue-800',
    'Treatment': 'bg-green-100 text-green-800',
    'Medical': 'bg-red-100 text-red-800',
    'Financial': 'bg-amber-100 text-amber-800',
    'Other': 'bg-gray-100 text-gray-800',
  };
  
  const formattedDate = format(new Date(document.updatedAt), 'MMM d, yyyy');
  
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-lg mr-3">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium line-clamp-1">{document.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{document.description}</p>
            </div>
          </div>
          <Badge className={categoryColors[document.category]}>
            {document.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 border-t border-gray-50">
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          {document.assignedPatientName && (
            <div className="flex items-center text-gray-500">
              <User className="h-4 w-4 mr-1" />
              <span>{document.assignedPatientName}</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
