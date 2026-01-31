import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import { FileText, Heart, Lightbulb, ArrowRight, ArrowLeft, ClipboardCheck } from 'lucide-react';
import heroImage from '@/assets/hero-retirement.jpg';
import prepareDocsImage from '@/assets/prepare-docs.jpg';
import afterRetirementImage from '@/assets/after-retirement.jpg';

const Home = () => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

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
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img 
            src={heroImage} 
            alt="Couple marocain profitant de leur retraite" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>

        <div className="content-container relative z-10 py-20">
          <motion.div 
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-foreground mb-6"
              variants={itemVariants}
            >
              {t('home.hero.title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-10 max-w-2xl"
              variants={itemVariants}
            >
              {t('home.hero.subtitle')}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start gap-4"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="text-lg px-8 py-6 gap-2 group">
                <Link to="/avant-retraite">
                  {t('home.cta.before')}
                  <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 gap-2 group bg-card/80 backdrop-blur-sm">
                <Link to="/apres-retraite">
                  {t('home.cta.after')}
                  <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" className="text-lg px-8 py-6 gap-2 bg-coral hover:bg-coral/90 text-coral-foreground group">
                <Link to="/diagnostic">
                  <ClipboardCheck className="h-5 w-5" />
                  {t('home.cta.diagnostic')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Why Section */}
      <section className="section-padding bg-card relative">
        <div className="content-container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-4">{t('home.section.why.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('home.section.why.text')}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<FileText className="h-7 w-7" />}
                title={t('home.feature.info.title')}
                description={t('home.feature.info.text')}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<Heart className="h-7 w-7" />}
                title={t('home.feature.support.title')}
                description={t('home.feature.support.text')}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<Lightbulb className="h-7 w-7" />}
                title={t('home.feature.practical.title')}
                description={t('home.feature.practical.text')}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Two Paths Section */}
      <section className="section-padding">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before Retirement Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/avant-retraite" className="group block">
                <div className="relative overflow-hidden rounded-2xl card-shadow transition-smooth group-hover:card-hover-shadow">
                  <motion.img 
                    src={prepareDocsImage} 
                    alt="Préparation à la retraite"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                      {t('home.cta.before')}
                    </h3>
                    <p className="text-primary-foreground/80">
                      {t('before.subtitle')}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-primary-foreground">
                      <span className="font-medium">{t('home.cta.before')}</span>
                      <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* After Retirement Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/apres-retraite" className="group block">
                <div className="relative overflow-hidden rounded-2xl card-shadow transition-smooth group-hover:card-hover-shadow">
                  <motion.img 
                    src={afterRetirementImage} 
                    alt="Vie après la retraite"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                      {t('home.cta.after')}
                    </h3>
                    <p className="text-primary-foreground/80">
                      {t('after.subtitle')}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-primary-foreground">
                      <span className="font-medium">{t('home.cta.after')}</span>
                      <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-primary/5">
        <div className="content-container">
          <motion.div 
            className="bg-card rounded-3xl p-8 md:p-12 card-shadow text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-coral/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-2xl bg-coral/10 flex items-center justify-center text-coral mx-auto mb-6"
              >
                <ClipboardCheck className="h-10 w-10" />
              </motion.div>
              <h2 className="text-foreground mb-4">{t('diagnostic.title')}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t('diagnostic.subtitle')}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="text-lg px-10 py-6 bg-coral hover:bg-coral/90 text-coral-foreground">
                  <Link to="/diagnostic">
                    <ClipboardCheck className="h-5 w-5 me-2" />
                    {t('home.cta.diagnostic')}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
