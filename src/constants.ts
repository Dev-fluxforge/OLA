import { type Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'tajweed-101',
    title: 'TAJWEED',
    description: 'Master the rules of Quranic phonetics and articulation (Tajweed) to ensure accurate and beautiful recitation of the Holy Quran.',
    level: 'Beginner',
    duration: '12 Weeks',
    instructor: 'Shaykh Ahmad Al-Farsi',
    category: 'Quranic Sciences',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800&h=600',
    syllabus: [
      'Introduction to Tajweed Rules',
      'Makharij al-Huruf (Points of Articulation)',
      'Sifat al-Huruf (Characteristics of Letters)',
      'Rules of Noon and Meem Sakinah',
      'Rules of Madd (Prolongation)'
    ],
    prerequisites: [
      'Ability to read Arabic script'
    ]
  },
  {
    id: 'hadith-101',
    title: 'HADITH',
    description: 'Study the prophetic traditions, focusing on the methodology of Hadith classification and the implementation of Sunnah in daily life.',
    level: 'Intermediate',
    duration: '16 Weeks',
    instructor: 'Shaykh Yusuf Al-Haddad',
    category: 'Hadith Sciences',
    image: 'https://images.unsplash.com/photo-1566121317354-69b23183f26f?auto=format&fit=crop&q=80&w=800&h=600',
    syllabus: [
      'History of Hadith Compilation',
      'Introduction to Mustalah al-Hadith',
      'Study of Arba\'een al-Nawawi',
      'Biographical Evaluation (Ilm al-Rijal)',
      'Authenticity and Classification'
    ],
    prerequisites: [
      'Basic Islamic Studies'
    ]
  },
  {
    id: 'recitation-101',
    title: 'QUR\'AN RECITATION',
    description: 'A practical course focused on improving the fluency and melody of Quranic recitation while applying the essential rules of Tajweed.',
    level: 'Beginner',
    duration: '10 Weeks',
    instructor: 'Ustadha Fatima Al-Zahra',
    category: 'Quranic Sciences',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800&h=600',
    syllabus: [
      'Fluency in Reading',
      'Practical Application of Tajweed',
      'Melodic Recitation (Maqamat Basics)',
      'Correcting Common Mistakes',
      'Recitation of Selected Surahs'
    ],
    prerequisites: [
      'Completion of Tajweed 101'
    ]
  },
  {
    id: 'memorization-101',
    title: 'QUR\'AN MEMORIZATION',
    description: 'A structured program for Hifz (memorization) of the Holy Quran, providing students with effective techniques and consistent review schedules.',
    level: 'Advanced',
    duration: 'Ongoing',
    instructor: 'Dr. Maryam Al-Zahra',
    category: 'Quranic Sciences',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=800&h=600',
    syllabus: [
      'Memorization Techniques',
      'Daily Revision (Muraja\'ah)',
      'Retention Strategies',
      'Spiritual Preparation for Hifz',
      'Individual Progress Tracking'
    ],
    prerequisites: [
      'Excellent Recitation and Tajweed'
    ]
  },
  {
    id: 'tafseer-101',
    title: 'TAFSEER',
    description: 'Deepen your understanding of the Quran through classical exegesis, exploring the historical context and linguistic nuances of the Divine Revelation.',
    level: 'Intermediate',
    duration: '14 Weeks',
    instructor: 'Shaykh Ibrahim Mansour',
    category: 'Quranic Sciences',
    image: 'https://images.unsplash.com/photo-1597933534024-16492b96324d?auto=format&fit=crop&q=80&w=800&h=600',
    syllabus: [
      'Principles of Tafseer (Usul al-Tafseer)',
      'Asbab al-Nuzul (Reasons for Revelation)',
      'Linguistic Analysis of Key Verses',
      'Thematic Study of Selected Chapters',
      'Contemporary Relevance of Quranic Guidance'
    ],
    prerequisites: [
      'Intermediate Arabic',
      'Basic Tajweed'
    ]
  },
  {
    id: 'seeroh-101',
    title: 'SEEROH',
    description: 'A comprehensive study of the life and times of Prophet Muhammad (peace be upon him) and the early history of Islam, drawing lessons for the modern era.',
    level: 'Beginner',
    duration: '12 Weeks',
    instructor: 'Dr. Omar Farooq',
    category: 'History & Biography',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800&h=600',
    syllabus: [
      'Pre-Islamic Arabia',
      'The Birth and Early Life of the Prophet',
      'The Prophetic Mission in Makkah',
      'The Hijrah and the Madinan Era',
      'The Legacy of the Prophet'
    ],
    prerequisites: [
      'None'
    ]
  }
];
