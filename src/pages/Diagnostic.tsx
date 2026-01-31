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
import { Calculator, CheckCircle, AlertTriangle, TrendingUp, ArrowRight, ArrowLeft, RotateCcw, DollarSign } from 'lucide-react';
import diagnosticImage from '@/assets/diagnostic.jpg';

type Organization = 'cnss' | 'cmr' | 'rcar';

interface PensionResult {
  monthlyPension: number;
  annualPension: number;
  calculationBreakdown: {
    salary: number;
    years: number;
    rate: number;
    percentage: number;
  };
  organization: Organization;
  warnings: string[];
}

const Diagnostic = () => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [years, setYears] = useState('');
  const [salary, setSalary] = useState('');
  const [organization, setOrganization] = useState<Organization | ''>('');
  const [result, setResult] = useState<PensionResult | null>(null);

  const calculatePension = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentAgeNum = parseInt(currentAge);
    const retirementAgeNum = parseInt(retirementAge);
    const yearsNum = parseInt(years);
    const salaryNum = parseFloat(salary);

    if (!currentAgeNum || !retirementAgeNum || !yearsNum || !salaryNum || !organization) return;

    // Formule: pension = salaire × (2.5% × années cotisées)
    const percentageRate = 2.5; // 2.5% par année
    const totalPercentage = percentageRate * yearsNum;
    const monthlyPension = salaryNum * (totalPercentage / 100);
    const annualPension = monthlyPension * 12;

    const warnings: string[] = [];

    if (yearsNum < 10) {
      warnings.push(yearsNum < 5 ? t('diagnostic.warning.veryLow') : t('diagnostic.warning.low'));
    }
    
    if (monthlyPension < 1000) {
      warnings.push(t('diagnostic.warning.lowPension'));
    }

    if (totalPercentage > 100) {
      warnings.push(t('diagnostic.warning.maxPension'));
    }

    // Avertissement si l'âge de départ n'est pas valide
    if (retirementAgeNum <= currentAgeNum) {
      warnings.push(t('diagnostic.warning.invalidAge'));
    }

    setResult({
      monthlyPension,
      annualPension,
      calculationBreakdown: {
        salary: salaryNum,
        years: yearsNum,
        rate: percentageRate,
        percentage: totalPercentage,
      },
      organization: organization as Organization,
      warnings,
    });
  };
  };

  const resetForm = () => {
    setCurrentAge('');
    setRetirementAge('');
    setYears('');
    setSalary('');
    setOrganization('');
    setResult(null);
  };

  const formFields = [
    { id: 'currentAge', filled: !!currentAge },
    { id: 'retirementAge', filled: !!retirementAge },
    { id: 'years', filled: !!years },
    { id: 'salary', filled: !!salary },
    { id: 'organization', filled: !!organization },
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
              className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <Calculator className="h-10 w-10" />
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
                  onSubmit={calculatePension} 
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
                    {/* Current Age */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="currentAge" className="text-lg font-medium">
                        {t('diagnostic.form.currentAge')}
                      </Label>
                      <Input
                        id="currentAge"
                        type="number"
                        min="18"
                        max="100"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        placeholder={t('diagnostic.form.currentAge.placeholder')}
                        className="h-14 text-lg transition-all focus:scale-[1.01]"
                        required
                      />
                    </motion.div>

                    {/* Retirement Age */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <Label htmlFor="retirementAge" className="text-lg font-medium">
                        {t('diagnostic.form.retirementAge')}
                      </Label>
                      <Input
                        id="retirementAge"
                        type="number"
                        min="18"
                        max="100"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                        placeholder={t('diagnostic.form.retirementAge.placeholder')}
                        className="h-14 text-lg transition-all focus:scale-[1.01]"
                        required
                      />
                    </motion.div>

                    {/* Years of Contribution */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
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
                      <p className="text-xs text-muted-foreground">{t('diagnostic.form.years.hint')}</p>
                    </motion.div>

                    {/* Salary */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Label htmlFor="salary" className="text-lg font-medium">
                        {t('diagnostic.form.salary')}
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="salary"
                          type="number"
                          min="0"
                          step="100"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          placeholder={t('diagnostic.form.salary.placeholder')}
                          className="h-14 text-lg pl-10 transition-all focus:scale-[1.01]"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{t('diagnostic.form.salary.hint')}</p>
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
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Formula Info */}
                    <motion.div 
                      className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <p className="text-sm font-semibold text-foreground">{t('diagnostic.form.formula')}</p>
                      <p className="text-sm text-muted-foreground">{t('diagnostic.form.formulaDesc')}</p>
                      <code className="block text-xs bg-background rounded p-2 mt-2 text-primary font-mono">
                        Pension = Salaire × (2.5% × années)
                      </code>
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full h-16 text-xl mt-4 bg-primary hover:bg-primary/90"
                          disabled={!currentAge || !retirementAge || !years || !salary || !organization}
                        >
                          {t('diagnostic.form.calculate')}
                          <Calculator className="h-6 w-6 ms-2" />
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
                      <TrendingUp className="h-10 w-10" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      {t('diagnostic.result.title')}
                    </h2>
                    <p className="text-muted-foreground">{t('diagnostic.result.subtitle')}</p>
                  </motion.div>

                  {/* Main Results */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.div 
                      className="bg-primary/10 rounded-xl p-6 border border-primary/20"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-sm text-muted-foreground mb-2">{t('diagnostic.result.monthly')}</p>
                      <p className="text-4xl font-bold text-primary">
                        {result.monthlyPension.toLocaleString('fr-FR', { 
                          minimumFractionDigits: 0, 
                          maximumFractionDigits: 0 
                        })} DH
                      </p>
                    </motion.div>

                    <motion.div 
                      className="bg-secondary/50 rounded-xl p-6 border border-primary/10"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-sm text-muted-foreground mb-2">{t('diagnostic.result.annual')}</p>
                      <p className="text-4xl font-bold text-foreground">
                        {result.annualPension.toLocaleString('fr-FR', { 
                          minimumFractionDigits: 0, 
                          maximumFractionDigits: 0 
                        })} DH
                      </p>
                    </motion.div>
                  </div>

                  {/* Calculation Breakdown */}
                  <motion.div 
                    className="bg-secondary/30 rounded-xl p-6 mb-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="font-semibold text-foreground">{t('diagnostic.result.breakdown')}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{t('diagnostic.result.salary')}:</span>
                        <span className="font-semibold">{result.calculationBreakdown.salary.toLocaleString('fr-FR')} DH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{t('diagnostic.result.years')}:</span>
                        <span className="font-semibold">{result.calculationBreakdown.years} {t('diagnostic.result.yearsUnit')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{t('diagnostic.result.rate')}:</span>
                        <span className="font-semibold">{result.calculationBreakdown.rate}% × {result.calculationBreakdown.years} = {result.calculationBreakdown.percentage}%</span>
                      </div>
                      <div className="border-t border-primary/10 pt-3 flex justify-between items-center font-bold">
                        <span>{t('diagnostic.result.formula')}:</span>
                        <span>{result.calculationBreakdown.salary} × {(result.calculationBreakdown.percentage / 100).toFixed(2)} = {result.monthlyPension.toFixed(0)} DH/mois</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <motion.div 
                      className="space-y-3 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {result.warnings.map((warning, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start gap-3 p-4 bg-coral/10 border border-coral/20 rounded-lg"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          <AlertTriangle className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                          <p className="text-foreground text-sm">{warning}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Info Box */}
                  <motion.div 
                    className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t('diagnostic.result.disclaimer')}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
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
                      {t('diagnostic.result.recalculate')}
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
