
export interface Document {
  id: string;
  title: string;
  category: 'Consent' | 'Treatment' | 'Medical' | 'Financial' | 'Other';
  description: string;
  createdAt: string;
  updatedAt: string;
  assignedPatientId?: string;
  assignedPatientName?: string;
}

export const documents: Document[] = [
  {
    id: "doc-1",
    title: "Patient Consent Form",
    category: "Consent",
    description: "Standard patient consent for orthodontic treatment",
    createdAt: "2023-10-15T09:30:00Z",
    updatedAt: "2023-10-15T09:30:00Z",
  },
  {
    id: "doc-2",
    title: "Treatment Agreement",
    category: "Treatment",
    description: "Detailed treatment plan and agreement",
    createdAt: "2023-10-12T14:20:00Z",
    updatedAt: "2023-10-14T16:45:00Z",
  },
  {
    id: "doc-3",
    title: "Medical History Form",
    category: "Medical",
    description: "Patient medical history and current medications",
    createdAt: "2023-10-05T11:15:00Z",
    updatedAt: "2023-10-05T11:15:00Z",
  },
  {
    id: "doc-4",
    title: "Insurance Claim Form",
    category: "Financial",
    description: "Form for insurance reimbursement",
    createdAt: "2023-09-28T10:00:00Z",
    updatedAt: "2023-10-10T09:20:00Z",
  },
  {
    id: "doc-5",
    title: "Payment Agreement",
    category: "Financial",
    description: "Monthly payment plan agreement",
    createdAt: "2023-09-20T13:40:00Z",
    updatedAt: "2023-09-20T13:40:00Z",
  },
  {
    id: "doc-6",
    title: "Post-Treatment Care",
    category: "Treatment",
    description: "Instructions for care after treatment",
    createdAt: "2023-09-15T15:30:00Z",
    updatedAt: "2023-09-18T11:20:00Z",
  },
  {
    id: "doc-7",
    title: "X-Ray Consent",
    category: "Consent",
    description: "Consent for taking X-ray images",
    createdAt: "2023-09-10T10:15:00Z",
    updatedAt: "2023-09-10T10:15:00Z",
  },
  {
    id: "doc-8",
    title: "HIPAA Privacy Form",
    category: "Consent",
    description: "Patient privacy agreement",
    createdAt: "2023-09-05T09:00:00Z",
    updatedAt: "2023-09-05T09:00:00Z",
  }
];
