import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import InfoCard from '@/components/InfoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  FileText, 
  Building, 
  Lightbulb, 
  CheckCircle,
  Clock,
  FolderOpen,
  CreditCard,
  Image,
  Users,
  Heart,
  DollarSign,
  Smile,
  Zap,
  Phone,
  MapPin,
  Briefcase,
  Target
} from 'lucide-react';
import prepareDocsImage from '@/assets/prepare-docs.jpg';

const AvantRetraite = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    age: '',
    ageRetraite: '',
    duree: '',
    regime: 'cnss',
    salaireMoyen: ''
  });
  const [pensionResult, setPensionResult] = useState<{
    pensionAnnuelle: number;
    pensionMensuelle: number;
    tauxRemplacement: number;
    dureeProjetion: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePension = () => {
    const dureeService = parseInt(formData.duree);
    const salaireMoyen = parseInt(formData.salaireMoyen) || 10000; // Salaire moyen par défaut
    const ageActuel = parseInt(formData.age);
    const ageRetraite = parseInt(formData.ageRetraite) || 60;
    
    let pensionAnnuelle = 0;
    let tauxRemplacement = 0;

    // Formules de calcul selon le régime
    if (formData.regime === 'cnss') {
      // CNSS: 50% du salaire moyen pour 15 ans + 1% par année supplémentaire
      if (dureeService >= 15) {
        tauxRemplacement = 50 + Math.min((dureeService - 15), 10); // Max 60%
      } else {
        tauxRemplacement = Math.max((dureeService / 15) * 50, 0); // Prorata
      }
      pensionAnnuelle = salaireMoyen * (tauxRemplacement / 100);
    } else if (formData.regime === 'cmr') {
      // CMR: Formule similaire à la CNSS
      if (dureeService >= 10) {
        tauxRemplacement = 50 + Math.min((dureeService - 10), 15); // Max 65%
      } else {
        tauxRemplacement = Math.max((dureeService / 10) * 50, 0);
      }
      pensionAnnuelle = salaireMoyen * (tauxRemplacement / 100);
    } else if (formData.regime === 'rcar') {
      // RCAR: À cotisations définies (environ 12% de cotisations)
      const cotisationAnnuelle = salaireMoyen * 0.12;
      const capitalAccumule = cotisationAnnuelle * dureeService * 1.02; // Intérêt 2%
      pensionAnnuelle = capitalAccumule / 20; // Rente sur 20 ans
      tauxRemplacement = (pensionAnnuelle / salaireMoyen) * 100;
    }

    const dureeProjetion = Math.max(85 - ageActuel, 20); // Projection jusqu'à 85 ans minimum
    
    setPensionResult({
      pensionAnnuelle: Math.round(pensionAnnuelle),
      pensionMensuelle: Math.round(pensionAnnuelle / 12),
      tauxRemplacement: Math.round(tauxRemplacement),
      dureeProjetion: dureeProjetion
    });
  };

  const handleCalculatePension = () => {
    if (formData.age && formData.duree && formData.salaireMoyen) {
      calculatePension();
    } else {
      alert('Veuillez remplir tous les champs (Âge, Durée, Salaire moyen)');
    }
  };

  const handleSiteOfficiel = () => {
    window.open('https://www.cnss.ma', '_blank');
  };

  const handleInscription = () => {
    alert('Inscription aux programmes de voyages en cours de traitement...');
  };

  const documents = [
    { key: 'before.doc.cin', icon: <CreditCard className="h-5 w-5" /> },
    { key: 'before.doc.birth', icon: <FileText className="h-5 w-5" /> },
    { key: 'before.doc.family', icon: <Users className="h-5 w-5" /> },
    { key: 'before.doc.work', icon: <FolderOpen className="h-5 w-5" /> },
    { key: 'before.doc.salary', icon: <FileText className="h-5 w-5" /> },
    { key: 'before.doc.rib', icon: <CreditCard className="h-5 w-5" /> },
    { key: 'before.doc.photo', icon: <Image className="h-5 w-5" /> },
  ];

  const organizations = [
    t('before.org.cnss'),
    t('before.org.cmr'),
    t('before.org.rcar'),
  ];

  const tips = [
    t('before.tip.1'),
    t('before.tip.2'),
    t('before.tip.3'),
    t('before.tip.4'),
  ];

  const section1Items = [
    { label: t('before.section.1.ageActuel'), placeholder: t('before.section.1.agePlaceholder'), name: 'age' },
    { label: t('before.section.1.ageRetraite'), placeholder: t('before.section.1.ageRetraitePlaceholder'), name: 'ageRetraite' },
    { label: t('before.section.1.dureeCotisation'), placeholder: t('before.section.1.dureeCotisationPlaceholder'), name: 'duree' },
    { label: t('before.section.1.salaireMoyen'), placeholder: t('before.section.1.salaireMoyenPlaceholder'), name: 'salaireMoyen' },
  ];

  const healthTips = [
    t('before.section.3.activite'),
    t('before.section.3.nutrition'),
    t('before.section.3.medical'),
    t('before.section.3.sommeil'),
    t('before.section.3.social'),
  ];

  const contacts = [
    { text: t('before.section.2.cnssPhone') },
    { text: t('before.section.2.cmrPhone') },
    { text: t('before.section.2.rcarPhone') },
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
      <section className="relative py-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1 }}
        >
          <img 
            src={prepareDocsImage} 
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
              {t('before.title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-primary font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('before.subtitle')}
            </motion.p>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('before.intro')}
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
            {/* Section 1: Informations personnelles et préparation */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<Users className="h-6 w-6" />}
                title={t('before.section.1.title')}
                variant="highlight"
              >
                <div className="space-y-4">
                  {section1Items.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{item.label}</label>
                      <Input 
                        placeholder={item.placeholder}
                        className="bg-secondary/50"
                        name={item.name}
                        value={formData[item.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        type="number"
                      />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('before.section.1.regime')}</label>
                    <Select value={formData.regime} onValueChange={(value) => setFormData(prev => ({ ...prev, regime: value }))}>
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue placeholder="CNSS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cnss">CNSS</SelectItem>
                        <SelectItem value="cmr">CMR</SelectItem>
                        <SelectItem value="rcar">RCAR</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full mt-4" onClick={handleCalculatePension}>
                    {t('before.section.1.simulatorBtn')}
                  </Button>
                  
                  {pensionResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20 space-y-3"
                    >
                      <h4 className="font-semibold text-foreground">📊 Résultats de votre simulation</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background rounded p-3">
                          <p className="text-xs text-muted-foreground">{t('before.section.1.result.pensionMensuelle')}</p>
                          <p className="text-xl font-bold text-primary">{pensionResult.pensionMensuelle.toLocaleString()} DH</p>
                        </div>
                        <div className="bg-background rounded p-3">
                          <p className="text-xs text-muted-foreground">{t('before.section.1.result.pensionAnnuelle')}</p>
                          <p className="text-xl font-bold text-primary">{pensionResult.pensionAnnuelle.toLocaleString()} DH</p>
                        </div>
                        <div className="bg-background rounded p-3">
                          <p className="text-xs text-muted-foreground">{t('before.section.1.result.tauxRemplacement')}</p>
                          <p className="text-xl font-bold text-primary">{pensionResult.tauxRemplacement}%</p>
                        </div>
                        <div className="bg-background rounded p-3">
                          <p className="text-xs text-muted-foreground">{t('before.section.1.result.dureeProjetion')}</p>
                          <p className="text-xl font-bold text-primary">{pensionResult.dureeProjetion} ans</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        💡 Note: Cette simulation est estimative. Pour un calcul précis, consultez votre caisse de retraite.
                      </p>
                    </motion.div>
                  )}
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 2: Droits et formalités */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<FileText className="h-6 w-6" />}
                title={t('before.section.2.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">{t('before.section.2.docNecessaires')}</h4>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground">{t('before.section.2.cin')}</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground">{t('before.section.2.salaire')}</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground">{t('before.section.2.attestation')}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.2.procedure')}</h4>
                    <p className="text-muted-foreground mb-3">{t('before.section.2.procedureText')}</p>
                    <Button variant="outline" className="w-full" onClick={handleSiteOfficiel}>{t('before.section.2.siteOfficiel')}</Button>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.2.delais')}</h4>
                    <p className="text-muted-foreground">{t('before.section.2.delaisText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-3">{t('before.section.2.contacts')}</h4>
                    <ul className="space-y-2">
                      {contacts.map((contact, index) => (
                        <li key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                          <Phone className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-foreground text-sm">{contact.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 3: Santé et assurance */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<Heart className="h-6 w-6" />}
                title={t('before.section.3.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.3.amo')}</h4>
                    <p className="text-muted-foreground">{t('before.section.3.amoText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-3">{t('before.section.3.prevention')}</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('before.section.3.vaccins')}</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('before.section.3.depistage')}</span>
                      </li>
                      <li className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground text-sm">{t('before.section.3.suivi')}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-3">{t('before.section.3.conseils')}</h4>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {healthTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <Zap className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span className="text-foreground text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 4: Finances et gestion */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<DollarSign className="h-6 w-6" />}
                title={t('before.section.4.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.4.budget')}</h4>
                    <p className="text-muted-foreground">{t('before.section.4.budgetText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.4.gestion')}</h4>
                    <p className="text-muted-foreground">{t('before.section.4.gestionText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.4.avantages')}</h4>
                    <p className="text-muted-foreground">{t('before.section.4.avantagesText')}</p>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 5: Activités et loisirs */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<Smile className="h-6 w-6" />}
                title={t('before.section.5.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.5.clubs')}</h4>
                    <p className="text-muted-foreground">{t('before.section.5.clubsText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.5.formations')}</h4>
                    <p className="text-muted-foreground">{t('before.section.5.formationsText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.5.voyages')}</h4>
                    <p className="text-muted-foreground mb-3">{t('before.section.5.voyagesText')}</p>
                    <Button className="w-full" onClick={handleInscription}>{t('before.section.5.inscription')}</Button>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Section 6: Conseils pratiques */}
            <motion.div variants={itemVariants}>
              <InfoCard
                icon={<Lightbulb className="h-6 w-6" />}
                title={t('before.section.6.title')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.6.transition')}</h4>
                    <p className="text-muted-foreground">{t('before.section.6.transitionText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.6.social')}</h4>
                    <p className="text-muted-foreground">{t('before.section.6.socialText')}</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('before.section.6.planification')}</h4>
                    <p className="text-muted-foreground">{t('before.section.6.planificationText')}</p>
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

export default AvantRetraite;
