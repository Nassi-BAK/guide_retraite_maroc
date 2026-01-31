import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import InfoCard from '@/components/InfoCard';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  Globe,
  Clock,
  ExternalLink,
  Copy,
  ArrowRight,
  Building,
  Link as LinkIcon
} from 'lucide-react';

const Ressources = () => {
  const { t } = useLanguage();

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copié au presse-papiers!');
  };

  const handleOpenLink = (url: string) => {
    window.open(`https://${url}`, '_blank');
  };

  const caisses = [
    {
      key: 'cnss',
      icon: '🏛️',
    },
    {
      key: 'cmr',
      icon: '👔',
    },
    {
      key: 'rcar',
      icon: '🏢',
    },
  ];

  const links = [
    { text: t('resources.section.links.gov'), url: 'www.maroc.ma' },
    { text: t('resources.section.links.tax'), url: 'www.tax.gov.ma' },
    { text: t('resources.section.links.social'), url: 'www.social.gov.ma' },
    { text: t('resources.section.links.health'), url: 'www.sante.gov.ma' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="content-container relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('resources.title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-primary font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('resources.subtitle')}
            </motion.p>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('resources.intro')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding pt-0">
        <div className="content-container">
          <motion.div 
            className="grid gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Caisses de retraite */}
            {caisses.map((caisse, index) => (
              <motion.div key={index} variants={itemVariants}>
                <InfoCard
                  icon={<Building className="h-6 w-6" />}
                  title={t(`resources.section.${caisse.key}.title`)}
                  variant={index === 0 ? 'highlight' : 'default'}
                >
                  <div className="space-y-4">
                    {/* Description */}
                    <div>
                      <p className="text-sm font-medium text-primary mb-2">📋 {t(`resources.section.${caisse.key}.description`)}</p>
                    </div>

                    {/* Contact Information */}
                    <div className="grid gap-3">
                      {/* Phone */}
                      <motion.div 
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Phone className="h-5 w-5 text-primary shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Téléphone / الهاتف</p>
                          <p className="text-foreground font-medium">{t(`resources.section.${caisse.key}.phone`)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyToClipboard(t(`resources.section.${caisse.key}.phone`))}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </motion.div>

                      {/* Email */}
                      <motion.div 
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Mail className="h-5 w-5 text-primary shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-foreground font-medium text-sm">{t(`resources.section.${caisse.key}.email`)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyToClipboard(t(`resources.section.${caisse.key}.email`))}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </motion.div>

                      {/* Website */}
                      <motion.div 
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Globe className="h-5 w-5 text-primary shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Site web / الموقع</p>
                          <p className="text-foreground font-medium text-sm">{t(`resources.section.${caisse.key}.website`)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenLink(t(`resources.section.${caisse.key}.website`))}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </motion.div>

                      {/* Hours */}
                      <motion.div 
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Clock className="h-5 w-5 text-primary shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Horaires / الساعات</p>
                          <p className="text-foreground font-medium text-sm">{t(`resources.section.${caisse.key}.hours`)}</p>
                        </div>
                      </motion.div>

                      {/* Services */}
                      <motion.div 
                        className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10"
                        whileHover={{ scale: 1.02 }}
                      >
                        <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Services disponibles</p>
                          <p className="text-foreground font-medium text-sm">{t(`resources.section.${caisse.key}.services`)}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </InfoCard>
              </motion.div>
            ))}

            {/* Useful Links */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<LinkIcon className="h-6 w-6" />}
                title={t('resources.section.links.title')}
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  {links.map((link, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleOpenLink(link.url)}
                      className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg text-left transition-colors hover:bg-secondary"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Globe className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <p className="text-foreground font-medium text-sm">{link.text}</p>
                        <p className="text-xs text-muted-foreground">{link.url}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </motion.button>
                  ))}
                </div>
              </InfoCard>
            </motion.div>

            {/* Help Section */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<Phone className="h-6 w-6" />}
                title={t('resources.section.help.title')}
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">{t('resources.section.help.text')}</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Button 
                      onClick={() => handleOpenLink('www.cnss.ma')}
                      className="w-full"
                    >
                      CNSS <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => handleOpenLink('www.cmr.gov.ma')}
                      className="w-full"
                    >
                      CMR <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => handleOpenLink('www.rcar.org.ma')}
                      className="w-full"
                    >
                      RCAR <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
              variants={itemVariants}
              className="bg-primary/5 border border-primary/20 rounded-xl p-6"
            >
              <div className="flex gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Conseil utile</h4>
                  <p className="text-sm text-muted-foreground">
                    Avant de vous déplacer, nous vous recommandons de vérifier les horaires d'ouverture et de prendre rendez-vous si nécessaire. 
                    Vous pouvez aussi consulter les sites officiels pour plus d'informations sur les démarches spécifiques.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ressources;
