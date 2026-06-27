export const SITE_CONTENT = {
  brand: {
    doctorName: 'Dr. William Makis',
    highlightedLastName: 'Makis',
    logo: '/assets/images/landing/dr-makis-logo.webp',
    tagline: 'Leading the way in advanced cancer diagnostics and personalized oncology care.',
  },
  contact: {
    email: 'drmakis@zohomail.com',
    telegramHandle: '@makismediciner',
    telegramUrl: 'https://t.me/makismediciner',
    addressLines: ['Dr. William Makis Cancer Center', '1234 Medical Drive, Suite 500', 'Boston, MA 02115'],
    phone: '1-800-WILLIAM-MAKIS',
  },
  hero: {
    badge: 'Leading Cancer Research Expert',
    title: 'Advanced Cancer Diagnostics & Care',
    description:
      'Pioneering personalized oncology treatments with cutting-edge diagnostic technologies and evidence-based protocols.',
    ctaPrimary: 'Schedule Consultation',
    ctaSecondary: 'Achievements',
    profileTitle: 'Dr. William Makis, MD',
    profileSubtitle: 'Nuclear Medicine Physician & Oncologist',
    profileHighlight: '500+ Research Publications',
    backgroundImage: '/assets/images/landing/hero-banner.webp',
    previousBackgroundImage: '/assets/images/landing/dr-makis-logo.webp',
    stats: [
      {
        label: 'Patients Treated',
        value: '15,000+',
        icon: 'users',
      },
      {
        label: 'Years Experience',
        value: '25+',
        icon: 'badge',
      },
      {
        label: 'Success Rate',
        value: '98%',
        icon: 'clock',
      },
      {
        label: 'Research Publications',
        value: '500+',
        icon: 'document',
      },
    ],
  },
  categorySection: {
    kicker: 'Shop by Category',
    description: 'Explore our comprehensive wellness solutions',
    cards: [
      {
        id: 'supplements',
        icon: 'pill',
        title: 'Supplements',
        description: 'Premium vitamins and natural supplements',
        cta: 'Explore Products',
        image: '/assets/images/landing/cat-supplements.webp',
      },
      {
        id: 'protocols',
        icon: 'document',
        title: 'Protocols',
        description: 'Comprehensive wellness programs',
        cta: 'Explore Protocols',
        image: '/assets/images/landing/cat-protocols.webp',
      },
      {
        id: 'consultations',
        icon: 'chat',
        title: 'Consultations',
        description: 'Personalized expert guidance',
        cta: 'Book Now',
        image: '/assets/images/landing/cat-consultations.webp',
      },
    ],
  },
  expertiseSection: {
    kicker: 'OUR EXPERTISE',
    title: 'Comprehensive Cancer Care Across All Specialties',
    description:
      'Our multidisciplinary team brings together world-class specialists to provide integrated, personalized treatment plans.',
    items: [
      {
        id: 'precision-diagnostics',
        icon: 'microscope',
        title: 'Precision Diagnostics',
        description:
          'Advanced molecular testing and imaging technologies for accurate cancer detection and staging.',
      },
      {
        id: 'genomic-medicine',
        icon: 'dna',
        title: 'Genomic Medicine',
        description:
          'Comprehensive genetic profiling to identify targeted treatment options and hereditary risk factors.',
      },
      {
        id: 'cardio-oncology',
        icon: 'heart',
        title: 'Cardio-Oncology',
        description:
          'Specialized care addressing the cardiovascular impacts of cancer treatments.',
      },
      {
        id: 'neuro-oncology',
        icon: 'brain',
        title: 'Neuro-Oncology',
        description:
          'Expert treatment of brain and nervous system cancers with minimally invasive approaches.',
      },
      {
        id: 'immunotherapy',
        icon: 'syringe',
        title: 'Immunotherapy',
        description:
          "Cutting-edge immunological treatments that harness your body's natural defenses.",
      },
      {
        id: 'integrative-care',
        icon: 'stethoscope',
        title: 'Integrative Care',
        description:
          'Holistic approach combining conventional medicine with supportive therapies.',
      },
    ],
  },
  treatmentProtocolsSection: {
    kicker: 'TREATMENT PROTOCOLS',
    title: 'Specialized Cancer Treatment Programs',
    description:
      'Evidence-based protocols tailored to each cancer type, ensuring optimal outcomes through personalized care.',
  },
  programs: [
    {
      id: 'breast-cancer',
      badge: 'Most Requested',
      title: 'Breast Cancer',
      subtitle: 'Comprehensive Treatment',
      excerpt:
        'Personalized treatment plans including surgery, radiation, chemotherapy, and hormonal therapy.',
      duration: '60 minutes',
      consultationType: 'Video Call',
      stats: [
        { value: '94%', label: 'Success Rate' },
        { value: '6-12 months', label: 'Avg Duration' },
        { value: '2,500+', label: 'Patients Helped' },
      ],
      about:
        'Our breast cancer program offers a comprehensive, multidisciplinary approach combining the latest surgical techniques, targeted radiation therapy, and personalized chemotherapy regimens. We specialize in both early-stage and advanced breast cancer treatment.',
      treatments: [
        'Targeted Therapy',
        'Immunotherapy',
        'Precision Radiation',
        'Hormonal Therapy',
        'Lumpectomy Support',
        'Oncoplastic Surgery Pathway',
      ],
      price: 500,
      image: '/assets/images/landing/protocol-breast-cancer.webp',
    },
    {
      id: 'lung-cancer',
      badge: 'Innovative',
      title: 'Lung Cancer',
      subtitle: 'Advanced Therapies',
      excerpt:
        'Minimally invasive procedures and targeted therapies for all stages of lung cancer.',
      duration: '45 minutes',
      consultationType: 'Video Call',
      stats: [
        { value: '87%', label: 'Success Rate' },
        { value: '8-14 months', label: 'Avg Duration' },
        { value: '1,800+', label: 'Patients Helped' },
      ],
      about:
        'Our lung cancer program utilizes cutting-edge diagnostic imaging, minimally invasive surgical techniques, and the latest targeted therapies. We offer comprehensive screening programs for early detection and personalized treatment plans.',
      treatments: [
        'Advanced Bronchoscopy',
        'VATS Surgery',
        'Targeted Therapy',
        'Immunotherapy',
        'SBRT Radiation',
        'Liquid Biopsy Monitoring',
      ],
      price: 500,
      image: '/assets/images/landing/protocol-lung-cancer.webp',
    },
    {
      id: 'colorectal-cancer',
      badge: 'Prevention Focus',
      title: 'Colorectal Cancer',
      subtitle: 'Screening & Treatment',
      excerpt:
        'Early detection programs and comprehensive treatment options for colorectal cancers.',
      duration: '30 minutes',
      consultationType: 'Video Call',
      stats: [
        { value: '91%', label: 'Success Rate' },
        { value: '6-9 months', label: 'Avg Duration' },
        { value: '1,650+', label: 'Patients Helped' },
      ],
      about:
        'Our colorectal cancer program emphasizes prevention through advanced screening and early detection. When treatment is needed, we offer minimally invasive surgical options and personalized chemotherapy protocols with excellent outcomes.',
      treatments: [
        'Advanced Colonoscopy',
        'Laparoscopic Surgery',
        'Robotic Resection',
        'FOLFOX/FOLFIRI Chemotherapy',
        'Targeted Therapy',
        'Liver Metastasis Treatment',
      ],
      price: 500,
      image: '/assets/images/landing/protocol-colorectal-cancer.webp',
    },
    {
      id: 'prostate-cancer',
      badge: 'High Success Rate',
      title: 'Prostate Cancer',
      subtitle: 'Precision Medicine',
      excerpt:
        'Advanced diagnostic tools and treatment options preserving quality of life.',
      duration: '45 minutes',
      consultationType: 'Video Call',
      stats: [
        { value: '96%', label: 'Success Rate' },
        { value: '3-8 months', label: 'Avg Duration' },
        { value: '2,100+', label: 'Patients Helped' },
      ],
      about:
        'Our prostate cancer program focuses on precision diagnostics and treatment options that preserve quality of life. We offer active surveillance for low-risk cases and advanced surgical and radiation options for more aggressive disease.',
      treatments: [
        'MRI-Fusion Biopsy',
        'Active Surveillance',
        'Robotic Prostatectomy',
        'SBRT Radiation',
        'Hormone Therapy',
        'PSMA-Targeted Therapy',
      ],
      price: 500,
      image: '/assets/images/landing/protocol-prostate-cancer.webp',
    },
    {
      id: 'skin-cancer',
      badge: 'Expert Care',
      title: 'Skin Cancer',
      subtitle: 'Melanoma Specialists',
      excerpt:
        'Comprehensive melanoma and skin oncology protocols with precision diagnostics.',
      duration: '30 minutes',
      consultationType: 'Video Call',
      stats: [
        { value: '93%', label: 'Success Rate' },
        { value: '2-6 months', label: 'Avg Duration' },
        { value: '3,200+', label: 'Patients Helped' },
      ],
      about:
        'Our dermatologic oncology team specializes in all types of skin cancer, from basal cell carcinoma to advanced melanoma. We offer advanced diagnostic techniques, Mohs surgery, and breakthrough immunotherapy treatments.',
      treatments: [
        'Dermoscopy Screening',
        'Mohs Surgery',
        'Wide Local Excision',
        'Sentinel Node Biopsy',
        'Immunotherapy (PD-1)',
        'Targeted Therapy (BRAF)',
      ],
      price: 500,
      image: '/assets/images/landing/protocol-skin-cancer.webp',
    },
    {
      id: 'blood-cancers',
      badge: 'Research-Driven',
      title: 'Blood Cancers',
      subtitle: 'Hematology Oncology',
      excerpt:
        'Specialized care for leukemia, lymphoma, and multiple myeloma with clinical trials.',
      duration: '60 minutes',
      consultationType: 'Video Call',
      stats: [
        { value: '85%', label: 'Success Rate' },
        { value: '12-24 months', label: 'Avg Duration' },
        { value: '1,400+', label: 'Patients Helped' },
      ],
      about:
        'Our hematologic oncology program offers specialized treatment for all blood cancers including leukemia, lymphoma, and multiple myeloma. We are at the forefront of CAR-T cell therapy and offer numerous clinical trial opportunities.',
      treatments: [
        'Chemotherapy Protocols',
        'CAR-T Cell Therapy',
        'Stem Cell Transplant',
        'Targeted Therapy',
        'Immunotherapy',
        'Clinical Trials',
      ],
      price: 500,
      image: '/assets/images/landing/protocol-blood-cancers.webp',
    },
  ],
  processSection: {
    kicker: 'OUR PROCESS',
    title: 'Your Journey to Recovery',
    description:
      'A structured, compassionate approach to cancer care that puts you at the center of every decision.',
    steps: [
      {
        number: '01',
        title: 'Initial Consultation',
        description:
          'Comprehensive evaluation of your medical history, symptoms, and concerns with our specialist team.',
        bullets: ['Medical History Review', 'Physical Examination', 'Symptom Assessment'],
      },
      {
        number: '02',
        title: 'Diagnostic Testing',
        description:
          'Advanced imaging, laboratory tests, and biopsies to accurately diagnose and stage your condition.',
        bullets: ['Molecular Testing', 'Advanced Imaging', 'Pathology Review'],
      },
      {
        number: '03',
        title: 'Treatment Planning',
        description:
          'Our tumor board develops a personalized treatment plan based on your specific diagnosis and needs.',
        bullets: ['Multidisciplinary Review', 'Personalized Protocol', 'Clinical Trials'],
      },
      {
        number: '04',
        title: 'Ongoing Care',
        description:
          'Continuous monitoring, support services, and follow-up care throughout your treatment journey.',
        bullets: ['Progress Monitoring', 'Supportive Care', 'Survivorship Planning'],
      },
    ],
  },
  productsSection: {
    kicker: 'Cancer Support Products',
    description:
      'Premium supplements specifically selected for cancer support and wellness',
  },
  products: [
    {
      id: 'cbd-oil',
      name: 'CBD Oil',
      shortDescription: 'Cannabidiol oil for wellness support...',
      description:
        'Premium full-spectrum CBD oil extracted from organically grown hemp. Our CBD oil is third-party tested for purity and potency, providing natural support for overall wellness, stress relief, and sleep quality.',
      reviews: 203,
      rating: 5,
      price: 175,
      benefits: [
        'Promotes relaxation',
        'Supports healthy sleep',
        'Natural anti-inflammatory',
        'Non-psychoactive formula',
      ],
      dosage:
        'Start with 0.5ml (25mg CBD) once daily. May increase to 1ml twice daily as needed.',
      ingredients: 'Full-spectrum hemp extract, MCT coconut oil, natural terpenes',
      size: '30ml bottle (1500mg CBD)',
      image: 'https://i.postimg.cc/yNZ3dSNr/full-spectrum-cbd-oil.png',
    },
    {
      id: 'curcumin',
      name: 'Curcumin 600-1500mg',
      shortDescription: 'Curcumin high-dose supplement for inflammation balance...',
      description:
        'High-potency curcumin supplement with enhanced bioavailability. Curcumin is the active compound in turmeric, extensively researched for its powerful anti-inflammatory and antioxidant properties.',
      reviews: 167,
      rating: 5,
      price: 155,
      benefits: [
        'Powerful anti-inflammatory',
        'Antioxidant protection',
        'Joint health support',
        'Cellular health optimization',
      ],
      dosage:
        'Take 2 capsules daily with meals. For enhanced absorption, take with black pepper or fatty foods.',
      ingredients: 'Curcumin extract (95% curcuminoids), BioPerine black pepper extract, vegetable capsule',
      size: '180 capsules (3 month supply)',
      image: 'https://i.postimg.cc/CMPh3xhH/Screenshot-20260303-145321-Google(1).jpg',
    },
    {
      id: 'fenbendazole',
      name: 'Fenbendazole',
      shortDescription: 'Complementary support being researched worldwide...',
      description:
        'Pharmaceutical-grade fenbendazole capsules. This compound has gained attention in integrative health circles and is currently being researched worldwide for its potential cellular health benefits.',
      reviews: 127,
      rating: 5,
      price: 250,
      benefits: [
        'Research-backed compound',
        'Cellular health support',
        'High purity formulation',
        'Consistent dosing',
      ],
      dosage:
        'Consult with your healthcare provider for personalized dosing recommendations. Common protocols vary.',
      ingredients: 'Fenbendazole 222mg, microcrystalline cellulose, vegetable capsule',
      size: '30 capsules per bottle',
      image: 'https://i.postimg.cc/05BvtXnH/FENBEN-CAPS.jpg',
    },
    {
      id: 'ivermectin',
      name: 'Ivermectin Support (3mg & 12mg)',
      shortDescription: 'Off-label use under investigation for supportive properties...',
      description:
        'Pharmaceutical-grade ivermectin tablets available in 3mg and 12mg strengths. This Nobel Prize-winning compound is being investigated in various research studies for potential supportive health applications.',
      reviews: 89,
      rating: 5,
      price: 250,
      benefits: [
        'Nobel Prize-winning compound',
        'Multiple dosage options',
        'Pharmaceutical grade',
        'Research-supported',
      ],
      dosage:
        'Consult with your healthcare provider. Dosing varies based on individual needs and intended use.',
      ingredients:
        'Ivermectin (3mg or 12mg), lactose monohydrate, microcrystalline cellulose',
      size: '10 tablets per blister pack',
      image: 'https://i.postimg.cc/28dDzjms/5333.jpg',
    },
    {
      id: 'artemisinin',
      name: 'Artemisinin Extract',
      shortDescription: 'Sweet wormwood extract with active research compounds...',
      description:
        'Pure artemisinin extracted from Artemisia annua (sweet wormwood). This compound has been recognized with the Nobel Prize for its medicinal applications and continues to be actively researched for cellular health benefits.',
      reviews: 156,
      rating: 5,
      price: 260,
      benefits: [
        'Nobel Prize recognized',
        'Powerful cellular support',
        'Natural plant extract',
        'Active research compound',
      ],
      dosage:
        'Take 1-2 capsules on an empty stomach. Cycle usage: 2 weeks on, 1 week off recommended.',
      ingredients: 'Artemisinin extract 500mg, rice flour, vegetable capsule',
      size: '60 capsules per bottle',
      image: 'https://i.postimg.cc/rySb4hbk/71Y6k-Mp-SCL-jpg-BO30-255-255-255-UF750-750-SR1910-1000-0-C-QL100.jpg',
    },
    {
      id: 'methylene-blue',
      name: 'Methylene Blue',
      shortDescription: 'Investigated for cellular and mitochondrial function support...',
      description:
        'USP-grade methylene blue solution for precise dosing. This compound has a long history in medicine and is currently being researched for its potential benefits in supporting mitochondrial function and cellular energy production.',
      reviews: 73,
      rating: 5,
      price: 250,
      benefits: [
        'Mitochondrial support',
        'Cognitive enhancement research',
        'Cellular energy optimization',
        'USP pharmaceutical grade',
      ],
      dosage:
        'Start with 1-2 drops (0.5-1mg) in water. May gradually increase. Do not exceed recommended amounts.',
      ingredients: 'Methylene blue USP 1% solution, purified water',
      size: '10ml dropper bottle (10mg/ml)',
      image: 'https://i.postimg.cc/x8Y6g27m/71fa-PF2El-IL-AC-UF1000-1000-QL80.jpg',
    },
  ],
  educationalSection: {
    kicker: 'EDUCATIONAL CONTENT',
    title: 'Watch Dr. William Makis in Action',
    description:
      'Discover his approach to integrative medicine through real insights and patient stories.',
    featuredVideo: {
      title: 'Dr. Makis in Action',
      tag: 'Featured',
      duration: '12:45',
      views: '24.5K views',
      image: '/assets/images/videos/featured.svg',
      url: 'https://streamable.com/0q09gf',
      embedUrl: 'https://streamable.com/e/0q09gf?',
      embedPadding: '56.250%',
    },
    galleryKicker: 'VIDEO GALLERY',
    galleryTitle: 'Featured Videos',
    galleryDescription:
      'Watch Dr. William Makis share his expertise on key health topics and medical discussions.',
    videos: [
      {
        id: 'video-1',
        title: 'Dr. Makis on Cancer Research',
        description: 'Insights on breakthrough cancer research and treatment approaches.',
        image: '/assets/images/videos/video-1.svg',
        url: 'https://streamable.com/69gom2',
        embedUrl: 'https://streamable.com/e/69gom2?',
        embedPadding: '56.250%',
      },
      {
        id: 'video-2',
        title: 'Understanding Modern Medicine',
        description: 'A deep dive into integrative medicine and patient care.',
        image: '/assets/images/videos/video-2.svg',
        url: 'https://streamable.com/j3pca8',
        embedUrl: 'https://streamable.com/e/j3pca8?',
        embedPadding: '56.250%',
      },
      {
        id: 'video-3',
        title: 'Health & Wellness Discussion',
        description: 'Dr. Makis discusses important health topics and prevention strategies.',
        image: '/assets/images/videos/video-3.svg',
        url: 'https://streamable.com/3hv2yh',
        embedUrl: 'https://streamable.com/e/3hv2yh?',
        embedPadding: '56.250%',
      },
    ],
  },
  certificationsSection: {
    pill: 'Credentials',
    title: 'Professional Certifications',
    description:
      'Recognized qualifications and medical certifications from world-renowned institutions',
    certifications: [
      {
        id: 'mdcm',
        title: 'Doctor of Medicine & Master of Surgery (MDCM)',
        institution: 'McGill University',
        year: '2005',
        status: 'Verified',
        description:
          "Doctorem Medicinae et Chirurgiae Magistrum - The highest medical degree awarded by McGill University, one of Canada's most prestigious medical schools.",
        image: 'https://i.postimg.cc/YS6gRWwP/Screenshot-20260303-142523-Chrome-Beta.jpg',
      },
    ],
  },
  testimonialsSection: {
    kicker: 'TESTIMONIALS',
    title: 'Stories of Hope & Recovery',
    description:
      'Hear from patients who have experienced the Dr. William Makis difference in their cancer journey.',
    testimonials: [
      {
        id: 'jennifer-martinez',
        quote:
          'The team at Dr. William Makis gave me hope when I needed it most. Their personalized approach to my treatment made all the difference in my recovery journey.',
        name: 'Jennifer Martinez',
        role: 'Breast Cancer Survivor',
        avatar: 'https://i.postimg.cc/VvRT0wvF/Screenshot-20260304-215438-Chrome-Beta.jpg',
      },
      {
        id: 'linda-davis',
        quote:
          'From diagnosis to treatment, every step was handled with such care and professionalism. The innovative therapies here truly saved my life.',
        name: 'Linda Davis',
        role: 'Lung Cancer Patient',
        avatar: 'https://i.postimg.cc/hjR3Cv7v/b865d335-b1f8-4c3a-bc6c-3583b094d29d.jpg',
      },
      {
        id: 'leo-thompson',
        quote:
          'The support I received went beyond medical care. The whole team treated me like family and ensured I was comfortable throughout my treatment.',
        name: 'Leo Thompson',
        role: 'Colorectal Cancer Survivor',
        avatar: 'https://i.postimg.cc/908bjQzL/501898ee-c038-4f21-96f5-a291205a0286.jpg',
      },
      {
        id: 'michael-johnson',
        quote:
          'Dr. Makis and his team are exceptional. Their expertise and compassion made a difficult time much more manageable. Forever grateful.',
        name: 'Michael Johnson',
        role: 'Prostate Cancer Survivor',
        avatar: 'https://i.postimg.cc/VL299TtK/3c49ce89-9283-4389-a8aa-d0b54fe4213e.jpg',
      },
      {
        id: 'david-goose',
        quote:
          'The cutting-edge treatments and caring staff gave me a second chance at life. I cannot thank Dr. William Makis enough for their dedication.',
        name: 'David Goose',
        role: 'Lung Cancer Survivor',
        avatar: 'https://i.postimg.cc/sDG72cL2/32d2409e-3478-4b0f-be6a-4460af96d028.jpg',
      },
      {
        id: 'mary-davies',
        quote:
          'From my first consultation to my final treatment, the team was with me every step of the way. Their expertise and warmth made all the difference.',
        name: 'Mary Davies',
        role: 'Skin Cancer Survivor',
        avatar: 'https://i.postimg.cc/3JjmsZb0/Screenshot-20260304-221340-Chrome-Beta.jpg',
      },
    ],
  },
  publicationsSection: {
    kicker: 'RESEARCH & PUBLICATIONS',
    title: 'Advancing Cancer Research Through Innovation',
    description:
      'Our team actively contributes to the global body of oncology research, publishing groundbreaking studies in prestigious medical journals.',
    stats: [
      { value: '500+', label: 'Published Papers' },
      { value: '15K+', label: 'Total Citations' },
    ],
    items: [
      {
        id: 'pub-1',
        title: 'Advances in Immunotherapy for Metastatic Breast Cancer',
        tag: 'Research Paper',
        source: 'Nature Medicine',
        year: '2024',
        citations: '156 citations',
        url: 'https://www.nature.com/nm/',
      },
      {
        id: 'pub-2',
        title: 'Precision Medicine Approaches in Non-Small Cell Lung Cancer',
        tag: 'Clinical Study',
        source: 'The Lancet Oncology',
        year: '2024',
        citations: '203 citations',
        url: 'https://www.thelancet.com/journals/lanonc/home',
      },
      {
        id: 'pub-3',
        title: 'Novel Biomarkers for Early Detection of Colorectal Cancer',
        tag: 'Research Paper',
        source: 'JAMA Oncology',
        year: '2023',
        citations: '289 citations',
        url: 'https://jamanetwork.com/journals/jamaoncology',
      },
      {
        id: 'pub-4',
        title: 'AI-Driven Diagnostic Tools in Oncology Practice',
        tag: 'Review Article',
        source: 'New England Journal of Medicine',
        year: '2023',
        citations: '412 citations',
        url: 'https://www.nejm.org/',
      },
    ],
  },
  recoveryCtaSection: {
    title: 'Take the First Step Toward Your Recovery',
    description:
      'Schedule a consultation with our expert oncology team today. Early detection and personalized care can make all the difference.',
    primaryButton: 'Book Appointment',
    secondaryButton: 'Message on Telegram',
  },
  footer: {
    services: ['Cancer Diagnostics', 'Treatment Programs', 'Clinical Trials', 'Second Opinions'],
    resources: ['Patient Portal', 'Research Publications', 'Insurance & Billing', 'FAQs'],
    about: ['Our Team', 'Facilities', 'Careers', 'Contact Us'],
    legal: ['Privacy Policy', 'Terms of Service', 'HIPAA Compliance'],
    copyright: '© 2026 Dr. William Makis. All rights reserved.',
    phone: '1-800-WILLIAM-MAKIS',
  },
  supplementsPage: {
    hero: {
      title: "Supplements",
      subtitle: "Premium vitamins and natural supplements for your wellness journey."
    },
    filters: ["All Products", "In Stock", "Featured", "Out of Stock"],
    productCount: "19 Products"
  },

  supplements: [
    {
      id: 'fenbendazole',
      name: 'Fenbendazole',
      subtitle: '222mg Antiparasitic Support',
      shortDescription: 'Complementary support being researched worldwide for its potential cellular health benefits.',
      description: 'Pharmaceutical-grade fenbendazole capsules. This compound has gained attention in integrative health circles and is currently being researched worldwide for its potential cellular health benefits.',
      duration: '30 Days',
      reviews: 127,
      rating: 4.5,
      price: 250,
      inStock: true,
      image: 'https://i.postimg.cc/zGjHR1wj/images-(3).jpg'
    },
    {
      id: 'ivermectin-support-3mg-12mg',
      name: 'Ivermectin Support (3mg & 12mg)',
      subtitle: 'Pharmaceutical Grade Tablets',
      shortDescription: 'Off-label use under investigation for supportive properties...',
      description: 'Pharmaceutical-grade ivermectin tablets available in 3mg and 12mg strengths. This Nobel Prize-winning compound is being investigated in various research studies for potential supportive health applications.',
      duration: '30 Days',
      reviews: 89,
      rating: 4.5,
      price: 250,
      inStock: true,
      image: 'https://i.postimg.cc/fynRrHjY/stromectol-1024x683.jpg'
    },
    {
      id: 'artemisinin',
      name: 'Artemisinin Extract',
      subtitle: 'Sweet Wormwood Compound',
      shortDescription: 'Sweet wormwood extract with active research compounds recognized with Nobel Prize.',
      description: 'Pure artemisinin extracted from Artemisia annua (sweet wormwood). This compound has been recognized with the Nobel Prize for its medicinal applications and continues to be actively researched for cellular health benefits.',
      duration: '60 Days',
      reviews: 156,
      rating: 4.5,
      price: 260,
      inStock: true,
      image: 'https://i.postimg.cc/zBqdFN4y/images-(5).jpg'
    },
    {
      id: 'zeolite',
      name: 'Zeolite Binder',
      subtitle: 'Natural Mineral Detox',
      shortDescription: 'Natural mineral supplement for detoxification support and toxin elimination.',
      description: 'Premium zeolite supplement designed to support natural detoxification processes. Zeolite is a naturally occurring mineral with unique properties that may help support overall wellness.',
      duration: '45 Days',
      reviews: 98,
      rating: 4.5,
      price: 180,
      inStock: true,
      image: 'https://i.postimg.cc/SKdLqMt4/images-(2).jpg'
    },
    {
      id: 'ivermectin-3mg',
      name: 'Ivermectin 3mg',
      subtitle: 'Pharmaceutical Grade Tablets',
      shortDescription: 'Pharmaceutical grade tablets for supportive care and immune modulation.',
      description: 'Pharmaceutical-grade ivermectin tablets in 3mg strength. This Nobel Prize-winning compound is being investigated in various research studies for potential supportive health applications.',
      duration: '10 Days',
      reviews: 89,
      rating: 4.5,
      price: 250,
      inStock: true,
      image: 'https://i.postimg.cc/FHkWNh9R/stromectol-1024x683.jpg'
    },
    {
      id: 'ivermectin-6mg',
      name: 'Ivermectin 6mg',
      subtitle: 'Higher Strength Formula',
      shortDescription: 'Higher strength pharmaceutical grade tablets for enhanced support.',
      description: 'Pharmaceutical-grade ivermectin tablets in 6mg strength. This Nobel Prize-winning compound is being investigated in various research studies for potential supportive health applications.',
      duration: '10 Days',
      reviews: 76,
      rating: 4.5,
      price: 270,
      inStock: true,
      image: 'https://i.postimg.cc/B6SBL3GY/Screenshot-20260303-143108-Google.jpg'
    },
    {
      id: 'vitamin-e',
      name: 'Vitamin E 600-800mg',
      subtitle: 'High Potency Antioxidant',
      shortDescription: 'High potency vitamin E supplement for cellular protection and wellness.',
      description: 'High-potency vitamin E supplement providing 600-800mg per serving. Vitamin E is a powerful antioxidant that supports overall wellness and cellular health.',
      duration: '90 Days',
      reviews: 201,
      rating: 4.5,
      price: 120,
      inStock: true,
      image: 'https://i.postimg.cc/TPCWsWZK/vitamin-e-600mg-capsules-for-face-and-hair-100-natural-vitamin-e-paraben-free-60-capsules.jpg'
    },
    {
      id: 'methylene-blue',
      name: 'Methylene Blue',
      subtitle: 'Mitochondrial Support',
      shortDescription: 'Investigated for cellular and mitochondrial function support and energy.',
      description: 'USP-grade methylene blue solution for precise dosing. This compound has a long history in medicine and is currently being researched for its potential benefits in supporting mitochondrial function and cellular energy production.',
      duration: '60 Days',
      reviews: 73,
      rating: 4.5,
      price: 250,
      inStock: true,
      image: 'https://i.postimg.cc/G3YvL9Dj/download.jpg'
    },
    {
      id: 'hydroxychloroquine',
      name: 'Hydroxychloroquine 400mg',
      subtitle: 'Immune Modulation Support',
      shortDescription: 'Pharmaceutical grade tablets for immune-related research purposes.',
      description: 'Pharmaceutical-grade hydroxychloroquine tablets in 400mg strength. This compound has been used for various medical applications and continues to be the subject of ongoing research.',
      duration: '30 Days',
      reviews: 54,
      rating: 4.5,
      price: 280,
      inStock: true,
      image: 'https://i.postimg.cc/8C2s9BZG/400-MG-Hydroxychloroquine-Sulfate-Tablets-USP.jpg'
    },
    {
      id: 'hydroxychloroquine-200mg',
      name: 'Hydroxychloroquine 200mg',
      subtitle: 'Lower-Dose Research Option',
      shortDescription: '200mg option for research and clinical settings...',
      description: 'Lower-dose hydroxychloroquine option used in immune-related and supportive care research pathways.',
      duration: '30 Days',
      reviews: 63,
      rating: 4,
      price: 270,
      inStock: true,
      image: 'https://i.postimg.cc/k4PXfM5G/Hydroxychloroquine-200mg.png'
    },
    {
      id: 'fenbendazole-222mg',
      name: 'Fenbendazole 222mg',
      subtitle: 'Research Tablet Format',
      shortDescription: '222mg formulation used in research protocols...',
      description: 'Tablet-style fenbendazole format aligned to common 222mg regimen references used in ongoing wellness research.',
      duration: '30 Days',
      reviews: 98,
      rating: 4.5,
      price: 160,
      inStock: true,
      image: 'https://i.postimg.cc/85GNLyyY/222-mg-fenbendazole-tablet.jpg'
    },
    {
      id: 'cbd-oil',
      name: 'CBD Oil',
      subtitle: 'Cannabidiol Wellness Support',
      shortDescription: 'Cannabidiol oil for wellness support...',
      description: 'Broad-spectrum CBD oil used as a complementary wellness product for daily balance and supportive care.',
      duration: '30 Days',
      reviews: 203,
      rating: 4.5,
      price: 175,
      inStock: true,
      image: 'https://i.postimg.cc/d3SbNnBP/CBD-Oil-for-Horses.jpg'
    },
    {
      id: 'nicotine-patches-7mg',
      name: 'Nicotine Patches 7mg',
      subtitle: 'Transdermal Support Patch',
      shortDescription: '7mg transdermal nicotine patches...',
      description: 'Low-strength transdermal nicotine patch option used in supportive and investigational pathways.',
      duration: '30 Days',
      reviews: 78,
      rating: 4,
      price: 230,
      inStock: true,
      image: 'https://i.postimg.cc/59GKGHJM/nicotex-nicotine-patch-7mg-7-patcheshelps-quit-smoking-3-1654077465.jpg'
    },
    {
      id: 'nicotine-patches-14mg',
      name: 'Nicotine Patches 14mg',
      subtitle: 'Higher-Strength Patch Option',
      shortDescription: '14mg transdermal nicotine patches...',
      description: 'Higher-strength transdermal patch option for users who need a stepped regimen with greater daily delivery.',
      duration: '30 Days',
      reviews: 91,
      rating: 4,
      price: 135,
      inStock: true,
      image: 'https://i.postimg.cc/Y9PRJPJQ/niquitin-patch-front-step2-14mg.png'
    },
    {
      id: 'soolantra-cream',
      name: 'Soolantra (Ivermectin Cream)',
      subtitle: 'Topical Ivermectin Formula',
      shortDescription: 'Ivermectin topical cream for dermatological support...',
      description: 'Topical ivermectin cream option designed for dermatological care and complementary skin support routines.',
      duration: '30 Days',
      reviews: 56,
      rating: 4,
      price: 180,
      inStock: true,
      image: 'https://i.postimg.cc/Y25KFDhh/soolantra.jpg'
    },
    {
      id: 'curcumin-600-1500mg',
      name: 'Curcumin 600-1500mg',
      subtitle: 'High-Dose Curcumin Support',
      shortDescription: 'Curcumin high-dose supplement for inflammation balance...',
      description: 'Curcumin blend formulated for antioxidant and inflammation-support routines with flexible dose ranges.',
      duration: '45 Days',
      reviews: 167,
      rating: 4,
      price: 155,
      inStock: true,
      image: 'https://i.postimg.cc/pT37DyXM/Screenshot-20260303-145321-Google(1).jpg'
    },
    {
      id: 'soursop-tea',
      name: 'Soursop Tea',
      subtitle: 'Botanical Herbal Tea',
      shortDescription: 'Tea made from soursop leaves...',
      description: 'Herbal tea blend prepared from soursop leaves and used in traditional wellness routines.',
      duration: '30 Days',
      reviews: 99,
      rating: 4,
      price: 225,
      inStock: true,
      image: 'https://i.postimg.cc/s2X0q5Mj/81Aga5ZFGp-L-AC-UF894-1000-QL80.jpg'
    },
    {
      id: 'ivermectin-horse-paste-strip',
      name: 'Ivermectin Horse Paste & Strip',
      subtitle: 'Paste + Dosing Strip Format',
      shortDescription: 'Ivermectin horse paste with dosing strip...',
      description: 'Alternative ivermectin format bundled with dosing strip references for investigational use contexts.',
      duration: '30 Days',
      reviews: 41,
      rating: 3.5,
      price: 135,
      inStock: true,
      image: 'https://i.postimg.cc/bNhV87ZT/223590-17fa9418-10170-1770050663.jpg'
    },
    {
      id: 'methylene-blue-12mg-pills',
      name: 'Methylene Blue 12mg Pills',
      subtitle: 'Tablet Formulation',
      shortDescription: '12mg pill formulation of methylene blue for research...',
      description: 'Tablet-based methylene blue format in 12mg units for users preferring capsule or tablet administration.',
      duration: '30 Days',
      reviews: 67,
      rating: 3.5,
      price: 175,
      inStock: true,
      image: 'https://i.postimg.cc/4yZvkTWt/81Wzk-K61-WL.jpg'
    }
  ],
  consultationsPage: {
    hero: {
      title: 'Consultations',
      subtitle: 'Book a personalized consultation with Dr. William Makis for expert guidance on your health journey.',
    },
  },
  consultations: [
    {
      id: 'initial-consultation',
      icon: 'clipboard',
      title: 'Initial Consultation',
      subtitle: 'Comprehensive health assessment',
      excerpt:
        'One-on-one consultation to review your health history, current concerns, and develop a personalized wellness plan.',
      description:
        'A foundational consultation covering your current health status, background, goals, and immediate next steps for a personalized plan.',
      duration: '60 minutes',
      delivery: 'Video Call',
      price: 650,
      popular: true,
      image: '/assets/images/consultations/initial-consultation.webp',
    },
    {
      id: 'follow-up-consultation',
      icon: 'refresh',
      title: 'Follow-Up Consultation',
      subtitle: 'Progress review and plan adjustment',
      excerpt: 'Review your progress, adjust your protocol, and address any questions or concerns.',
      description:
        'A focused follow-up session to evaluate outcomes, update your protocol when needed, and keep implementation on track.',
      duration: '30 minutes',
      delivery: 'Video Call',
      price: 460,
      popular: false,
      image: '/assets/images/consultations/follow-up-consultation.webp',
    },
    {
      id: 'protocol-review',
      icon: 'search',
      title: 'Protocol Review',
      subtitle: 'Expert review of your current protocol',
      excerpt:
        'Have an expert review your existing wellness protocol and provide recommendations for optimization.',
      description:
        'Detailed protocol audit with recommendations to improve sequencing, dosing cadence, and supporting steps.',
      duration: '45 minutes',
      delivery: 'Video Call + Written Report',
      price: 500,
      popular: true,
      image: '/assets/images/consultations/protocol-review.webp',
    },
    {
      id: 'supplement-selection-consultation',
      icon: 'link',
      title: 'Supplement Selection Consultation',
      subtitle: 'Personalized supplement recommendations',
      excerpt: 'Get expert guidance on choosing the right supplements for your specific health goals.',
      description:
        'Consultation dedicated to supplement strategy, prioritization, and practical implementation based on your goals.',
      duration: '45 minutes',
      delivery: 'Video Call',
      price: 590,
      popular: false,
      image: '/assets/images/consultations/supplement-selection-consultation.webp',
    },
    {
      id: 'extended-consultation-package',
      icon: 'calendar',
      title: 'Extended Consultation Package',
      subtitle: 'Comprehensive 3-month support',
      excerpt:
        'Three months of ongoing consultation support with regular check-ins and unlimited email support.',
      description:
        'A structured 3-month guidance package with scheduled video consultations, iterative plan updates, and ongoing async support.',
      duration: '3 months',
      delivery: 'Video Calls + Email Support',
      price: 4500,
      originalPrice: 8400,
      saveNote: 'Save $3,900.00',
      popular: true,
      image: '/assets/images/consultations/extended-consultation-package.webp',
    },
  ],
  protocolsPage: {
    hero: {
      title: "Protocols",
      subtitle: "Evidence-based wellness protocols designed by Dr. William Makis for comprehensive health support."
    },
    filters: ["All Difficulties", "Easy", "Moderate", "Advanced"],
    protocolCount: "8 Protocols"
  },
  protocols: [
    {
      id: 'ivermectin-protocol',
      title: 'Ivermectin Protocol',
      subtitle: 'Individual Ivermectin Program',
      excerpt: 'A protocol based on daily or alternate-day use of ivermectin tablets (3mg or 12mg) under medical supervision.',
      description: 'This protocol involves the use of ivermectin, a well-known antiparasitic medication, for health support.',
      duration: '3 Months',
      difficulty: 'Easy',
      price: 2600,
      image: '/assets/images/protocols/ivermectin-protocol.webp',
      about: 'The Ivermectin Protocol is designed for individuals seeking a simple, evidence-based approach to health support. This program involves daily or alternate-day use of ivermectin tablets under medical supervision.',
      treatments: [
        'Ivermectin 3mg or 12mg tablets',
        'Daily or alternate-day dosing',
        'Medical supervision',
        'Regular monitoring',
        'Supportive guidance'
      ],
      stats: [
        { value: '90%', label: 'Success Rate' },
        { value: 'Simple', label: 'Administration' },
        { value: '3+ months', label: 'Treatment Duration' }
      ]
    },
    {
      id: 'fenbendazole-protocol',
      title: 'Fenbendazole Protocol',
      subtitle: 'Individual Fenbendazole Program',
      excerpt: 'Involves use of Fenbendazole (commonly 222mg daily, sometimes titrated higher) with food containing fat.',
      description: 'This protocol focuses on the use of fenbendazole, a broad-spectrum antiparasitic agent, for health support.',
      duration: '3 Months',
      difficulty: 'Easy',
      price: 2800,
      image: '/assets/images/protocols/fenbendazole-protocol.webp',
      about: 'The Fenbendazole Protocol is designed for individuals seeking a straightforward approach to health support. This program involves daily use of fenbendazole, often with fat-containing food to enhance absorption.',
      treatments: [
        'Fenbendazole 222mg daily',
        'Fat-containing meals',
        'Optional titration',
        'Medical supervision',
        'Progress tracking'
      ],
      stats: [
        { value: '88%', label: 'Success Rate' },
        { value: 'Once daily', label: 'Dosing' },
        { value: '3+ months', label: 'Treatment Duration' }
      ]
    },
    {
      id: 'mebendazole-protocol',
      title: 'Mebendazole Protocol',
      subtitle: 'Individual Mebendazole Program',
      excerpt: 'Involves using Mebendazole (100mg tablets) as part of a cancer support regimen. Often paired with other supplements.',
      description: 'This protocol uses mebendazole, an anthelmintic medication, as part of a comprehensive health support regimen.',
      duration: '3 Months',
      difficulty: 'Moderate',
      price: 2500,
      image: '/assets/images/protocols/mebendazole-protocol.webp',
      about: 'The Mebendazole Protocol is designed for individuals seeking a targeted approach to health support. This program involves the use of mebendazole tablets, often in combination with other supportive supplements.',
      treatments: [
        'Mebendazole 100mg tablets',
        'Combination therapy',
        'Supplementary support',
        'Medical supervision',
        'Regular follow-up'
      ],
      stats: [
        { value: '85%', label: 'Success Rate' },
        { value: 'Combination', label: 'Therapy' },
        { value: '3+ months', label: 'Treatment Duration' }
      ]
    },
    {
      id: 'hydroxychloroquine-protocol',
      title: 'Hydroxychloroquine Protocol',
      subtitle: 'Immune Modulation & Anti-Inflammatory Program',
      excerpt: 'Hydroxychloroquine (200mg-400mg daily) has been studied for immune modulation and anti-inflammatory effects.',
      description: 'This protocol focuses on the use of hydroxychloroquine for immune modulation and anti-inflammatory support.',
      duration: '3 Months',
      difficulty: 'Advanced',
      price: 2900,
      image: '/assets/images/protocols/hydroxychloroquine-protocol.webp',
      about: 'The Hydroxychloroquine Protocol is designed for individuals seeking immune modulation and anti-inflammatory support. This program involves daily use of hydroxychloroquine under close medical supervision.',
      treatments: [
        'Hydroxychloroquine 200mg-400mg daily',
        'Immune modulation',
        'Anti-inflammatory support',
        'Close medical supervision',
        'Regular monitoring'
      ],
      stats: [
        { value: '82%', label: 'Success Rate' },
        { value: 'Advanced', label: 'Monitoring' },
        { value: '3+ months', label: 'Treatment Duration' }
      ]
    },
    {
      id: 'jo-tippens-protocol',
      title: 'Jo Tippens Cancer Protocol',
      subtitle: 'Detailed Multi-Agent Cancer Protocol',
      excerpt: 'A well-known regimen combining Fenbendazole, Ivermectin, Albendazole, Serrapeptase, TUDCA, Curcumin, and more.',
      description: 'This comprehensive protocol combines multiple agents for synergistic health support.',
      duration: '3 Months',
      difficulty: 'Advanced',
      price: 2700,
      image: '/assets/images/protocols/jo-tippens-protocol.webp',
      about: 'The Jo Tippens Cancer Protocol is a comprehensive multi-agent regimen designed for individuals seeking advanced health support. This protocol combines fenbendazole, ivermectin, albendazole, serrapeptase, TUDCA, curcumin, and other supportive agents.',
      treatments: [
        'Fenbendazole',
        'Ivermectin',
        'Albendazole',
        'Serrapeptase',
        'TUDCA',
        'Curcumin',
        'Additional supplements'
      ],
      stats: [
        { value: '87%', label: 'Success Rate' },
        { value: 'Multi-agent', label: 'Regimen' },
        { value: '3+ months', label: 'Treatment Duration' }
      ]
    },
    {
      id: 'vaccine-detox-protocol',
      title: 'Vaccine Detoxification Protocol',
      subtitle: 'Complete Vaccine Detoxification Program',
      excerpt: 'A comprehensive detox program designed to support elimination of vaccine-related toxins. Includes supplements and lifestyle modifications.',
      description: 'This protocol focuses on supporting the body\'s natural detoxification processes after vaccination.',
      duration: '3 Months',
      difficulty: 'Moderate',
      price: 2500,
      image: '/assets/images/protocols/vaccine-detox-protocol.webp',
      about: 'The Vaccine Detoxification Protocol is designed to support the body\'s natural detoxification processes after vaccination. This program includes targeted supplements and lifestyle modifications to aid in toxin elimination.',
      treatments: [
        'Detoxification supplements',
        'Liver support',
        'Kidney support',
        'Lifestyle modifications',
        'Nutritional guidance',
        'Regular monitoring'
      ],
      stats: [
        { value: '84%', label: 'Success Rate' },
        { value: 'Comprehensive', label: 'Detox' },
        { value: '3+ months', label: 'Treatment Duration' }
      ]
    },
    {
      id: 'parasite-detox-protocol',
      title: 'Parasite Detoxification Protocol',
      subtitle: 'Complete Parasite Elimination Program',
      excerpt: 'Uses antiparasitic compounds such as ivermectin, mebendazole, and natural herbs to help clear parasitic infections.',
      description: 'This protocol focuses on eliminating parasitic infections using a combination of pharmaceutical and natural agents.',
      duration: '3 Months',
      difficulty: 'Easy',
      price: 3500,
      image: '/assets/images/protocols/parasite-detox-protocol.webp',
      about: 'The Parasite Detoxification Protocol is designed to help individuals clear parasitic infections using a comprehensive approach. This program combines pharmaceutical antiparasitic agents with natural herbs and supportive supplements.',
      treatments: [
        'Ivermectin',
        'Mebendazole',
        'Natural herbal supplements',
        'Digestive support',
        'Nutritional guidance',
        'Follow-up testing'
      ],
      stats: [
        { value: '92%', label: 'Success Rate' },
        { value: 'Comprehensive', label: 'Elimination' },
        { value: '3+ months', label: 'Treatment Duration' }
      ]
    },
    {
      id: 'complete-cancer-protocol',
      title: 'Complete Cancer Protocol',
      subtitle: 'Advanced Comprehensive Cancer Support Plan',
      excerpt: 'A high-intensity multi-agent protocol combining antiparasitics (Fenbendazole, Mebendazole, Ivermectin) with supportive supplements.',
      description: 'This advanced protocol combines multiple antiparasitic agents with comprehensive supportive care.',
      duration: '3 Months',
      difficulty: 'Advanced',
      price: 5000,
      image: '/assets/images/protocols/complete-cancer-protocol.webp',
      about: 'The Complete Cancer Protocol is an advanced, high-intensity program designed for individuals seeking comprehensive cancer support. This protocol combines multiple antiparasitic agents with a wide range of supportive supplements and therapies.',
      treatments: [
        'Fenbendazole',
        'Mebendazole',
        'Ivermectin',
        'Comprehensive supplement regimen',
        'Immune support',
        'Nutritional therapy',
        'Lifestyle modifications'
      ],
      stats: [
        { value: '89%', label: 'Success Rate' },
        { value: 'High-intensity', label: 'Protocol' },
        { value: '3+ months', label: 'Treatment Duration' }
      ]
    }
  ],
  misc: {
    placeOrderNote: 'By placing this order, you agree to our terms and conditions.',
    noPaymentMethods: 'No payment methods available. Please contact support.',
    cartShippingText: 'Shipping and taxes calculated at checkout',
    cartTypeLabel: 'Protocol',
    todoHeaderCopy: 'TODO_COPY_MENU_DROPDOWN_BEHAVIOR_LABEL',
  },
}

export const DEFAULT_PROTOCOL_PRICE = 500


