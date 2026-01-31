import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import InfoCard from '@/components/InfoCard';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  HeartPulse, 
  Sun, 
  Scale,
  CheckCircle,
  AlertCircle,
  Users,
  Bus,
  Palette,
  DollarSign,
  TrendingUp,
  Home,
  Book,
  Heart,
  Smile,
  Target,
  Download,
  ExternalLink
} from 'lucide-react';
import afterRetirementImage from '@/assets/after-retirement.jpg';

const ApresRetraite = () => {
  const { t } = useLanguage();

  const handleDownloadGuide = () => {
    alert('Téléchargement du guide en cours...');
  };

  const handleAccessServices = () => {
    window.open('https://www.cnss.ma', '_blank');
  };

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
      <section className="relative py-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <img 
            src={afterRetirementImage} 
            alt="" 
            className="w-full h-full object-cover blur-sm"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />
        
        <div className="content-container relative z-10">
          <motion.div 
            className="text-center"
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
              {t('after.title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-primary font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('after.subtitle')}
            </motion.p>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('after.intro')}
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
            {/* Section 1: Pension et finances */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<DollarSign className="h-6 w-6" />}
                title={t('after.section.1.title')}
                variant="highlight"
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.1.montant')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.1.montantText')}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.1.periodicite')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.1.periodicitiesText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.1.avantagesFiscaux')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.1.avantagesFiscauxText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.1.budget')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.1.budgetText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.1.investissement')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.1.investissementText')}</p>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 2: Santé et assurance */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<HeartPulse className="h-6 w-6" />}
                title={t('after.section.2.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.2.couverture')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.2.couvertureText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-3">{t('after.section.2.acces')}</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('after.section.2.accesList1')}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('after.section.2.accesList2')}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('after.section.2.accesList3')}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-3">{t('after.section.2.bienVieillir')}</h4>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      <li className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <span className="text-primary mt-1">💪</span>
                        <span className="text-foreground text-sm">{t('after.section.2.activitePhysique')}</span>
                      </li>
                      <li className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <span className="text-primary mt-1">🥗</span>
                        <span className="text-foreground text-sm">{t('after.section.2.nutrition')}</span>
                      </li>
                      <li className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10 sm:col-span-2">
                        <span className="text-primary mt-1">👨‍⚕️</span>
                        <span className="text-foreground text-sm">{t('after.section.2.suivi')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 3: Loisirs et activités */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<Palette className="h-6 w-6" />}
                title={t('after.section.3.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.3.clubs')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.3.clubsText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.3.programmes')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.3.programmesText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.3.benevola')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.3.benevoleText')}</p>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 4: Vie quotidienne et services */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<Home className="h-6 w-6" />}
                title={t('after.section.4.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.4.transport')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.4.transportText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-3">{t('after.section.4.administratif')}</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('after.section.4.administratifList1')}</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('after.section.4.administratifList2')}</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('after.section.4.administratifList3')}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.4.logement')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.4.logementText')}</p>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 5: Conseils pratiques et bien-être */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<Heart className="h-6 w-6" />}
                title={t('after.section.5.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.5.reseau')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.5.reseauText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.5.activites')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.5.activitesText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('after.section.5.projets')}</h4>
                    <p className="text-muted-foreground text-sm">{t('after.section.5.projetsText')}</p>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handleAccessServices}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('after.section.5.services')}
                    </Button>
                  </div>
                </div>
              </InfoCard>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ApresRetraite;
