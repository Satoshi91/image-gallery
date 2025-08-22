export interface ImageData {
  id: string;
  request_id: string;
  storage_url: string;
  prompt?: string;
  original_filename?: string;
  created_at?: string;
  is_public?: boolean;
  rating?: string;
  views?: number;
  parent_image_id?: string;
  edit_parameters?: {
    brightness?: number;
    saturation?: number;
    contrast?: number;
    upscale_factor?: number;
  };
}

export interface ImageDocument {
  id?: string;
  image_data: ImageData;
  created_at?: unknown;
  updated_at?: unknown;
}