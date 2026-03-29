export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  category: string;
  image: string;
  syllabus: string[];
  prerequisites: string[];
}

export type Page = 'home' | 'programs' | 'apply' | 'contact' | 'course-detail';
