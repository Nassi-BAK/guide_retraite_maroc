import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClipboardCheck, CheckCircle, AlertTriangle, PartyPopper, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import diagnosticImage from '@/assets/diagnostic.jpg';

type Status = 'before' | 'after';
type Organization = 'cnss' | 'cmr' | 'rcar' | 'other';

interface DiagnosticResult {
  status: Status;
  age: number;
  years: number;
  organization: Organization;
}

const Diagnostic = () => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  
  const [age, setAge] = useState('');
  const [status, setStatus] = useState<Status | ''>('');
  const [organization, setOrganization] = useState<Organization | ''>('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && status && organization && years) {
      setResult({
        status: status as Status,
        age: parseInt(age),
        years: parseInt(years),
        organization: organization as Organization,
      });
    }
  };

  const getResultMessages = (result: DiagnosticResult): string[] => {
    const messages: string[] = [];
    
    if (result.status === 'before') {
      if (result.age < 55) {
        messages.push(t('diagnostic.result.before.young'));
      } else {
        messages.push(t('diagnostic.result.before.soon'));
      }
    } else {
      messages.push(t('diagnostic.result.after'));
    }
    
    if (result.years < 10) {
      messages.push(t('diagnostic.result.low.years'));
    } else if (result.years >= 20) {
      messages.push(t('diagnostic.result.good.years'));
    }
    
    return messages;
  };

  const resetForm = () => {
    setAge('');
    setStatus('');
    setOrganization('');
    setYears('');
    setResult(null);
  };

  const formFields = [
    { id: 'age', filled: !!age },
    { id: 'status', filled: !!status },
    { id: 'organization', filled: !!organization },
    { id: 'years', filled: !!years },
  ];

  const progress = formFields.filter(f => f.filled).length / formFields.length * 100;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1 }}
        >
          <img 
            src={diagnosticImage} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0" />
        
        <div className="content-container relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 rounded-2xl bg-coral/10 flex items-center justify-center text-coral mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <ClipboardCheck className="h-10 w-10" />
            </motion.div>
            <motion.h1 
              className="text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('diagnostic.title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-primary font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('diagnostic.subtitle')}
            </motion.p>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t('diagnostic.intro')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding pt-0">
        <div className="content-container">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {!result ? (
                /* Form */
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="bg-card rounded-2xl p-8 card-shadow relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-secondary">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="grid gap-6 pt-4">
                    {/* Age */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="age" className="text-lg font-medium">
                        {t('diagnostic.form.age')}
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder={t('diagnostic.form.age.placeholder')}
                        className="h-14 text-lg transition-all focus:scale-[1.01]"
                        required
                      />
                    </motion.div>

                    {/* Status */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="status" className="text-lg font-medium">
                        {t('diagnostic.form.status')}
                      </Label>
                      <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
                        <SelectTrigger className="h-14 text-lg">
                          <SelectValue placeholder={t('diagnostic.form.status')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before" className="text-lg py-3">
                            {t('diagnostic.form.status.before')}
                          </SelectItem>
                          <SelectItem value="after" className="text-lg py-3">
                            {t('diagnostic.form.status.after')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Organization */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="organization" className="text-lg font-medium">
                        {t('diagnostic.form.org')}
                      </Label>
                      <Select value={organization} onValueChange={(value) => setOrganization(value as Organization)}>
                        <SelectTrigger className="h-14 text-lg">
                          <SelectValue placeholder={t('diagnostic.form.org')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cnss" className="text-lg py-3">
                            {t('diagnostic.form.org.cnss')}
                          </SelectItem>
                          <SelectItem value="cmr" className="text-lg py-3">
                            {t('diagnostic.form.org.cmr')}
                          </SelectItem>
                          <SelectItem value="rcar" className="text-lg py-3">
                            {t('diagnostic.form.org.rcar')}
                          </SelectItem>
                          <SelectItem value="other" className="text-lg py-3">
                            {t('diagnostic.form.org.other')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Years */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="years" className="text-lg font-medium">
                        {t('diagnostic.form.years')}
                      </Label>
                      <Input
                        id="years"
                        type="number"
                        min="0"
                        max="50"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        placeholder={t('diagnostic.form.years.placeholder')}
                        className="h-14 text-lg transition-all focus:scale-[1.01]"
                        required
                      />
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full h-16 text-xl mt-4 bg-coral hover:bg-coral/90 text-coral-foreground"
                          disabled={!age || !status || !organization || !years}
                        >
                          {t('diagnostic.form.submit')}
                          <ArrowIcon className="h-6 w-6 ms-2" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.form>
              ) : (
                /* Result */
                <motion.div 
                  key="result"
                  className="bg-card rounded-2xl p-8 card-shadow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                    >
                      <PartyPopper className="h-10 w-10" />
                    </motion.div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {t('diagnostic.result.title')}
                    </h2>
                  </motion.div>

                  <div className="space-y-4 mb-8">
                    {getResultMessages(result).map((message, index) => {
                      const isWarning = message.includes('Attention') || message.includes('تنبيه');
                      const isGood = message.includes('Bonne nouvelle') || message.includes('Félicitations') || message.includes('خبر سار') || message.includes('تهانينا');
                      
                      return (
                        <motion.div 
                          key={index}
                          className={`flex items-start gap-4 p-4 rounded-xl ${
                            isWarning 
                              ? 'bg-coral/10 border border-coral/20' 
                              : isGood 
                                ? 'bg-primary/10 border border-primary/20'
                                : 'bg-secondary'
                          }`}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.15 }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, delay: 0.5 + index * 0.15 }}
                          >
                            {isWarning ? (
                              <AlertTriangle className="h-6 w-6 text-coral shrink-0" />
                            ) : (
                              <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                            )}
                          </motion.div>
                          <p className="text-foreground text-lg">{message}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={resetForm}
                      variant="outline"
                      size="lg"
                      className="w-full h-14 text-lg gap-2"
                    >
                      <RotateCcw className="h-5 w-5" />
                      {dir === 'rtl' ? 'إعادة التشخيص' : 'Refaire le diagnostic'}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Diagnostic;
