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
    id: 'arabic-101',
    title: 'Classical Arabic Linguistics',
    description: 'Master the foundational rules of Arabic grammar (Nahw) and morphology (Sarf) to unlock the depths of classical Islamic texts.',
    level: 'Beginner',
    duration: '16 Weeks',
    instructor: 'Ustadha Fatima Al-Zahra',
    category: 'Arabic Linguistics',
    image: 'https://picsum.photos/seed/arabic/800/600',
    syllabus: [
      'Introduction to Arabic Parts of Speech',
      'The System of I\'rab (Inflection)',
      'Verb Conjugation and Root Systems',
      'Sentence Structure and Syntax',
      'Reading Classical Texts'
    ],
    prerequisites: [
      'Ability to read Arabic script',
      'Basic vocabulary'
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
    id: 'tafsir-201',
    title: 'Quranic Exegesis (Tafsir)',
    description: 'Explore the methodologies of Quranic interpretation, studying key verses through the lens of classical commentaries and linguistic analysis.',
    level: 'Intermediate',
    duration: '14 Weeks',
    instructor: 'Shaykh Ibrahim Mansour',
    category: 'Quranic Sciences',
    image: 'https://picsum.photos/seed/tafsir/800/600',
    syllabus: [
      'History of Tafsir Literature',
      'Principles of Exegesis (Usul al-Tafsir)',
      'Linguistic Miracles of the Quran',
      'Thematic Study of Selected Surahs',
      'Modern Challenges in Interpretation'
    ],
    prerequisites: [
      'Intermediate Arabic',
      'Foundations of Fiqh'
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
  },
  {
    id: 'history-101',
    title: 'Islamic Intellectual History',
    description: 'A journey through the golden ages of Islamic scholarship, tracing the development of major schools of thought and their impact on the world.',
    level: 'Beginner',
    duration: '10 Weeks',
    instructor: 'Dr. Omar Farooq',
    category: 'History',
    image: 'https://picsum.photos/seed/history/800/600',
    syllabus: [
      'The Prophetic Era and the Rightly Guided Caliphs',
      'The Rise of the Great Madhahib',
      'The Translation Movement and Scientific Advancements',
      'The Mongol Invasion and the Post-Classical Period',
      'Islamic Thought in the Modern Era'
    ],
    prerequisites: [
      'None'
    ]
  }
];
