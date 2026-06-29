export interface Project {
  id: string;
  title: string;
  category: 'Lighting' | 'Decor' | 'Furniture' | 'Hospitality' | 'Architecture' | 'OEM';
  description: string;
  overview: string;
  processUsed: string;
  materials: string[];
  finish: string;
  timeline: string;
  challenges: string;
  specs: { label: string; value: string }[];
  images: string[];
}

export interface Capability {
  id: string;
  title: string;
  icon: string; // lucide icon name
  category: 'Casting' | 'Machining & Fabrication' | 'Finishing & Surface' | 'Engineering & Production';
  summary: string;
  description: string;
  machinery: string[];
  capacity: string;
  tolerances: string;
  materials: string[];
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown or rich text
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface Enquiry {
  id: string;
  company: string;
  name: string;
  country: string;
  email: string;
  phone: string;
  industry: string;
  description: string;
  quantity: string;
  targetDate: string;
  attachmentName?: string;
  date: string;
  status: 'Pending' | 'Reviewed' | 'Contacted';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  projectScope: string;
}
