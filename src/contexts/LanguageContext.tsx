import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.before': 'Avant la retraite',
    'nav.after': 'Après la retraite',
    'nav.diagnostic': 'Diagnostic Retraite',
    'nav.resources': 'Ressources et Contacts',
    
    // Home page
    'home.hero.title': 'Votre guide pour une retraite sereine au Maroc',
    'home.hero.subtitle': 'Des informations claires et accessibles pour préparer et vivre votre retraite en toute tranquillité.',
    'home.cta.before': 'Avant la retraite',
    'home.cta.after': 'Après la retraite',
    'home.cta.diagnostic': 'Faire le diagnostic',
    
    'home.section.why.title': 'Pourquoi ce guide ?',
    'home.section.why.text': 'La retraite est une étape importante de la vie. Ce guide vous accompagne avec des informations simples et pratiques, adaptées au contexte marocain.',
    
    'home.feature.info.title': 'Informations claires',
    'home.feature.info.text': 'Des explications simples sur vos droits et démarches.',
    'home.feature.support.title': 'Accompagnement humain',
    'home.feature.support.text': 'Un guide pensé pour vous, avec bienveillance.',
    'home.feature.practical.title': 'Conseils pratiques',
    'home.feature.practical.text': 'Des astuces pour le quotidien après la retraite.',
    
    // Before retirement page
    'before.title': 'Avant la retraite',
    'before.subtitle': 'Préparez sereinement votre départ à la retraite',
    'before.intro': 'Une bonne préparation est la clé d\'une retraite sereine. Voici les étapes et documents essentiels pour anticiper votre départ.',
    
    'before.section.when.title': 'Quand commencer les démarches ?',
    'before.section.when.text': 'Commencez vos démarches 6 mois à 1 an avant la date prévue de votre retraite. Cela vous laisse le temps de rassembler tous les documents nécessaires.',
    
    'before.section.docs.title': 'Documents nécessaires',
    'before.doc.cin': 'Copie de la CIN (Carte d\'Identité Nationale)',
    'before.doc.birth': 'Acte de naissance',
    'before.doc.family': 'Livret de famille',
    'before.doc.work': 'Attestations de travail',
    'before.doc.salary': 'Bulletins de salaire récents',
    'before.doc.rib': 'RIB bancaire',
    'before.doc.photo': 'Photos d\'identité récentes',
    
    'before.section.orgs.title': 'Les organismes de retraite',
    'before.org.cnss': 'CNSS - Caisse Nationale de Sécurité Sociale (secteur privé)',
    'before.org.cmr': 'CMR - Caisse Marocaine des Retraites (fonctionnaires)',
    'before.org.rcar': 'RCAR - Régime Collectif d\'Allocation de Retraite (établissements publics)',
    
    'before.section.tips.title': 'Conseils pratiques',
    'before.tip.1': 'Vérifiez régulièrement votre relevé de carrière',
    'before.tip.2': 'Conservez tous vos documents de travail',
    'before.tip.3': 'Renseignez-vous sur vos droits à la formation',
    'before.tip.4': 'Planifiez votre budget pour la retraite',
    
    // Before retirement - 6 sections
    'before.section.1.title': 'Informations personnelles et préparation',
    'before.section.1.ageActuel': 'Âge actuel',
    'before.section.1.agePlaceholder': 'Entrez votre âge',
    'before.section.1.ageRetraite': 'Âge prévu de départ à la retraite',
    'before.section.1.ageRetraitePlaceholder': 'Ex : 60 ans',
    'before.section.1.dureeCotisation': 'Durée de cotisation',
    'before.section.1.dureeCotisationPlaceholder': 'Nombre d\'années',
    'before.section.1.salaireMoyen': 'Salaire moyen mensuel (DH)',
    'before.section.1.salaireMoyenPlaceholder': 'Ex : 10000 DH',
    'before.section.1.regime': 'Régime de retraite',
    'before.section.1.simulator': 'Simulateur de pension estimée',
    'before.section.1.simulatorBtn': 'Calculer ma pension',
    'before.section.1.result.pensionMensuelle': 'Pension mensuelle estimée',
    'before.section.1.result.pensionAnnuelle': 'Pension annuelle estimée',
    'before.section.1.result.tauxRemplacement': 'Taux de remplacement',
    'before.section.1.result.dureeProjetion': 'Durée de projection',
    
    'before.section.2.title': 'Droits et formalités',
    'before.section.2.docNecessaires': 'Documents nécessaires',
    'before.section.2.cin': 'Carte d\'identité nationale',
    'before.section.2.salaire': 'Bulletins de salaire',
    'before.section.2.attestation': 'Attestations de cotisation',
    'before.section.2.procedure': 'Procédure de demande',
    'before.section.2.procedureText': 'La demande de retraite doit être effectuée auprès de votre organisme de retraite (CNSS, CMR ou RCAR).',
    'before.section.2.siteOfficiel': 'Consulter le site officiel',
    'before.section.2.delais': 'Délais estimés',
    'before.section.2.delaisText': 'Le traitement de votre dossier prend généralement entre 2 à 3 mois.',
    'before.section.2.contacts': 'Contacts utiles',
    'before.section.2.cnssPhone': 'CNSS : +212 (0) 522 47 76 60',
    'before.section.2.cmrPhone': 'CMR : +212 (0) 537 54 49 80',
    'before.section.2.rcarPhone': 'RCAR : +212 (0) 537 71 44 44',
    
    'before.section.3.title': 'Santé et assurance',
    'before.section.3.amo': 'Assurance maladie après retraite',
    'before.section.3.amoText': 'Vous continuez à bénéficier de votre couverture maladie obligatoire (AMO) après votre retraite.',
    'before.section.3.prevention': 'Programmes de prévention et santé',
    'before.section.3.vaccins': 'Vaccins recommandés pour les seniors',
    'before.section.3.depistage': 'Dépistages réguliers (cancer, diabète, etc.)',
    'before.section.3.suivi': 'Suivi médical régulier',
    'before.section.3.conseils': 'Conseils pour bien vieillir',
    'before.section.3.activite': 'Activité physique régulière (marche, gym, yoga)',
    'before.section.3.nutrition': 'Alimentation équilibrée et saine',
    'before.section.3.medical': 'Suivi médical régulier et prévention',
    'before.section.3.sommeil': 'Sommeil suffisant et régulier',
    'before.section.3.social': 'Maintien des liens sociaux et familiaux',
    
    'before.section.4.title': 'Finances et gestion',
    'before.section.4.budget': 'Budget mensuel conseillé',
    'before.section.4.budgetText': 'Commencez à établir un budget prévisionnel en tenant compte de votre pension estimée et de vos dépenses régulières.',
    'before.section.4.gestion': 'Gestion des économies et investissements',
    'before.section.4.gestionText': 'Consultez un conseiller financier pour planifier vos investissements et sécuriser votre patrimoine.',
    'before.section.4.avantages': 'Avantages fiscaux pour retraités',
    'before.section.4.avantagesText': 'Les retraités bénéficient de certains avantages fiscaux. Renseignez-vous auprès du fisc marocain pour optimiser votre déclaration.',
    
    'before.section.5.title': 'Activités et loisirs',
    'before.section.5.clubs': 'Clubs et associations pour retraités',
    'before.section.5.clubsText': 'Rejoignez des clubs de retraités dans votre région pour des activités sociales et culturelles.',
    'before.section.5.formations': 'Formations et activités sociales',
    'before.section.5.formationsText': 'Accédez à des formations continues et ateliers dans les centres culturels.',
    'before.section.5.voyages': 'Voyages et programmes d\'estivage',
    'before.section.5.voyagesText': 'De nombreux organismes proposent des voyages et des séjours spécialisés pour les seniors.',
    'before.section.5.inscription': 'S\'inscrire aux programmes',
    
    'before.section.6.title': 'Conseils pratiques',
    'before.section.6.transition': 'Transition emploi → retraite',
    'before.section.6.transitionText': 'Cette période peut être difficile psychologiquement. Préparez-vous en identifiant des projets personnels et des objectifs pour cette nouvelle phase.',
    'before.section.6.social': 'Maintenir un réseau social actif',
    'before.section.6.socialText': 'Participez à des clubs, groupes WhatsApp, associations et activités communautaires pour rester engagé et combattre l\'isolement.',
    'before.section.6.planification': 'Planification des projets personnels',
    'before.section.6.planificationText': 'Utilisez votre nouvelle liberté pour réaliser vos projets : loisirs créatifs, bénévolat, voyages, apprentissage...',
    
    // After retirement page
    'after.title': 'Après la retraite',
    'after.subtitle': 'Vivez pleinement votre nouvelle vie',
    'after.intro': 'La retraite est le début d\'une nouvelle aventure. Voici tout ce que vous devez savoir pour profiter de cette période.',
    
    // After retirement - 5 sections
    'after.section.1.title': 'Pension et finances',
    'after.section.1.montant': 'Montant de la pension',
    'after.section.1.montantText': 'Votre pension est versée mensuellement sur votre compte bancaire. Vérifiez régulièrement le virement.',
    'after.section.1.periodicite': 'Périodicité',
    'after.section.1.periodicitiesText': 'Paiement mensuel automatique. Vous pouvez aussi demander un virement trimestriel si nécessaire.',
    'after.section.1.avantagesFiscaux': 'Avantages fiscaux pour retraités',
    'after.section.1.avantagesFiscauxText': 'Les retraités bénéficient de réductions d\'impôts. Consultez l\'administration fiscale pour optimiser votre déclaration.',
    'after.section.1.budget': 'Gestion du budget',
    'after.section.1.budgetText': 'Établissez un budget mensuel basé sur votre pension et vos dépenses régulières. Prévoyez une épargne pour les imprévus.',
    'after.section.1.investissement': 'Conseils pour investissements sûrs',
    'after.section.1.investissementText': 'Consultez un conseiller financier pour des placements sécurisés: obligations, immobilier, épargne réglementée.',
    
    'after.section.2.title': 'Santé et assurance',
    'after.section.2.couverture': 'Couverture santé après retraite',
    'after.section.2.couvertureText': 'Vous conservez votre AMO (Assurance Maladie Obligatoire). Complétez avec une mutuelle pour meilleure couverture.',
    'after.section.2.acces': 'Accès aux services de santé',
    'after.section.2.accesList1': 'Centres de santé et hôpitaux conventionnés',
    'after.section.2.accesList2': 'Programmes de prévention (vaccins, dépistages)',
    'after.section.2.accesList3': 'Consultations spécialisées et suivi médical',
    'after.section.2.bienVieillir': 'Conseils pour bien vieillir',
    'after.section.2.activitePhysique': 'Activité physique adaptée (marche, natation, gym douce)',
    'after.section.2.nutrition': 'Alimentation équilibrée et hydratation suffisante',
    'after.section.2.suivi': 'Suivi médical régulier et examens préventifs',
    
    'after.section.3.title': 'Loisirs et activités',
    'after.section.3.clubs': 'Clubs et associations',
    'after.section.3.clubsText': 'Rejoignez des clubs pour le sport, la culture, les loisirs créatifs ou les voyages.',
    'after.section.3.programmes': 'Programmes de loisirs et d\'estivage',
    'after.section.3.programmesText': 'Profitez des voyages organisés, séjours balnéaires et programmes culturels pour seniors.',
    'after.section.3.benevola': 'Bénévolat et activités sociales',
    'after.section.3.benevoleText': 'Restez actif en participant à des activités communautaires, associations ou projets de bénévolat.',
    
    'after.section.4.title': 'Vie quotidienne et services',
    'after.section.4.transport': 'Transport adapté pour retraités',
    'after.section.4.transportText': 'Bénéficiez de réductions sur les transports en commun. Des services de transport adapté sont disponibles.',
    'after.section.4.administratif': 'Services administratifs simplifiés',
    'after.section.4.administratifList1': 'Renouvellement de carte d\'identité et passeport',
    'after.section.4.administratifList2': 'Aide sociale et allocations pour retraités',
    'after.section.4.administratifList3': 'Accès prioritaire aux services publics',
    'after.section.4.logement': 'Conseils pour le logement',
    'after.section.4.logementText': 'Adaptez votre domicile pour la sécurité et le confort: rampes, salles de bains accessibles, éclairage adapté.',
    
    'after.section.5.title': 'Conseils pratiques et bien-être',
    'after.section.5.reseau': 'Maintenir un réseau social actif',
    'after.section.5.reseauText': 'Gardez le contact avec famille et amis. Participez à des clubs, groupes et associations.',
    'after.section.5.activites': 'Activités intellectuelles et créatives',
    'after.section.5.activitesText': 'Lisez, écrivez, peignez, musicalisez, suivez des cours en ligne pour stimuler votre esprit.',
    'after.section.5.projets': 'Planifier des projets personnels',
    'after.section.5.projetsText': 'Travaux de rénovation, voyages, hobbies, apprentissage de nouvelles compétences - la retraite est le moment idéal!',
    'after.section.5.telecharger': 'Télécharger les guides',
    'after.section.5.services': 'Accéder aux services en ligne',
    
    'after.section.pension.title': 'Votre pension de retraite',
    'after.pension.text': 'Votre pension est versée mensuellement sur votre compte bancaire. Le montant dépend de vos années de cotisation et de votre dernier salaire.',
    'after.pension.tip': 'Conseil : Vérifiez chaque mois que votre pension est bien versée.',
    
    'after.section.health.title': 'Couverture santé',
    'after.health.amo': 'AMO : L\'Assurance Maladie Obligatoire continue après la retraite.',
    'after.health.cnops': 'CNOPS : Pour les fonctionnaires et leurs ayants droit.',
    'after.health.mutuelle': 'Mutuelles : Complémentaires santé recommandées.',
    
    'after.section.life.title': 'Vie quotidienne',
    'after.life.activities': 'Activités : Associations, clubs, bénévolat',
    'after.life.transport': 'Transport : Réductions pour les seniors',
    'after.life.culture': 'Culture : Tarifs réduits dans les musées et cinémas',
    
    'after.section.rights.title': 'Vos droits',
    'after.rights.text': 'En tant que retraité, vous conservez des droits importants : couverture maladie, pension de réversion pour le conjoint, aides sociales si nécessaire.',
    
    // Resources page
    'resources.title': 'Ressources et Contacts',
    'resources.subtitle': 'Trouvez les informations dont vous avez besoin',
    'resources.intro': 'Voici les coordonnées complètes des organismes de retraite, leurs adresses, numéros de téléphone et sites internet.',
    
    'resources.section.cnss.title': 'CNSS - Caisse Nationale de Sécurité Sociale',
    'resources.section.cnss.description': 'Retraite pour le secteur privé',
    'resources.section.cnss.phone': '+212 (0) 522 47 76 60',
    'resources.section.cnss.email': 'contact@cnss.ma',
    'resources.section.cnss.website': 'www.cnss.ma',
    'resources.section.cnss.address': 'Avenue Abdelkader Mekki, Agdal, Rabat 10090',
    'resources.section.cnss.hours': 'Lun-Ven: 08:00 - 17:00',
    'resources.section.cnss.services': 'Consulter votre relevé de carrière, demander une retraite, obtenir une attestation',
    
    'resources.section.cmr.title': 'CMR - Caisse Marocaine des Retraites',
    'resources.section.cmr.description': 'Retraite pour les fonctionnaires',
    'resources.section.cmr.phone': '+212 (0) 537 54 49 80',
    'resources.section.cmr.email': 'contact@cmr.gov.ma',
    'resources.section.cmr.website': 'www.cmr.gov.ma',
    'resources.section.cmr.address': 'Avenue de Fès, Agdal, Rabat',
    'resources.section.cmr.hours': 'Lun-Ven: 08:00 - 16:30',
    'resources.section.cmr.services': 'Information sur les droits, calcul de retraite, demandes administratives',
    
    'resources.section.rcar.title': 'RCAR - Régime Collectif d\'Allocation de Retraite',
    'resources.section.rcar.description': 'Retraite pour les établissements publics',
    'resources.section.rcar.phone': '+212 (0) 537 71 44 44',
    'resources.section.rcar.email': 'contact@rcar.org.ma',
    'resources.section.rcar.website': 'www.rcar.org.ma',
    'resources.section.rcar.address': 'Avenue Marrakech, Hay Riad, Rabat',
    'resources.section.rcar.hours': 'Lun-Ven: 08:00 - 17:00',
    'resources.section.rcar.services': 'Gestion des cotisations, simulation de retraite, demandes diverses',
    
    'resources.section.links.title': 'Liens utiles et ressources',
    'resources.section.links.gov': 'Portail gouvernemental marocain',
    'resources.section.links.tax': 'Administration fiscale marocaine',
    'resources.section.links.social': 'Ministère des Affaires Sociales',
    'resources.section.links.health': 'Ministère de la Santé',
    
    'resources.section.help.title': 'Besoin d\'aide?',
    'resources.section.help.text': 'Contactez directement l\'une des caisses de retraite ou consultez un conseiller pour des questions spécifiques.',
    'resources.section.help.contact': 'Nous contacter',
    
    // Diagnostic page
    'diagnostic.title': 'Diagnostic Retraite',
    'diagnostic.subtitle': 'Évaluez votre situation en quelques clics',
    'diagnostic.intro': 'Répondez à ces questions simples pour obtenir des conseils personnalisés.',
    
    'diagnostic.form.age': 'Votre âge',
    'diagnostic.form.age.placeholder': 'Entrez votre âge',
    'diagnostic.form.status': 'Votre situation',
    'diagnostic.form.status.before': 'Avant la retraite',
    'diagnostic.form.status.after': 'À la retraite',
    'diagnostic.form.org': 'Votre organisme de retraite',
    'diagnostic.form.org.cnss': 'CNSS (secteur privé)',
    'diagnostic.form.org.cmr': 'CMR (fonctionnaires)',
    'diagnostic.form.org.rcar': 'RCAR (établissements publics)',
    'diagnostic.form.org.other': 'Autre / Je ne sais pas',
    'diagnostic.form.years': 'Années de travail',
    'diagnostic.form.years.placeholder': 'Nombre d\'années',
    'diagnostic.form.submit': 'Voir mon diagnostic',
    
    'diagnostic.result.title': 'Votre diagnostic',
    'diagnostic.result.before.young': 'Vous avez encore du temps pour préparer votre retraite. Commencez dès maintenant à rassembler vos documents et à vérifier votre relevé de carrière.',
    'diagnostic.result.before.soon': 'Votre retraite approche ! Il est temps de contacter votre organisme de retraite et de préparer votre dossier.',
    'diagnostic.result.after': 'Félicitations pour votre retraite ! Assurez-vous que votre pension est bien versée et profitez de vos droits à la couverture santé.',
    'diagnostic.result.low.years': 'Attention : Avec moins de 10 ans de cotisation, vos droits à la retraite peuvent être limités. Renseignez-vous auprès de votre organisme.',
    'diagnostic.result.good.years': 'Bonne nouvelle : Avec plus de 20 ans de cotisation, vous aurez droit à une pension complète.',
    
    // Footer
    'footer.mission': 'Guide Retraite Maroc accompagne les citoyens dans leur parcours vers une retraite sereine.',
    'footer.disclaimer': 'Information uniquement – Ce n\'est pas un service officiel du gouvernement.',
    'footer.rights': 'Tous droits réservés.',
    'footer.beforeRetirement': 'Avant la Retraite',
    'footer.afterRetirement': 'Après la Retraite',
    'footer.diagnostic': 'Diagnostic',
    'footer.resources': 'Ressources et Contacts',
    'footer.privacy': 'Nous Contacter',
    'footer.home': 'Accueil',
    'footer.quickLinks': 'Liens Rapides',
    'footer.contactUs': 'Nous Contacter',
    'footer.madeWith': 'Fait avec',
    'footer.forRetirees': 'pour les retraités',
    'footer.aboutUs': 'À propos',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.terms': 'Conditions',
    'footer.disclaimerTitle': 'Avis Légal',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.before': 'قبل التقاعد',
    'nav.after': 'بعد التقاعد',
    'nav.diagnostic': 'تشخيص التقاعد',
    'nav.resources': 'الموارد والاتصالات',
    
    // Home page
    'home.hero.title': 'دليلك لتقاعد هادئ في المغرب',
    'home.hero.subtitle': 'معلومات واضحة وسهلة لتحضير تقاعدك والاستمتاع به براحة تامة.',
    'home.cta.before': 'قبل التقاعد',
    'home.cta.after': 'بعد التقاعد',
    'home.cta.diagnostic': 'قم بالتشخيص',
    
    'home.section.why.title': 'لماذا هذا الدليل؟',
    'home.section.why.text': 'التقاعد مرحلة مهمة في الحياة. هذا الدليل يرافقك بمعلومات بسيطة وعملية، مناسبة للسياق المغربي.',
    
    'home.feature.info.title': 'معلومات واضحة',
    'home.feature.info.text': 'شرح بسيط لحقوقك وإجراءاتك.',
    'home.feature.support.title': 'مرافقة إنسانية',
    'home.feature.support.text': 'دليل مصمم لك، بعناية.',
    'home.feature.practical.title': 'نصائح عملية',
    'home.feature.practical.text': 'نصائح للحياة اليومية بعد التقاعد.',
    
    // Before retirement page
    'before.title': 'قبل التقاعد',
    'before.subtitle': 'حضّر تقاعدك بكل هدوء',
    'before.intro': 'التحضير الجيد هو مفتاح تقاعد هادئ. إليك المراحل والوثائق الأساسية.',
    
    'before.section.when.title': 'متى تبدأ الإجراءات؟',
    'before.section.when.text': 'ابدأ إجراءاتك قبل 6 أشهر إلى سنة من تاريخ تقاعدك. هذا يمنحك الوقت لجمع كل الوثائق.',
    
    'before.section.docs.title': 'الوثائق المطلوبة',
    'before.doc.cin': 'نسخة من البطاقة الوطنية',
    'before.doc.birth': 'عقد الازدياد',
    'before.doc.family': 'دفتر الحالة المدنية',
    'before.doc.work': 'شهادات العمل',
    'before.doc.salary': 'كشوف الأجور الأخيرة',
    'before.doc.rib': 'رقم الحساب البنكي',
    'before.doc.photo': 'صور شخصية حديثة',
    
    'before.section.orgs.title': 'مؤسسات التقاعد',
    'before.org.cnss': 'CNSS - الصندوق الوطني للضمان الاجتماعي (القطاع الخاص)',
    'before.org.cmr': 'CMR - الصندوق المغربي للتقاعد (الموظفون)',
    'before.org.rcar': 'RCAR - النظام الجماعي لمنح رواتب التقاعد',
    
    'before.section.tips.title': 'نصائح عملية',
    'before.tip.1': 'راجع سجل مسيرتك المهنية بانتظام',
    'before.tip.2': 'احتفظ بكل وثائق العمل',
    'before.tip.3': 'اسأل عن حقوقك في التكوين',
    'before.tip.4': 'خطط ميزانيتك للتقاعد',
    
    // Before retirement - 6 sections (Arabic)
    'before.section.1.title': 'المعلومات الشخصية والتحضير',
    'before.section.1.ageActuel': 'السن الحالية',
    'before.section.1.agePlaceholder': 'أدخل سنك',
    'before.section.1.ageRetraite': 'سن التقاعد المتوقع',
    'before.section.1.ageRetraitePlaceholder': 'مثال: 60 سنة',
    'before.section.1.dureeCotisation': 'مدة الاشتراك',
    'before.section.1.dureeCotisationPlaceholder': 'عدد السنوات',
    'before.section.1.salaireMoyen': 'متوسط الراتب الشهري (درهم)',
    'before.section.1.salaireMoyenPlaceholder': 'مثال: 10000 درهم',
    'before.section.1.regime': 'نظام التقاعد',
    'before.section.1.simulator': 'محاكي المعاش التقديري',
    'before.section.1.simulatorBtn': 'احسب معاشي',
    'before.section.1.result.pensionMensuelle': 'المعاش الشهري المقدر',
    'before.section.1.result.pensionAnnuelle': 'المعاش السنوي المقدر',
    'before.section.1.result.tauxRemplacement': 'معدل الاستبدال',
    'before.section.1.result.dureeProjetion': 'مدة التوقع',
    
    'before.section.2.title': 'الحقوق والإجراءات',
    'before.section.2.docNecessaires': 'الوثائق المطلوبة',
    'before.section.2.cin': 'البطاقة الوطنية',
    'before.section.2.salaire': 'كشوف الأجور',
    'before.section.2.attestation': 'شهادات الاشتراك',
    'before.section.2.procedure': 'إجراء الطلب',
    'before.section.2.procedureText': 'يجب تقديم طلب التقاعد إلى مؤسسة التقاعد (CNSS أو CMR أو RCAR).',
    'before.section.2.siteOfficiel': 'زيارة الموقع الرسمي',
    'before.section.2.delais': 'المدة المقدرة',
    'before.section.2.delaisText': 'عادة ما يستغرق معالجة ملفك من شهرين إلى ثلاثة أشهر.',
    'before.section.2.contacts': 'جهات الاتصال المفيدة',
    'before.section.2.cnssPhone': 'CNSS : +212 (0) 522 47 76 60',
    'before.section.2.cmrPhone': 'CMR : +212 (0) 537 54 49 80',
    'before.section.2.rcarPhone': 'RCAR : +212 (0) 537 71 44 44',
    
    'before.section.3.title': 'الصحة والتأمين',
    'before.section.3.amo': 'التأمين الصحي بعد التقاعد',
    'before.section.3.amoText': 'تستمر في الاستفادة من التأمين الصحي الإجباري (AMO) بعد تقاعدك.',
    'before.section.3.prevention': 'برامج الوقاية والصحة',
    'before.section.3.vaccins': 'اللقاحات الموصى بها للمسنين',
    'before.section.3.depistage': 'الفحوصات الدورية (السرطان والسكري وغيرها)',
    'before.section.3.suivi': 'المتابعة الطبية المنتظمة',
    'before.section.3.conseils': 'نصائح للحياة بصحة جيدة',
    'before.section.3.activite': 'النشاط البدني المنتظم (المشي والرياضة واليوغا)',
    'before.section.3.nutrition': 'التغذية المتوازنة والصحية',
    'before.section.3.medical': 'المتابعة الطبية المنتظمة والوقاية',
    'before.section.3.sommeil': 'النوم الكافي والمنتظم',
    'before.section.3.social': 'الحفاظ على الروابط الاجتماعية والعائلية',
    
    'before.section.4.title': 'المالية والإدارة',
    'before.section.4.budget': 'الميزانية الشهرية الموصى بها',
    'before.section.4.budgetText': 'ابدأ بوضع ميزانية تنبؤية مع الأخذ بعين الاعتبار معاشك المقدر ونفقاتك المنتظمة.',
    'before.section.4.gestion': 'إدارة المدخرات والاستثمارات',
    'before.section.4.gestionText': 'استشر مستشارًا ماليًا لتخطيط استثماراتك وتأمين ممتلكاتك.',
    'before.section.4.avantages': 'المزايا الضريبية للمتقاعدين',
    'before.section.4.avantagesText': 'يتمتع المتقاعدون ببعض المزايا الضريبية. استفسر من الإدارة الضريبية المغربية لتحسين تصريحك.',
    
    'before.section.5.title': 'الأنشطة والترفيه',
    'before.section.5.clubs': 'الأندية والجمعيات للمتقاعدين',
    'before.section.5.clubsText': 'انضم إلى نوادي المتقاعدين في منطقتك للمشاركة في الأنشطة الاجتماعية والثقافية.',
    'before.section.5.formations': 'التكوين والأنشطة الاجتماعية',
    'before.section.5.formationsText': 'الوصول إلى التكوينات المستمرة والورشات في المراكز الثقافية.',
    'before.section.5.voyages': 'الرحلات وبرامج الإجازات',
    'before.section.5.voyagesText': 'تقدم العديد من المنظمات رحلات وإقامات متخصصة للمسنين.',
    'before.section.5.inscription': 'التسجيل في البرامج',
    
    'before.section.6.title': 'نصائح عملية',
    'before.section.6.transition': 'الانتقال من العمل إلى التقاعد',
    'before.section.6.transitionText': 'قد تكون هذه الفترة صعبة نفسيًا. تحضر بتحديد مشاريع شخصية وأهداف لهذه المرحلة الجديدة.',
    'before.section.6.social': 'الحفاظ على شبكة اجتماعية نشطة',
    'before.section.6.socialText': 'شارك في الأندية ومجموعات واتساب والجمعيات والأنشطة المجتمعية للبقاء منخرطًا ومحاربة العزلة.',
    'before.section.6.planification': 'تخطيط المشاريع الشخصية',
    'before.section.6.planificationText': 'استخدم حريتك الجديدة لتحقيق مشاريعك: الهوايات الإبداعية والعمل التطوعي والسفر والتعلم...',
    
    // After retirement page
    'after.title': 'بعد التقاعد',
    'after.subtitle': 'عش حياتك الجديدة بكل سعادة',
    'after.intro': 'التقاعد بداية مغامرة جديدة. إليك كل ما تحتاج معرفته للاستمتاع بهذه المرحلة.',
    
    // After retirement - 5 sections (Arabic)
    'after.section.1.title': 'المعاش والمالية',
    'after.section.1.montant': 'مبلغ المعاش',
    'after.section.1.montantText': 'يُصرف معاشك شهريًا في حسابك البنكي. تحقق بانتظام من الحوالة.',
    'after.section.1.periodicite': 'الدورية',
    'after.section.1.periodicitiesText': 'الدفع الشهري التلقائي. يمكنك أيضًا طلب الدفع الفصلي إذا لزم الأمر.',
    'after.section.1.avantagesFiscaux': 'المزايا الضريبية للمتقاعدين',
    'after.section.1.avantagesFiscauxText': 'يتمتع المتقاعدون بتخفيضات ضريبية. استشر الإدارة الضريبية لتحسين تصريحك.',
    'after.section.1.budget': 'إدارة الميزانية',
    'after.section.1.budgetText': 'ضع ميزانية شهرية على أساس معاشك ونفقاتك المنتظمة. ادخر للحالات الطارئة.',
    'after.section.1.investissement': 'نصائح للاستثمارات الآمنة',
    'after.section.1.investissementText': 'استشر مستشارًا ماليًا للاستثمارات الآمنة: السندات والعقارات والادخار المنظم.',
    
    'after.section.2.title': 'الصحة والتأمين',
    'after.section.2.couverture': 'التغطية الصحية بعد التقاعد',
    'after.section.2.couvertureText': 'تحتفظ بـ AMO (التأمين الصحي الإجباري). أضف تعاضدية للتغطية الأفضل.',
    'after.section.2.acces': 'الوصول إلى خدمات الصحة',
    'after.section.2.accesList1': 'مراكز الصحة والمستشفيات المتفق عليها',
    'after.section.2.accesList2': 'برامج الوقاية (اللقاحات والفحوصات)',
    'after.section.2.accesList3': 'الاستشارات المتخصصة والمتابعة الطبية',
    'after.section.2.bienVieillir': 'نصائح للعيش بصحة جيدة',
    'after.section.2.activitePhysique': 'نشاط بدني مناسب (المشي والسباحة والرياضة الخفيفة)',
    'after.section.2.nutrition': 'تغذية متوازنة والشرب الكافي',
    'after.section.2.suivi': 'المتابعة الطبية المنتظمة والفحوصات الوقائية',
    
    'after.section.3.title': 'الترفيه والأنشطة',
    'after.section.3.clubs': 'الأندية والجمعيات',
    'after.section.3.clubsText': 'انضم إلى الأندية للرياضة والثقافة والهوايات الإبداعية والسفر.',
    'after.section.3.programmes': 'برامج الترفيه والإجازات',
    'after.section.3.programmesText': 'استمتع برحلات منظمة وإقامات ساحلية وبرامج ثقافية للمسنين.',
    'after.section.3.benevola': 'العمل التطوعي والأنشطة الاجتماعية',
    'after.section.3.benevoleText': 'ابقَ نشيطًا بالمشاركة في الأنشطة المجتمعية والجمعيات والعمل التطوعي.',
    
    'after.section.4.title': 'الحياة اليومية والخدمات',
    'after.section.4.transport': 'النقل المناسب للمتقاعدين',
    'after.section.4.transportText': 'استفد من التخفيضات على المواصلات. خدمات النقل المتخصص متاحة.',
    'after.section.4.administratif': 'الخدمات الإدارية المبسطة',
    'after.section.4.administratifList1': 'تجديد بطاقة الهوية والجواز',
    'after.section.4.administratifList2': 'المساعدة الاجتماعية والمخصصات للمتقاعدين',
    'after.section.4.administratifList3': 'الوصول الأولوي للخدمات العامة',
    'after.section.4.logement': 'نصائح للسكن',
    'after.section.4.logementText': 'أقلم منزلك للأمان والراحة: منحدرات وحمامات آمنة وإضاءة مناسبة.',
    
    'after.section.5.title': 'نصائح عملية والرفاهية',
    'after.section.5.reseau': 'الحفاظ على شبكة اجتماعية نشطة',
    'after.section.5.reseauText': 'احصل على تواصل مع العائلة والأصدقاء. شارك في الأندية والمجموعات والجمعيات.',
    'after.section.5.activites': 'الأنشطة الفكرية والإبداعية',
    'after.section.5.activitesText': 'اقرأ وكتب وارسم وعزف الموسيقى وتابع الدورات عبر الإنترنت.',
    'after.section.5.projets': 'تخطيط المشاريع الشخصية',
    'after.section.5.projetsText': 'إعادة الترميم والسفر والهوايات والتعلم - التقاعد هو الوقت المثالي!',
    'after.section.5.telecharger': 'تحميل الأدلة',
    'after.section.5.services': 'الوصول إلى الخدمات الإلكترونية',
    
    'after.section.pension.title': 'معاشك التقاعدي',
    'after.pension.text': 'يُصرف معاشك شهريًا في حسابك البنكي. المبلغ يعتمد على سنوات الاشتراك وآخر راتب.',
    'after.pension.tip': 'نصيحة: تأكد كل شهر من صرف معاشك.',
    
    'after.section.health.title': 'التغطية الصحية',
    'after.health.amo': 'AMO: التأمين الصحي الإجباري يستمر بعد التقاعد.',
    'after.health.cnops': 'CNOPS: للموظفين وذويهم.',
    'after.health.mutuelle': 'التعاضديات: تأمين صحي تكميلي موصى به.',
    
    'after.section.life.title': 'الحياة اليومية',
    'after.life.activities': 'الأنشطة: جمعيات، نوادي، تطوع',
    'after.life.transport': 'النقل: تخفيضات للمسنين',
    'after.life.culture': 'الثقافة: أسعار مخفضة في المتاحف والسينما',
    
    'after.section.rights.title': 'حقوقك',
    'after.rights.text': 'كمتقاعد، تحتفظ بحقوق مهمة: تغطية صحية، معاش للزوج/ة، مساعدات اجتماعية عند الحاجة.',
    
    // Resources page
    'resources.title': 'الموارد والاتصالات',
    'resources.subtitle': 'ابحث عن المعلومات التي تحتاجها',
    'resources.intro': 'فيما يلي جهات الاتصال الكاملة لمؤسسات التقاعد وعناوينها وأرقام هواتفها ومواقعها الإلكترونية.',
    
    'resources.section.cnss.title': 'CNSS - الصندوق الوطني للضمان الاجتماعي',
    'resources.section.cnss.description': 'التقاعد للقطاع الخاص',
    'resources.section.cnss.phone': '+212 (0) 522 47 76 60',
    'resources.section.cnss.email': 'contact@cnss.ma',
    'resources.section.cnss.website': 'www.cnss.ma',
    'resources.section.cnss.address': 'شارع عبد القادر المقري، أكدال، الرباط 10090',
    'resources.section.cnss.hours': 'الاثنين-الجمعة: 08:00 - 17:00',
    'resources.section.cnss.services': 'استشارة سجل مسيرتك المهنية، طلب التقاعد، الحصول على شهادة',
    
    'resources.section.cmr.title': 'CMR - الصندوق المغربي للتقاعد',
    'resources.section.cmr.description': 'التقاعد للموظفين',
    'resources.section.cmr.phone': '+212 (0) 537 54 49 80',
    'resources.section.cmr.email': 'contact@cmr.gov.ma',
    'resources.section.cmr.website': 'www.cmr.gov.ma',
    'resources.section.cmr.address': 'شارع فاس، أكدال، الرباط',
    'resources.section.cmr.hours': 'الاثنين-الجمعة: 08:00 - 16:30',
    'resources.section.cmr.services': 'معلومات عن الحقوق، حساب التقاعد، طلبات إدارية',
    
    'resources.section.rcar.title': 'RCAR - النظام الجماعي لمنح رواتب التقاعد',
    'resources.section.rcar.description': 'التقاعد للمؤسسات العمومية',
    'resources.section.rcar.phone': '+212 (0) 537 71 44 44',
    'resources.section.rcar.email': 'contact@rcar.org.ma',
    'resources.section.rcar.website': 'www.rcar.org.ma',
    'resources.section.rcar.address': 'شارع مراكش، حي الرياض، الرباط',
    'resources.section.rcar.hours': 'الاثنين-الجمعة: 08:00 - 17:00',
    'resources.section.rcar.services': 'إدارة الاشتراكات، محاكاة التقاعد، طلبات مختلفة',
    
    'resources.section.links.title': 'روابط مفيدة والموارد',
    'resources.section.links.gov': 'البوابة الحكومية المغربية',
    'resources.section.links.tax': 'الإدارة الضريبية المغربية',
    'resources.section.links.social': 'وزارة الشؤون الاجتماعية',
    'resources.section.links.health': 'وزارة الصحة',
    
    'resources.section.help.title': 'هل تحتاج إلى مساعدة؟',
    'resources.section.help.text': 'تواصل مباشرة مع إحدى مؤسسات التقاعد أو استشر مستشارًا لأسئلة محددة.',
    'resources.section.help.contact': 'اتصل بنا',
    
    // Diagnostic page
    'diagnostic.title': 'تشخيص التقاعد',
    'diagnostic.subtitle': 'قيّم وضعيتك في بضع نقرات',
    'diagnostic.intro': 'أجب على هذه الأسئلة البسيطة للحصول على نصائح مخصصة.',
    
    'diagnostic.form.age': 'عمرك',
    'diagnostic.form.age.placeholder': 'أدخل عمرك',
    'diagnostic.form.status': 'وضعيتك',
    'diagnostic.form.status.before': 'قبل التقاعد',
    'diagnostic.form.status.after': 'متقاعد',
    'diagnostic.form.org': 'مؤسسة التقاعد',
    'diagnostic.form.org.cnss': 'CNSS (القطاع الخاص)',
    'diagnostic.form.org.cmr': 'CMR (الموظفون)',
    'diagnostic.form.org.rcar': 'RCAR (المؤسسات العمومية)',
    'diagnostic.form.org.other': 'أخرى / لا أعرف',
    'diagnostic.form.years': 'سنوات العمل',
    'diagnostic.form.years.placeholder': 'عدد السنوات',
    'diagnostic.form.submit': 'عرض تشخيصي',
    
    'diagnostic.result.title': 'تشخيصك',
    'diagnostic.result.before.young': 'لا يزال لديك وقت لتحضير تقاعدك. ابدأ الآن بجمع وثائقك ومراجعة سجل مسيرتك.',
    'diagnostic.result.before.soon': 'تقاعدك قريب! حان الوقت للتواصل مع مؤسسة التقاعد وتحضير ملفك.',
    'diagnostic.result.after': 'تهانينا على تقاعدك! تأكد من صرف معاشك واستفد من حقوقك الصحية.',
    'diagnostic.result.low.years': 'تنبيه: مع أقل من 10 سنوات اشتراك، قد تكون حقوقك محدودة. استفسر من مؤسستك.',
    'diagnostic.result.good.years': 'خبر سار: مع أكثر من 20 سنة اشتراك، ستحصل على معاش كامل.',
    
    // Footer
    'footer.mission': 'دليل التقاعد المغرب يرافق المواطنين في رحلتهم نحو تقاعد هادئ.',
    'footer.disclaimer': 'للإعلام فقط – هذا ليس موقعًا حكوميًا رسميًا.',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.beforeRetirement': 'قبل التقاعد',
    'footer.afterRetirement': 'بعد التقاعد',
    'footer.diagnostic': 'التشخيص',
    'footer.resources': 'الموارد والاتصالات',
    'footer.privacy': 'اتصل بنا',
    'footer.home': 'الرئيسية',
    'footer.quickLinks': 'الروابط السريعة',
    'footer.contactUs': 'اتصل بنا',
    'footer.madeWith': 'صُنع بـ',
    'footer.forRetirees': 'للمتقاعدين',
    'footer.aboutUs': 'حول',
    'footer.services': 'الخدمات',
    'footer.contact': 'الاتصال',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.terms': 'الشروط',
    'footer.disclaimerTitle': 'إشعار قانوني',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
