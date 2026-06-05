export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'researcher' | 'enthusiast' | 'ngo' | 'admin';
  avatar?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
  coursesCompleted: number;
  ecoPoints: number;
  badges: Badge[];
  interests: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  enrolled: number;
  rating: number;
  instructor: string;
  image: string;
  progress?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  image: string;
  views: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
