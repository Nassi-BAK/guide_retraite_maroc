import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t, dir } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/avant-retraite', label: t('nav.before') },
    { path: '/apres-retraite', label: t('nav.after') },
    { path: '/diagnostic', label: t('nav.diagnostic') },
    { path: '/ressources', label: t('nav.resources') },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-gradient-to-r from-stone-600 via-stone-500 to-stone-600 backdrop-blur-sm border-b-2 border-red-600 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="content-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 transition-smooth hover:opacity-90">
            <motion.img 
              src={logo} 
              alt="Guide Retraite Maroc" 
              className="h-14 w-auto drop-shadow-lg"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            
          </Link>

          {/* Desktop Navigation - Centré avec le bouton langue intégré */}
          <nav className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-stone-700/30 rounded-full px-2 py-2 backdrop-blur-sm">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-red-600 text-white shadow-lg scale-105'
                        : 'text-stone-50 hover:bg-red-500 hover:text-white hover:shadow-md'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div
                        className="absolute inset-0 bg-red-600 rounded-full -z-10"
                        layoutId="activeNav"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Language Switcher Desktop - Intégré dans la nav */}
              <motion.div
                className="ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 font-bold bg-white text-stone-700 border-2 border-red-500 hover:bg-red-600 hover:text-white hover:border-white transition-all duration-300 shadow-md rounded-full px-4 h-10"
                  aria-label="Change language"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{language === 'fr' ? 'عربي' : 'FR'}</span>
                </Button>
              </motion.div>
            </div>
          </nav>

          {/* Mobile: Language Switcher & Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 font-bold bg-white text-stone-700 border-2 border-red-500 hover:bg-red-600 hover:text-white hover:border-white transition-all duration-300 shadow-md rounded-full px-3 h-9"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs font-bold">{language === 'fr' ? 'ع' : 'FR'}</span>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-red-500 hover:text-white transition-all duration-300 rounded-full h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="lg:hidden pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2 bg-stone-700/50 rounded-xl p-3 backdrop-blur-sm border border-stone-600/30">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 block ${
                        isActive(item.path)
                          ? 'bg-red-600 text-white shadow-md'
                          : 'text-stone-50 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;