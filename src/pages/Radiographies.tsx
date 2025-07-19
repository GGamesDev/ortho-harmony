import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/layout/AppSidebar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Camera, Search } from 'lucide-react';
import { patients } from '@/utils/dummyData';

interface Radiography {
  id: string;
  patientId: string;
  date: string;
  type: string;
  imageUrl: string;
  notes: string;
}

const radiographies: Radiography[] = [
  {
    id: '1',
    patientId: '1',
    date: '2023-06-15',
    type: 'Panoramique',
    imageUrl: '/placeholder.svg',
    notes: 'Vue panoramique complète montrant un excellent alignement après traitement.'
  },
  {
    id: '2',
    patientId: '2',
    date: '2023-07-20',
    type: 'Céphalométrique',
    imageUrl: '/placeholder.svg',
    notes: 'Radiographie céphalométrique latérale pour évaluation orthodontique.'
  },
  {
    id: '3',
    patientId: '3',
    date: '2023-08-05',
    type: 'Périapicale',
    imageUrl: '/placeholder.svg',
    notes: 'Radiographie périapicale de la dent #30 montrant un remplissage complet du canal.'
  },
  {
    id: '4',
    patientId: '1',
    date: '2023-09-12',
    type: 'Aile à aile',
    imageUrl: '/placeholder.svg',
    notes: 'Radiographies bitewing ne montrant aucune carie interproximale.'
  },
  {
    id: '5',
    patientId: '4',
    date: '2023-10-18',
    type: 'CBCT',
    imageUrl: '/placeholder.svg',
    notes: 'Cone Beam CT pour planification d’implant dans le quadrant supérieur droit.'
  }
];

const Radiographies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<Radiography | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredRadiographies = radiographies.filter(rad => 
    rad.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patients.find(p => p.id === rad.patientId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewImage = (radiography: Radiography) => {
    setSelectedImage(radiography);
    setIsViewDialogOpen(true);
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Patient inconnu';
  };

  const handleLaunchRadiography = () => {
    navigate('/start-radiography');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar activePage="radiographies" />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Radiographies</h1>
                <Button onClick={handleLaunchRadiography}>
                  <Camera className="mr-2 h-4 w-4" />
                  Lancer une radiographie
                </Button>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Rechercher par type ou nom du patient..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dossiers radiographiques</CardTitle>
                  <CardDescription>
                    Parcourez et gérez les images radiographiques des patients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRadiographies.length > 0 ? (
                        filteredRadiographies.map((rad) => (
                          <TableRow key={rad.id}>
                            <TableCell>{rad.date}</TableCell>
                            <TableCell>{getPatientName(rad.patientId)}</TableCell>
                            <TableCell>{rad.type}</TableCell>
                            <TableCell className="max-w-xs truncate">{rad.notes}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewImage(rad)}
                              >
                                Voir
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            Aucune radiographie trouvée
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Radiographie {selectedImage?.type} - {getPatientName(selectedImage?.patientId || '')}
            </DialogTitle>
            <DialogDescription>
              Prise le {selectedImage?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img
              src={selectedImage?.imageUrl}
              alt={`Radiographie ${selectedImage?.type}`}
              className="w-full h-64 object-contain bg-gray-100 rounded-md"
            />
            <p className="mt-4 text-sm text-gray-700">{selectedImage?.notes}</p>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Télécharger
              </Button>
              <Button variant="outline" size="sm">
                Imprimer
              </Button>
              <Button variant="outline" size="sm">
                Partager
              </Button>
            </div>
            <Button variant="default" onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Radiographies;
