export type MedicaidStatus = 'Yes' | 'No' | 'Not Sure';
export type Borough = 'Bronx' | 'Manhattan' | 'Other';

export interface FunnelAData {
  funnel: 'Caregiver_Leads';
  fullName: string;
  phone: string;
  borough: Borough;
  medicaidStatus: MedicaidStatus;
  relationship: string;
  adls: string[];
}

export interface FunnelBData {
  funnel: 'Facility_Partners';
  facilityName: string;
  contactPerson: string;
  title: string;
  borough: Borough;
  phone: string;
  email: string;
  workshop: string;
  residentCount?: string;
}

export interface FunnelCData {
  funnel: 'Caregiver_Sanctuary';
  name: string;
  phone: string;
  currentAgency?: string;
  category: string;
  message: string;
  isUrgent?: boolean;
}

export type LeadData = FunnelAData | FunnelBData | FunnelCData;