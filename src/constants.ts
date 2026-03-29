import { type Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'fiqh-101',
    title: 'Foundations of Fiqh',
    description: 'A comprehensive introduction to the principles of Islamic jurisprudence, focusing on classical methodologies and contemporary applications.',
    level: 'Beginner',
    duration: '12 Weeks',
    instructor: 'Shaykh Ahmad Al-Farsi',
    category: 'Jurisprudence',
    image: 'https://picsum.photos/seed/fiqh/800/600',
    syllabus: [
      'Introduction to Usul al-Fiqh',
      'Sources of Islamic Law: Quran and Sunnah',
      'The Concept of Ijtihad',
      'Rules of Interpretation',
      'Application of Fiqh in Modern Society'
    ],
    prerequisites: [
      'Basic understanding of Arabic (recommended)',
      'Completion of Introductory Islamic Studies'
    ]
  },
  {
    id: 'aqidah-201',
    title: 'Classical Islamic Creed',
    description: 'An in-depth study of the essential beliefs of Islam as preserved by the scholarly tradition, addressing theological nuances and historical developments.',
    level: 'Intermediate',
    duration: '16 Weeks',
    instructor: 'Dr. Maryam Al-Zahra',
    category: 'Theology',
    image: 'https://picsum.photos/seed/creed/800/600',
    syllabus: [
      'The Attributes of Allah',
      'Prophethood and Revelation',
      'The Unseen World (Al-Ghaib)',
      'Eschatology and the Afterlife',
      'Comparative Theology'
    ],
    prerequisites: [
      'Foundations of Fiqh',
      'Intermediate Arabic'
    ]
  },
  {
    id: 'hadith-301',
    title: 'Hadith Methodology',
    description: 'Master the science of Hadith criticism and classification (Mustalah al-Hadith), exploring the rigorous standards of classical scholarship.',
    level: 'Advanced',
    duration: '20 Weeks',
    instructor: 'Shaykh Yusuf Al-Haddad',
    category: 'Hadith Sciences',
    image: 'https://picsum.photos/seed/hadith/800/600',
    syllabus: [
      'History of Hadith Compilation',
      'Classification of Hadith (Sahih, Hasan, Daif)',
      'Biographical Evaluation (Ilm al-Rijal)',
      'Hidden Defects (Ilal)',
      'Contemporary Hadith Criticism'
    ],
    prerequisites: [
      'Advanced Arabic',
      'Classical Islamic Creed'
    ]
  }
];
