export interface AppEvent {
  id: number;
  name: string;
  description: string;
  begin_date: Date;
  end_date?: Date;
  location?: string;
  max_capacity?: number;
  image_url?: string;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED";
  latitude?: number;
  longitude?: number;
  price?: number;
}
