import React from 'react';
import { Sprout, TreePine, Bug, Zap, GraduationCap, Star, Microscope, Mountain, Bird, Leaf, Heart, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { User, AuthState } from '@/types';

export const DEMO_USERS: Record<string, User> = {
  student: {
    id: 'user_student',
    name: 'Aryan Kapoor',
    email: 'aryan.student@naturegyan.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    bio: 'Passionate about wildlife conservation and sustainable living. Exploring nature one species at a time.',
    location: 'Bangalore, India',
    joinedAt: '2025-01-15',
    coursesCompleted: 8,
    ecoPoints: 2450,
    badges: [
      { id: 'b1', name: 'First Steps', icon: React.createElement(Sprout, { className: "w-5 h-5 text-green-500" }), description: 'Completed first course', earnedAt: '2025-01-20' },
      { id: 'b2', name: 'Tree Planter', icon: React.createElement(TreePine, { className: "w-5 h-5 text-green-600" }), description: 'Planted 10 trees', earnedAt: '2025-02-10' },
      { id: 'b3', name: 'Bird Watcher', icon: React.createElement(Bug, { className: "w-5 h-5 text-blue-500" }), description: 'Identified 20 species', earnedAt: '2025-03-05' },
      { id: 'b4', name: 'Eco Warrior', icon: React.createElement(Zap, { className: "w-5 h-5 text-yellow-500" }), description: 'Completed 5 eco-challenges', earnedAt: '2025-04-01' },
    ],
    interests: ['Wildlife', 'Biodiversity', 'Climate Change', 'Marine Conservation'],
  },
  teacher: {
    id: 'user_teacher',
    name: 'Dr. Ananya Krishnamurthy',
    email: 'ananya.teacher@naturegyan.in',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=100&auto=format&fit=crop&q=80',
    bio: 'Biology teacher with 12 years experience in environmental science education. Passionate about making ecology accessible to students.',
    location: 'Delhi, India',
    joinedAt: '2024-08-01',
    coursesCompleted: 3,
    ecoPoints: 5800,
    badges: [
      { id: 't1', name: 'Educator', icon: React.createElement(GraduationCap, { className: "w-5 h-5 text-primary" }), description: 'Published first course', earnedAt: '2024-09-01' },
      { id: 't2', name: 'Mentor', icon: React.createElement(Star, { className: "w-5 h-5 text-yellow-500" }), description: 'Guided 100 students', earnedAt: '2024-11-15' },
    ],
    interests: ['Environmental Science', 'Ecology', 'Pedagogy', 'Biodiversity'],
  },
  researcher: {
    id: 'user_researcher',
    name: 'Dr. Suresh Iyer',
    email: 'suresh.researcher@naturegyan.in',
    role: 'researcher',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    bio: 'Wildlife researcher specializing in biodiversity hotspots and conservation genomics. Published 32 research papers.',
    location: 'Dehradun, India',
    joinedAt: '2024-06-10',
    coursesCompleted: 2,
    ecoPoints: 9200,
    badges: [
      { id: 'r1', name: 'Researcher', icon: React.createElement(Microscope, { className: "w-5 h-5 text-purple-500" }), description: 'Published 10 papers', earnedAt: '2024-07-20' },
      { id: 'r2', name: 'Field Expert', icon: React.createElement(Mountain, { className: "w-5 h-5 text-slate-500" }), description: 'Completed field study', earnedAt: '2024-10-05' },
    ],
    interests: ['Biodiversity Genomics', 'Wildlife Research', 'Conservation Science', 'Field Ecology'],
  },
  enthusiast: {
    id: 'user_enthusiast',
    name: 'Riya Desai',
    email: 'riya.enthusiast@naturegyan.in',
    role: 'enthusiast',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    bio: 'Nature photographer and bird watcher. Identified 200+ species in Maharashtra. Citizen science volunteer.',
    location: 'Mumbai, India',
    joinedAt: '2025-03-01',
    coursesCompleted: 12,
    ecoPoints: 3750,
    badges: [
      { id: 'e1', name: 'Bird Watcher', icon: React.createElement(Bird, { className: "w-5 h-5 text-yellow-600" }), description: 'Identified 100 bird species', earnedAt: '2025-04-01' },
      { id: 'e2', name: 'Citizen Scientist', icon: React.createElement(Leaf, { className: "w-5 h-5 text-green-500" }), description: 'Contributed 50 observations', earnedAt: '2025-05-10' },
    ],
    interests: ['Bird Watching', 'Nature Photography', 'Citizen Science', 'Insect Identification'],
  },
  ngo: {
    id: 'user_ngo',
    name: 'Vikram Nair',
    email: 'vikram.ngo@naturegyan.in',
    role: 'ngo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    bio: 'Director of Green Earth Foundation. Leading tree plantation and river clean-up campaigns across South India.',
    location: 'Chennai, India',
    joinedAt: '2024-04-15',
    coursesCompleted: 5,
    ecoPoints: 18400,
    badges: [
      { id: 'n1', name: 'Campaign Leader', icon: '🌳', description: 'Planted 1000+ trees', earnedAt: '2024-05-20' },
      { id: 'n2', name: 'Impact Driver', icon: React.createElement(Heart, { className: "w-5 h-5 text-green-500" }), description: 'Engaged 500 volunteers', earnedAt: '2024-09-10' },
    ],
    interests: ['Conservation Campaigns', 'Volunteer Management', 'Environmental Policy', 'Community Engagement'],
  },
  admin: {
    id: 'user_admin',
    name: 'Preethi Sundar',
    email: 'preethi.admin@naturegyan.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    bio: 'Platform administrator and environmental consultant. Oversees content quality, community moderation, and platform analytics.',
    location: 'Bangalore, India',
    joinedAt: '2023-11-01',
    coursesCompleted: 20,
    ecoPoints: 32000,
    badges: [
      { id: 'a1', name: 'Platform Guardian', icon: React.createElement(Shield, { className: "w-5 h-5 text-red-500" }), description: 'Moderated 1000+ posts', earnedAt: '2024-01-01' },
      { id: 'a2', name: 'Super Admin', icon: React.createElement(Star, { className: "w-5 h-5 text-yellow-500" }), description: 'Full platform access', earnedAt: '2023-11-01' },
    ],
    interests: ['Platform Management', 'Content Quality', 'Analytics', 'Community Building'],
  },
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem('naturegyan_auth');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        localStorage.removeItem('naturegyan_auth');
      }
    }
    return { isAuthenticated: false, user: null };
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (email && _password.length >= 6) {
      const user = { ...DEMO_USERS.student, email };
      const newState: AuthState = { isAuthenticated: true, user };
      setAuthState(newState);
      localStorage.setItem('naturegyan_auth', JSON.stringify(newState));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: 'Invalid credentials. Please try again.' };
  };

  const loginAsRole = async (role: string): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = DEMO_USERS[role] || DEMO_USERS.student;
    const newState: AuthState = { isAuthenticated: true, user };
    setAuthState(newState);
    localStorage.setItem('naturegyan_auth', JSON.stringify(newState));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1400));
    const user: User = { ...DEMO_USERS.student, name, email, coursesCompleted: 0, ecoPoints: 0, badges: [] };
    const newState: AuthState = { isAuthenticated: true, user };
    setAuthState(newState);
    localStorage.setItem('naturegyan_auth', JSON.stringify(newState));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem('naturegyan_auth');
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      const newState: AuthState = { isAuthenticated: true, user: updatedUser };
      setAuthState(newState);
      localStorage.setItem('naturegyan_auth', JSON.stringify(newState));
    }
  };

  return { ...authState, isLoading, login, loginAsRole, register, logout, updateUser };
}
