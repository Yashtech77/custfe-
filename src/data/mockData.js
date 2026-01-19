
// Mock Cases Data
export const cases = [
  {
    id: 'CS-2024-0042',
    customerName: 'Rajesh Sharma',
    caseType: 'Transmission',
    leadSource: 'Direct',
    currentStage: 'DP Processing',
    overallProgress: 65,
    status: 'In Progress',
    priority: 'High',
    salesRM: 'Amit Kumar',
    operationsRM: 'Priya Patel',
    valuation: '₹15,00,000',
    clientBenefit: '₹45,000',
    margin: '3%',
    slaFlag: 'On Time',
    slaTotal: 15,
    slaElapsed: 10,
    aging: 10,
    escalation: 'None',
    createdDate: '2024-01-10',
    lastUpdated: '2024-01-19',
    certificateNumber: 'CERT-2024-1234',
    description: 'Transmission of shares from deceased holder to legal heir',
    documents: ['Death Certificate', 'Legal Heir Certificate', 'PAN Card'],
    timeline: [
      { stage: 'Document Verification', status: 'completed', date: '2024-01-10' },
      { stage: 'DRF Generation', status: 'completed', date: '2024-01-12' },
      { stage: 'DP Processing', status: 'in_progress', date: '2024-01-15' },
      { stage: 'NSDL/CDSL Processing', status: 'pending', date: null },
      { stage: 'Credit to Demat', status: 'pending', date: null }
    ]
  },
  {
    id: 'CS-2024-0041',
    customerName: 'Rajesh Sharma',
    caseType: 'Demat Conversion',
    leadSource: 'Referral',
    currentStage: 'NSDL/CDSL Processing',
    overallProgress: 80,
    status: 'In Progress',
    priority: 'Medium',
    salesRM: 'Vikram Singh',
    operationsRM: 'Priya Patel',
    valuation: '₹8,50,000',
    clientBenefit: '₹25,500',
    margin: '3%',
    slaFlag: 'On Time',
    slaTotal: 12,
    slaElapsed: 8,
    aging: 8,
    escalation: 'None',
    createdDate: '2024-01-12',
    lastUpdated: '2024-01-18',
    certificateNumber: 'CERT-2024-1235',
    description: 'Conversion of physical shares to demat format',
    documents: ['Share Certificate', 'PAN Card', 'Address Proof'],
    timeline: [
      { stage: 'Document Verification', status: 'completed', date: '2024-01-12' },
      { stage: 'DRF Generation', status: 'completed', date: '2024-01-13' },
      { stage: 'DP Processing', status: 'completed', date: '2024-01-15' },
      { stage: 'NSDL/CDSL Processing', status: 'in_progress', date: '2024-01-17' },
      { stage: 'Credit to Demat', status: 'pending', date: null }
    ]
  },
  {
    id: 'CS-2024-0038',
    customerName: 'Rajesh Sharma',
    caseType: 'Name Correction',
    leadSource: 'Website',
    currentStage: 'Document Verification',
    overallProgress: 20,
    status: 'Delayed',
    priority: 'High',
    salesRM: 'Amit Kumar',
    operationsRM: 'Priya Patel',
    valuation: '₹5,00,000',
    clientBenefit: '₹15,000',
    margin: '3%',
    slaFlag: 'Delayed',
    slaTotal: 10,
    slaElapsed: 12,
    aging: 12,
    escalation: 'Raised',
    createdDate: '2024-01-08',
    lastUpdated: '2024-01-18',
    certificateNumber: 'CERT-2024-1236',
    description: 'Correction of name spelling in share certificate',
    documents: ['Affidavit', 'Gazette Notification', 'PAN Card'],
    timeline: [
      { stage: 'Document Verification', status: 'in_progress', date: '2024-01-08' },
      { stage: 'DRF Generation', status: 'pending', date: null },
      { stage: 'DP Processing', status: 'pending', date: null },
      { stage: 'NSDL/CDSL Processing', status: 'pending', date: null },
      { stage: 'Credit to Demat', status: 'pending', date: null }
    ]
  },
  {
    id: 'CS-2024-0035',
    customerName: 'Rajesh Sharma',
    caseType: 'Duplicate Certificate',
    leadSource: 'Direct',
    currentStage: 'Credit to Demat',
    overallProgress: 95,
    status: 'In Progress',
    priority: 'Low',
    salesRM: 'Vikram Singh',
    operationsRM: 'Priya Patel',
    valuation: '₹3,20,000',
    clientBenefit: '₹9,600',
    margin: '3%',
    slaFlag: 'On Time',
    slaTotal: 20,
    slaElapsed: 18,
    aging: 18,
    escalation: 'None',
    createdDate: '2024-01-02',
    lastUpdated: '2024-01-19',
    certificateNumber: 'CERT-2024-1237',
    description: 'Issuance of duplicate certificate for lost shares',
    documents: ['FIR Copy', 'Indemnity Bond', 'Newspaper Ad'],
    timeline: [
      { stage: 'Document Verification', status: 'completed', date: '2024-01-02' },
      { stage: 'DRF Generation', status: 'completed', date: '2024-01-05' },
      { stage: 'DP Processing', status: 'completed', date: '2024-01-10' },
      { stage: 'NSDL/CDSL Processing', status: 'completed', date: '2024-01-15' },
      { stage: 'Credit to Demat', status: 'in_progress', date: '2024-01-18' }
    ]
  },
  {
    id: 'CS-2024-0030',
    customerName: 'Rajesh Sharma',
    caseType: 'Transmission',
    leadSource: 'Referral',
    currentStage: 'Credit to Demat',
    overallProgress: 100,
    status: 'Closed',
    priority: 'Medium',
    salesRM: 'Amit Kumar',
    operationsRM: 'Priya Patel',
    valuation: '₹12,00,000',
    clientBenefit: '₹36,000',
    margin: '3%',
    slaFlag: 'On Time',
    slaTotal: 15,
    slaElapsed: 14,
    aging: 14,
    escalation: 'None',
    createdDate: '2023-12-20',
    lastUpdated: '2024-01-03',
    certificateNumber: 'CERT-2024-1238',
    description: 'Successfully completed transmission of shares',
    documents: ['All Documents Verified'],
    timeline: [
      { stage: 'Document Verification', status: 'completed', date: '2023-12-20' },
      { stage: 'DRF Generation', status: 'completed', date: '2023-12-22' },
      { stage: 'DP Processing', status: 'completed', date: '2023-12-26' },
      { stage: 'NSDL/CDSL Processing', status: 'completed', date: '2023-12-30' },
      { stage: 'Credit to Demat', status: 'completed', date: '2024-01-03' }
    ]
  },
  {
    id: 'CS-2024-0028',
    customerName: 'Rajesh Sharma',
    caseType: 'Demat Conversion',
    leadSource: 'Website',
    currentStage: 'Credit to Demat',
    overallProgress: 100,
    status: 'Closed',
    priority: 'Low',
    salesRM: 'Vikram Singh',
    operationsRM: 'Priya Patel',
    valuation: '₹6,75,000',
    clientBenefit: '₹20,250',
    margin: '3%',
    slaFlag: 'On Time',
    slaTotal: 12,
    slaElapsed: 11,
    aging: 11,
    escalation: 'None',
    createdDate: '2023-12-15',
    lastUpdated: '2023-12-26',
    certificateNumber: 'CERT-2024-1239',
    description: 'Successfully converted physical shares to demat',
    documents: ['All Documents Verified'],
    timeline: [
      { stage: 'Document Verification', status: 'completed', date: '2023-12-15' },
      { stage: 'DRF Generation', status: 'completed', date: '2023-12-17' },
      { stage: 'DP Processing', status: 'completed', date: '2023-12-20' },
      { stage: 'NSDL/CDSL Processing', status: 'completed', date: '2023-12-23' },
      { stage: 'Credit to Demat', status: 'completed', date: '2023-12-26' }
    ]
  }
];

// Mock Documents Data
export const documents = [
  {
    id: 'DOC001',
    name: 'PAN Card',
    fileName: 'pan_card_rajesh.pdf',
    type: 'PDF',
    size: '256 KB',
    caseId: 'CS-2024-0042',
    status: 'Verified',
    uploadedDate: '2024-01-10',
    uploadedBy: 'Rajesh Sharma'
  },
  {
    id: 'DOC002',
    name: 'Death Certificate',
    fileName: 'death_certificate.pdf',
    type: 'PDF',
    size: '1.2 MB',
    caseId: 'CS-2024-0042',
    status: 'Verified',
    uploadedDate: '2024-01-10',
    uploadedBy: 'Rajesh Sharma'
  },
  {
    id: 'DOC003',
    name: 'Legal Heir Certificate',
    fileName: 'legal_heir_cert.pdf',
    type: 'PDF',
    size: '890 KB',
    caseId: 'CS-2024-0042',
    status: 'Pending Review',
    uploadedDate: '2024-01-11',
    uploadedBy: 'Rajesh Sharma'
  },
  {
    id: 'DOC004',
    name: 'Share Certificate',
    fileName: 'share_cert_scan.jpg',
    type: 'JPG',
    size: '2.1 MB',
    caseId: 'CS-2024-0041',
    status: 'Verified',
    uploadedDate: '2024-01-12',
    uploadedBy: 'Rajesh Sharma'
  },
  {
    id: 'DOC005',
    name: 'Address Proof',
    fileName: 'aadhar_card.pdf',
    type: 'PDF',
    size: '345 KB',
    caseId: 'CS-2024-0041',
    status: 'Verified',
    uploadedDate: '2024-01-12',
    uploadedBy: 'Rajesh Sharma'
  },
  {
    id: 'DOC006',
    name: 'Affidavit',
    fileName: 'affidavit_name_correction.pdf',
    type: 'PDF',
    size: '567 KB',
    caseId: 'CS-2024-0038',
    status: 'Rejected',
    uploadedDate: '2024-01-08',
    uploadedBy: 'Rajesh Sharma',
    rejectionReason: 'Signature mismatch'
  },
  {
    id: 'DOC007',
    name: 'FIR Copy',
    fileName: 'fir_lost_certificate.pdf',
    type: 'PDF',
    size: '789 KB',
    caseId: 'CS-2024-0035',
    status: 'Verified',
    uploadedDate: '2024-01-02',
    uploadedBy: 'Rajesh Sharma'
  },
  {
    id: 'DOC008',
    name: 'Indemnity Bond',
    fileName: 'indemnity_bond.docx',
    type: 'DOCX',
    size: '123 KB',
    caseId: 'CS-2024-0035',
    status: 'Verified',
    uploadedDate: '2024-01-03',
    uploadedBy: 'Rajesh Sharma'
  }
];

// Mock Messages Data
export const messages = [
  {
    id: 'MSG001',
    caseId: 'CS-2024-0042',
    sender: 'Priya Patel',
    senderType: 'rm',
    message: 'Hello Mr. Sharma, I wanted to update you that your case has moved to the DP Processing stage. All documents have been verified successfully.',
    timestamp: '2024-01-19 10:30 AM',
    read: false
  },
  {
    id: 'MSG002',
    caseId: 'CS-2024-0042',
    sender: 'Rajesh Sharma',
    senderType: 'customer',
    message: 'Thank you for the update, Priya. How long will the DP Processing stage take?',
    timestamp: '2024-01-19 10:35 AM',
    read: true
  },
  {
    id: 'MSG003',
    caseId: 'CS-2024-0042',
    sender: 'Priya Patel',
    senderType: 'rm',
    message: 'The DP Processing typically takes 3-5 business days. I will keep you updated on the progress.',
    timestamp: '2024-01-19 10:40 AM',
    read: false
  },
  {
    id: 'MSG004',
    caseId: 'CS-2024-0038',
    sender: 'Priya Patel',
    senderType: 'rm',
    message: 'Mr. Sharma, we noticed that the affidavit you uploaded has a signature mismatch. Could you please re-upload with a corrected version?',
    timestamp: '2024-01-18 02:15 PM',
    read: true
  },
  {
    id: 'MSG005',
    caseId: 'CS-2024-0038',
    sender: 'Rajesh Sharma',
    senderType: 'customer',
    message: 'I apologize for the error. I will get a new affidavit made and upload it by tomorrow.',
    timestamp: '2024-01-18 03:00 PM',
    read: true
  },
  {
    id: 'MSG006',
    caseId: 'CS-2024-0041',
    sender: 'Priya Patel',
    senderType: 'rm',
    message: 'Good news! Your demat conversion case is now at the NSDL processing stage. We expect completion within the next week.',
    timestamp: '2024-01-17 11:20 AM',
    read: true
  }
];

// Dashboard Statistics
export const dashboardStats = {
  activeCases: 4,
  completedCases: 2,
  inProgressCases: 3,
  delayedCases: 1,
  slaOnTimePercentage: 83,
  totalValuation: '₹50,45,000',
  totalBenefit: '₹1,51,350'
};

// Case Stages for tabs
export const caseStages = [
  'All',
  'Document Verification',
  'DRF Generation',
  'DP Processing',
  'NSDL/CDSL Processing',
  'Credit to Demat'
];

// Case Types
export const caseTypes = [
  'Transmission',
  'Demat Conversion',
  'Name Correction',
  'Duplicate Certificate',
  'Address Change',
  'Signature Update'
];

// Status Options
export const statusOptions = ['All', 'In Progress', 'Closed', 'Delayed', 'Approved'];

// Priority Options
export const priorityOptions = ['All', 'High', 'Medium', 'Low'];

// SLA Flag Options
export const slaFlagOptions = ['All', 'On Time', 'Delayed'];
