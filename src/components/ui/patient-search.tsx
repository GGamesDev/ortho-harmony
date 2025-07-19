import React, { useState, useEffect, useRef } from 'react';
import { Search, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { patients } from '@/utils/dummyData';
import { cn } from '@/lib/utils';

interface PatientSearchProps {
  value: string;
  onChange: (patientId: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
}

const PatientSearch = ({ 
  value, 
  onChange, 
  placeholder = "Search patients...", 
  label = "Patient",
  id = "patient-search",
  className 
}: PatientSearchProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedPatient = patients.find(p => p.id === value);
  
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(query.toLowerCase()) ||
    patient.email.toLowerCase().includes(query.toLowerCase()) ||
    patient.phone.includes(query)
  );

  useEffect(() => {
    if (selectedPatient && !isOpen) {
      setQuery(selectedPatient.name);
    }
  }, [selectedPatient, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (selectedPatient) {
          setQuery(selectedPatient.name);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedPatient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsOpen(true);
    setHighlightedIndex(-1);
    
    if (!newQuery && value) {
      onChange('');
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (selectedPatient) {
      setQuery('');
    }
  };

  const handlePatientSelect = (patient: typeof patients[0]) => {
    onChange(patient.id);
    setQuery(patient.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredPatients.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredPatients[highlightedIndex]) {
          handlePatientSelect(filteredPatients[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        if (selectedPatient) {
          setQuery(selectedPatient.name);
        }
        break;
    }
  };

  return (
    <div className={cn("space-y-2", className)} ref={containerRef}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            id={id}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            className="pl-10"
            autoComplete="off"
          />
          {selectedPatient && (
            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
          )}
        </div>
        
        {isOpen && filteredPatients.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredPatients.map((patient, index) => (
              <div
                key={patient.id}
                className={cn(
                  "px-4 py-3 cursor-pointer flex items-center justify-between hover:bg-accent",
                  highlightedIndex === index && "bg-accent",
                  value === patient.id && "bg-accent"
                )}
                onClick={() => handlePatientSelect(patient)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{patient.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {patient.email} • {patient.phone}
                  </span>
                </div>
                {value === patient.id && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        )}
        
        {isOpen && filteredPatients.length === 0 && query && (
          <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg p-4 text-center text-muted-foreground">
            No patients found matching "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSearch;