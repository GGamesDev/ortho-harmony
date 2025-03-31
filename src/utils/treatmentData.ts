
export interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  date?: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  status: string;
  startDate: string;
  estimatedEndDate: string;
  progress: number;
  duration: number;
  nextAppointment: string;
  notes: string;
  milestones?: Milestone[];
}

// Dummy treatment data
export const treatments: Treatment[] = [
  {
    id: "T001",
    patientId: "P001",
    patientName: "Sarah Johnson",
    type: "Braces",
    status: "In Progress",
    startDate: "Feb 15, 2023",
    estimatedEndDate: "Aug 15, 2024",
    progress: 65,
    duration: 18,
    nextAppointment: "Jun 15, 2023",
    notes: "Patient is responding well to treatment. Elastic bands to be worn at night for better results.",
    milestones: [
      {
        title: "Initial Fitting",
        description: "Installation of braces and adjustments",
        completed: true,
        date: "Feb 15, 2023"
      },
      {
        title: "First Adjustment",
        description: "Tightening of braces and progress check",
        completed: true,
        date: "Mar 15, 2023"
      },
      {
        title: "Mid Treatment Evaluation",
        description: "X-rays and comprehensive progress assessment",
        completed: false,
        date: "Aug 15, 2023"
      },
      {
        title: "Final Adjustments",
        description: "Last adjustments before removal",
        completed: false,
        date: "Jul 15, 2024"
      }
    ]
  },
  {
    id: "T002",
    patientId: "P002",
    patientName: "Michael Chen",
    type: "Invisalign",
    status: "In Progress",
    startDate: "Mar 10, 2023",
    estimatedEndDate: "Sep 10, 2024",
    progress: 30,
    duration: 18,
    nextAppointment: "Jun 16, 2023",
    notes: "Patient is maintaining good hygiene and wearing aligners for recommended 22 hours daily.",
    milestones: [
      {
        title: "Initial Scan and Fitting",
        description: "Digital scan and first set of aligners",
        completed: true,
        date: "Mar 10, 2023"
      },
      {
        title: "Set 2-5 Check",
        description: "Progress evaluation with first few sets",
        completed: true,
        date: "May 1, 2023"
      },
      {
        title: "Mid Treatment Scan",
        description: "New scan for refinements if needed",
        completed: false,
        date: "Sep 10, 2023"
      }
    ]
  },
  {
    id: "T003",
    patientId: "P003",
    patientName: "Emma Wilson",
    type: "Braces",
    status: "Near Completion",
    startDate: "Sep 5, 2022",
    estimatedEndDate: "Jul 5, 2023",
    progress: 85,
    duration: 10,
    nextAppointment: "Jun 17, 2023",
    notes: "Treatment progressing faster than expected. May be ready for removal earlier than estimated.",
    milestones: [
      {
        title: "Initial Fitting",
        description: "Installation of braces and adjustments",
        completed: true,
        date: "Sep 5, 2022"
      },
      {
        title: "Quarterly Adjustment",
        description: "Regular tightening and progress check",
        completed: true,
        date: "Dec 5, 2022"
      },
      {
        title: "Mid Treatment X-rays",
        description: "Comprehensive progress assessment",
        completed: true,
        date: "Mar 5, 2023"
      },
      {
        title: "Preparation for Removal",
        description: "Final adjustments before removal",
        completed: false,
        date: "Jun 17, 2023"
      }
    ]
  },
  {
    id: "T004",
    patientId: "P004",
    patientName: "Jason Rodriguez",
    type: "Invisalign",
    status: "Just Started",
    startDate: "May 20, 2023",
    estimatedEndDate: "Nov 20, 2024",
    progress: 10,
    duration: 18,
    nextAppointment: "Jun 15, 2023",
    notes: "Patient adjusting well to first set of aligners. Advised on proper cleaning techniques.",
    milestones: [
      {
        title: "Initial Scan and Fitting",
        description: "Digital scan and first set of aligners",
        completed: true,
        date: "May 20, 2023"
      },
      {
        title: "First Follow-up",
        description: "Check fit and address any initial issues",
        completed: false,
        date: "Jun 15, 2023"
      }
    ]
  },
  {
    id: "T005",
    patientId: "P005",
    patientName: "Olivia Smith",
    type: "Palatal Expander",
    status: "In Progress",
    startDate: "Jan 12, 2023",
    estimatedEndDate: "Jul 12, 2023",
    progress: 50,
    duration: 6,
    nextAppointment: "Jun 18, 2023",
    notes: "Expansion progressing as planned. Patient experiencing minimal discomfort.",
    milestones: [
      {
        title: "Installation",
        description: "Fitting of the palatal expander",
        completed: true,
        date: "Jan 12, 2023"
      },
      {
        title: "Adjustment Period Check",
        description: "Evaluation after initial adjustment period",
        completed: true,
        date: "Feb 12, 2023"
      },
      {
        title: "Mid-Treatment Assessment",
        description: "Checking width expansion progress",
        completed: true,
        date: "Apr 12, 2023"
      },
      {
        title: "Final Assessment",
        description: "Evaluation before removal",
        completed: false,
        date: "Jun 18, 2023"
      }
    ]
  }
];
