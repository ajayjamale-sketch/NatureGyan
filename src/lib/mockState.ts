import { COURSES } from '@/constants';
import { Course } from '@/types';

// Broadcaster to notify components of any updates to localStorage
const BROADCAST_EVENT = 'naturegyan_state_changed';

export function broadcastStateChange() {
  window.dispatchEvent(new Event(BROADCAST_EVENT));
}

export function useMockStateListener(callback: () => void) {
  // Simple react-friendly listener
  const listener = () => callback();
  window.addEventListener(BROADCAST_EVENT, listener);
  return () => window.removeEventListener(BROADCAST_EVENT, listener);
}

// ─── Default Data Templates ─────────────────────────────────────────────────

const DEFAULT_COURSES: Course[] = [
  ...COURSES,
  {
    id: '7',
    title: 'Soil Carbon Sequestration',
    description: 'Learn how tropical soils capture carbon and how regenerative agriculture helps mitigate global climate shifts.',
    category: 'Climate',
    level: 'advanced',
    duration: '5 weeks',
    enrolled: 4320,
    rating: 4.6,
    instructor: 'Dr. Suresh Iyer',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80'
  }
];

const DEFAULT_SIGHTINGS = [
  { id: 's1', name: 'Indian Paradise Flycatcher', scientific: 'Terpsiphone paradisi', category: 'Birds', location: 'Sanjay Gandhi NP', date: '2026-06-02', img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&auto=format&fit=crop&q=80', rare: true, details: 'Seen near the bamboo grove in the morning. Spectacular long white tail.' },
  { id: 's2', name: 'Blue Mormon Butterfly', scientific: 'Papilio polymnestor', category: 'Insects', location: 'Thane Creek', date: '2026-05-31', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop&q=80', rare: false, details: 'Feeding on nectar-rich wildflowers. Bright blue wings.' },
  { id: 's3', name: 'Malabar Giant Squirrel', scientific: 'Ratufa indica', category: 'Mammals', location: 'Radhanagari WLS', date: '2026-05-28', img: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=300&auto=format&fit=crop&q=80', rare: true, details: 'Leaping between high tree canopies. Colorful maroon-and-buff coat.' },
  { id: 's4', name: 'Painted Stork', scientific: 'Mycteria leucocephala', category: 'Birds', location: 'Keoladeo Ghana', date: '2026-05-25', img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&auto=format&fit=crop&q=80', rare: false, details: 'Foraging in shallow waters alongside spoonbills.' },
];

const DEFAULT_CHALLENGES = [
  { id: 'c1', title: 'Plant a Tree', desc: 'Plant one tree and document it with a photo', pts: 50, deadline: 'Jun 30', participants: 4820, completed: false, emoji: '🌳', category: 'Ecology' },
  { id: 'c2', title: '30-Day Zero Waste', desc: 'Reduce daily waste to zero for 30 consecutive days', pts: 200, deadline: 'Jul 15', participants: 1240, completed: false, emoji: '♻️', category: 'Sustainability' },
  { id: 'c3', title: 'Identify 10 Birds', desc: 'Use the AI identifier to document 10 local bird species', pts: 100, deadline: 'Jul 1', participants: 3180, completed: true, emoji: '🦅', category: 'Wildlife' },
  { id: 'c4', title: 'Community Cleanup', desc: 'Organize or join a neighborhood cleanup drive', pts: 150, deadline: 'Jun 25', participants: 2640, completed: false, emoji: '🗑️', category: 'Cleanliness' },
  { id: 'c5', title: 'Water Conservation Week', desc: 'Track and reduce water usage by 20% for 7 days', pts: 80, deadline: 'Jul 7', participants: 980, completed: false, emoji: '💧', category: 'Conservation' },
  { id: 'c6', title: 'Eco Photography', desc: 'Submit 5 nature photos showcasing local biodiversity', pts: 120, deadline: 'Jul 20', participants: 1560, completed: false, emoji: '📷', category: 'Creative' },
];

const DEFAULT_COMMUNITY_POSTS = [
  { id: 'f1', name: 'Forest Ecology', members: 12400, posts: 3840, latest: 'Fungi networks in old-growth forests', emoji: '🌲', category: 'Ecology' },
  { id: 'f2', name: 'Bird Watchers India', members: 8920, posts: 2160, latest: 'Migratory patterns in 2026 winter', emoji: '🦅', category: 'Birds' },
  { id: 'f3', name: 'Climate Action Hub', members: 21300, posts: 7200, latest: 'Urban heat islands - data analysis', emoji: '🌍', category: 'Climate' },
  { id: 'f4', name: 'Marine Conservation', members: 6840, posts: 1920, latest: 'Coral bleaching report: Lakshadweep', emoji: '🐠', category: 'Marine' },
  { id: 'f5', name: 'Sustainable Living', members: 18600, posts: 5400, latest: 'DIY composting guide for apartments', emoji: '🌱', category: 'Sustainability' },
  { id: 'f6', name: 'Wildlife Photography', members: 9200, posts: 2840, latest: 'Best lenses for macro insect shots', emoji: '📷', category: 'Photography' },
];

const DEFAULT_EVENTS = [
  { id: 'e1', name: 'Morning Bird Walk — Cubbon Park', type: 'Nature Walk', date: 'Jun 10', time: '6:00 AM', location: 'Bangalore', spots: 8, registered: false, img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&auto=format&fit=crop&q=80' },
  { id: 'e2', name: 'Wetlands Cleanup Drive', type: 'Cleanup', date: 'Jun 15', time: '8:00 AM', location: 'Mumbai', spots: 24, registered: false, img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&auto=format&fit=crop&q=80' },
  { id: 'e3', name: 'Climate Action Summit 2026', type: 'Conference', date: 'Jun 20', time: '9:00 AM', location: 'Delhi (Online)', spots: 500, registered: false, img: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=300&auto=format&fit=crop&q=80' },
  { id: 'e4', name: 'Eco Photography Workshop', type: 'Workshop', date: 'Jun 25', time: '2:00 PM', location: 'Pune', spots: 15, registered: false, img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&auto=format&fit=crop&q=80' },
  { id: 'e5', name: 'Tree Planting Mega Drive', type: 'Campaign', date: 'Jul 1', time: '7:00 AM', location: 'Chennai', spots: 200, registered: false, img: 'https://www.vintagetreecare.com/wp-content/uploads/2018/10/tree_sappling.jpg' },
  { id: 'e6', name: 'Marine Ecology Field Trip', type: 'Eco Tour', date: 'Jul 8', time: '7:00 AM', location: 'Goa', spots: 12, registered: false, img: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&auto=format&fit=crop&q=80' },
];

const DEFAULT_RESEARCH_PAPERS = [
  { id: 'p1', title: 'Biodiversity Hotspots in Western Ghats: 2025 Survey', authors: 'Dr. Suresh Iyer, Sharma et al.', year: 2025, category: 'Biodiversity', downloads: 1240, journal: 'Nature Conservation', status: 'published' },
  { id: 'p2', title: 'Microplastics in Freshwater Ecosystems: A Meta-Analysis', authors: 'Patel, Kumar, Singh', year: 2025, category: 'Pollution', downloads: 980, journal: 'Environmental Science', status: 'published' },
  { id: 'p3', title: 'Impact of Urban Afforestation on Local Microclimate', authors: 'Nair, Krishnamurthy', year: 2024, category: 'Climate', downloads: 2160, journal: 'Urban Forestry', status: 'published' },
  { id: 'p4', title: 'Tiger Population Recovery: Success Factors in Project Tiger', authors: 'Wildlife Institute of India', year: 2024, category: 'Conservation', downloads: 3480, journal: 'Wildlife Biology', status: 'published' },
  { id: 'p5', title: 'Soil Carbon Sequestration in Tropical Forests', authors: 'Dr. Suresh Iyer, Desai, Mehta, Roy', year: 2024, category: 'Climate', downloads: 760, journal: 'Ecosystems Journal', status: 'published' },
  { id: 'p6', title: 'AI-Assisted Wildlife Monitoring: A Field Study', authors: 'Dr. Suresh Iyer, Sharma', year: 2026, category: 'Conservation', downloads: 12, journal: 'Conservation Tech', status: 'under-review' }
];

const DEFAULT_CAMPAIGNS = [
  { id: 'camp1', name: 'Green Chennai: 10,000 Trees', status: 'active', volunteers: 142, target: 10000, achieved: 6840, location: 'Chennai, TN', deadline: 'Dec 2026', desc: 'Planting native trees to restore shade cover in hot urban centers.' },
  { id: 'camp2', name: 'Adyar River Cleanup', status: 'active', volunteers: 89, target: 2000, achieved: 1240, location: 'Chennai, TN', deadline: 'Aug 2026', desc: 'Cleaning plastic waste and installing trash nets near urban rivers.' },
  { id: 'camp3', name: 'School Eco Gardens', status: 'planning', volunteers: 34, target: 50, achieved: 12, location: 'Multiple Cities', deadline: 'Sep 2026', desc: 'Helping primary schools build sustainable micro-gardens.' },
  { id: 'camp4', name: 'Mangrove Restoration Drive', status: 'completed', volunteers: 210, target: 5000, achieved: 5000, location: 'Coromandel Coast', deadline: 'May 2026', desc: 'Restoring tidal buffer zones by planting mangrove saplings.' },
];

const DEFAULT_VOLUNTEERS = [
  { id: 'v1', name: 'Meena Krishnan', email: 'meena@nature.org', phone: '+91 98401 12345', status: 'approved', tasks: 28, score: 1240 },
  { id: 'v2', name: 'Sanjay Joshi', email: 'sanjay@nature.org', phone: '+91 98401 54321', status: 'approved', tasks: 22, score: 980 },
  { id: 'v3', name: 'Aisha Malik', email: 'aisha@nature.org', phone: '+91 98401 67890', status: 'approved', tasks: 18, score: 840 },
  { id: 'v4', name: 'Rohit Singh', email: 'rohit@nature.org', phone: '+91 98401 09876', status: 'approved', tasks: 15, score: 720 },
  { id: 'v5', name: 'Priya Verma', email: 'priya@outlook.com', phone: '+91 98840 12121', status: 'pending', tasks: 0, score: 0 },
  { id: 'v6', name: 'Rahul Sen', email: 'rahul.sen@gmail.com', phone: '+91 99912 34343', status: 'pending', tasks: 0, score: 0 }
];

const DEFAULT_STUDENTS = [
  { id: 'stu1', name: 'Priya Sharma', email: 'priya.s@student.com', course: 'Biodiversity 101', progress: 85, lastActive: '2 hours ago', status: 'active' },
  { id: 'stu2', name: 'Rahul Mehta', email: 'rahul.m@student.com', course: 'Climate Science', progress: 42, lastActive: '1 day ago', status: 'at-risk' },
  { id: 'stu3', name: 'Sneha Patel', email: 'sneha.p@student.com', course: 'Wildlife Biology', progress: 97, lastActive: '30 min ago', status: 'active' },
  { id: 'stu4', name: 'Arjun Nair', email: 'arjun.n@student.com', course: 'Ecology Basics', progress: 20, lastActive: '5 days ago', status: 'inactive' },
  { id: 'stu5', name: 'Kavya Iyer', email: 'kavya.i@student.com', course: 'Biodiversity 101', progress: 60, lastActive: '3 hours ago', status: 'active' },
];

const DEFAULT_SESSIONS = [
  { id: 'ses1', name: 'Live Q&A: Bird Migration', date: 'Jun 10, 4PM', students: 42 },
  { id: 'ses2', name: 'Workshop: Field Journaling', date: 'Jun 14, 3PM', students: 28 },
  { id: 'ses3', name: 'Webinar: Climate Action', date: 'Jun 18, 5PM', students: 65 },
];

const DEFAULT_FLAGGED_CONTENT = [
  { id: 'f_post1', type: 'Content Flag', item: 'Forum post in Wildlife Conservation thread', time: '4 hours ago', severity: 'high', details: 'User posting external advertising links repeatedly.' },
  { id: 'f_post2', type: 'Content Flag', item: 'Misleading claims in biodiversity blog', time: '1 day ago', severity: 'high', details: 'Unscientific information uploaded without sourcing.' },
  { id: 'f_course1', type: 'Course Review', item: 'Ocean Microplastics 101 by Dr. Patel', time: '2 hours ago', severity: 'normal', details: 'New course draft submitted for curriculum approval.' },
  { id: 'f_ngo1', type: 'Account Verify', item: 'NGO application: EcoRoots Foundation', time: '6 hours ago', severity: 'normal', details: 'NGO registration documents pending review.' },
];

const DEFAULT_SYSTEM_STATUS = [
  { service: 'API Services', status: 'operational', uptime: '99.98%' },
  { service: 'AI Assistant', status: 'operational', uptime: '99.9%' },
  { service: 'Database', status: 'operational', uptime: '100%' },
  { service: 'Storage', status: 'operational', uptime: '99.95%' },
  { service: 'Email Service', status: 'degraded', uptime: '97.2%' },
];

const DEFAULT_SYSTEM_LOGS = [
  { id: 'l1', action: 'Cache Flushed', user: 'Preethi Sundar', time: '5 mins ago', status: 'Success' },
  { id: 'l2', action: 'Full Backup Initiated', user: 'System Cron', time: '30 mins ago', status: 'Success' },
  { id: 'l3', action: 'User suspension lifted', user: 'Preethi Sundar', time: '2 hours ago', status: 'Success' },
  { id: 'l4', action: 'Server health check', user: 'System Automated', time: '12 hours ago', status: 'Success' },
];

// ─── LocalStorage State Initializers ────────────────────────────────────────

function initKey<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
}

export function getMockState() {
  return {
    courses: initKey<Course[]>('ng_courses', DEFAULT_COURSES),
    sightings: initKey<any[]>('ng_sightings', DEFAULT_SIGHTINGS),
    challenges: initKey<any[]>('ng_challenges', DEFAULT_CHALLENGES),
    communityPosts: initKey<any[]>('ng_community', DEFAULT_COMMUNITY_POSTS),
    events: initKey<any[]>('ng_events', DEFAULT_EVENTS),
    researchPapers: initKey<any[]>('ng_research', DEFAULT_RESEARCH_PAPERS),
    campaigns: initKey<any[]>('ng_campaigns', DEFAULT_CAMPAIGNS),
    volunteers: initKey<any[]>('ng_volunteers', DEFAULT_VOLUNTEERS),
    students: initKey<any[]>('ng_students', DEFAULT_STUDENTS),
    sessions: initKey<any[]>('ng_sessions', DEFAULT_SESSIONS),
    flaggedContent: initKey<any[]>('ng_flagged', DEFAULT_FLAGGED_CONTENT),
    systemStatus: initKey<any[]>('ng_sys_status', DEFAULT_SYSTEM_STATUS),
    systemLogs: initKey<any[]>('ng_sys_logs', DEFAULT_SYSTEM_LOGS),
  };
}

export function saveMockState(newState: Partial<ReturnType<typeof getMockState>>) {
  Object.entries(newState).forEach(([key, value]) => {
    let lsKey = '';
    switch (key) {
      case 'courses': lsKey = 'ng_courses'; break;
      case 'sightings': lsKey = 'ng_sightings'; break;
      case 'challenges': lsKey = 'ng_challenges'; break;
      case 'communityPosts': lsKey = 'ng_community'; break;
      case 'events': lsKey = 'ng_events'; break;
      case 'researchPapers': lsKey = 'ng_research'; break;
      case 'campaigns': lsKey = 'ng_campaigns'; break;
      case 'volunteers': lsKey = 'ng_volunteers'; break;
      case 'students': lsKey = 'ng_students'; break;
      case 'sessions': lsKey = 'ng_sessions'; break;
      case 'flaggedContent': lsKey = 'ng_flagged'; break;
      case 'systemStatus': lsKey = 'ng_sys_status'; break;
      case 'systemLogs': lsKey = 'ng_sys_logs'; break;
    }
    if (lsKey) {
      localStorage.setItem(lsKey, JSON.stringify(value));
    }
  });
  broadcastStateChange();
}
