import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Programs } from './pages/Programs';
import { Apply } from './pages/Apply';
import { Contact } from './pages/Contact';
import { CourseDetail } from './pages/CourseDetail';
import { type Page, type Course } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('home');
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'programs':
        return <Programs onPageChange={handlePageChange} onCourseSelect={handleCourseSelect} />;
      case 'apply':
        return <Apply />;
      case 'contact':
        return <Contact />;
      case 'course-detail':
        return selectedCourse ? (
          <CourseDetail 
            course={selectedCourse} 
            onBack={() => handlePageChange('programs')} 
            onApply={() => handlePageChange('apply')}
          />
        ) : (
          <Programs onPageChange={handlePageChange} onCourseSelect={handleCourseSelect} />
        );
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary/30 selection:text-primary">
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
