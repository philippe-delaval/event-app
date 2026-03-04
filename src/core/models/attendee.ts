export interface Attendee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job_title?: string;
  company?: string;
  marketing_consent?: boolean;
}
