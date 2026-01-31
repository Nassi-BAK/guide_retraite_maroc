import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-stone-700 via-stone-600 to-stone-700 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Logo & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="Guide Retraite Maroc" 
                className="h-12 w-12 object-contain"
              />
              <h3 className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                Guide Retraite Maroc
              </h3>
            </div>
            <p className="text-stone-100 leading-relaxed text-sm">
              {t('footer.mission')}
            </p>
            <div className="flex items-center space-x-2 text-sm">
             
              <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
              <span className="text-stone-200">{t('footer.forRetirees')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-stone-600 pb-2">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/avant-retraite" className="text-stone-100 hover:text-red-400 transition-colors text-sm flex items-center space-x-2 group">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>{t('footer.beforeRetirement')}</span>
                </Link>
              </li>
              <li>
                <Link to="/apres-retraite" className="text-stone-100 hover:text-red-400 transition-colors text-sm flex items-center space-x-2 group">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>{t('footer.afterRetirement')}</span>
                </Link>
              </li>
              <li>
                <Link to="/diagnostic" className="text-stone-100 hover:text-red-400 transition-colors text-sm flex items-center space-x-2 group">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>{t('footer.diagnostic')}</span>
                </Link>
              </li>
              <li>
                <Link to="/ressources" className="text-stone-100 hover:text-red-400 transition-colors text-sm flex items-center space-x-2 group">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>{t('footer.resources')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-stone-600 pb-2">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-stone-100">Casablanca, Maroc</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Mail className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:contact@guideretraite.ma" className="text-stone-100 hover:text-red-400 transition-colors">
                  contact@guideretraite.ma
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+212123456789" className="text-stone-100 hover:text-red-400 transition-colors">
                  +212 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-stone-600">
          <div className="bg-stone-600/50 rounded-lg p-4 backdrop-blur-sm border border-stone-600/30">
            <p className="text-xs text-stone-100 leading-relaxed text-center">
              <span className="font-semibold text-red-400">{t('footer.disclaimerTitle')}: </span>
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-600 bg-stone-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-stone-200">
              © {currentYear} Guide Retraite Maroc. {t('footer.rights')}
            </p>
            <div className="flex items-center space-x-4 text-xs text-stone-200">
              <a href="mailto:contact@guideretraite.ma" className="hover:text-red-400 transition-colors">
                {t('footer.privacy')}
              </a>
              <span>•</span>
              <Link to="/" className="hover:text-red-400 transition-colors">
                {t('footer.home')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;