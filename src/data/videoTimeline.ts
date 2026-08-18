import { VideoChapter, PropertyItem, ContactInfo } from '../types';

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  whatsapp1: '01755-933200',
  whatsapp2: '01751-575323',
  phoneCall: '01631-296124',
  companyName: 'NOAH Business Solution',
  taglineBn: 'লাক্সারি রিসোর্ট ও ৫-স্টার হোটেল ইনভেস্টমেন্ট',
  taglineEn: 'Invest in Luxury Resorts & 5-Star Hotels',
  addressBn: 'লেভেল ৭, গুলশান এভিনিউ, ঢাকা ১২১২',
  addressEn: 'Level 7, Gulshan Avenue, Dhaka 1212',
  email: 'invest@noahsolution.com'
};

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: 'ch-1',
    startTime: 0,
    endTime: 22,
    titleBn: 'আপনার বর্তমান পেশার পাশাপাশি নিশ্চিত প্যাসিভ ইনকাম',
    titleEn: 'Smart Passive Income Alongside Your Career',
    badgeBn: 'এক্সক্লুসিভ সুযোগ',
    badgeEn: 'Exclusive Opportunity',
    voiceoverScriptBn: 'আপনি কি আপনার বর্তমান পেশা বা ব্যবসার পাশাপাশি একটি নির্ভরযোগ্য, ঝুঁকিমুক্ত এবং উচ্চ রিটার্নের সেভিং বা সেকেন্ড ইনকাম তৈরি করতে চান? তাহলে নোয়াহ বিজনেস সলিউশন নিয়ে এসেছে আন্তর্জাতিক মানের প্রিমিয়াম রিসোর্ট ও ৫-স্টার হোটেল ইনভেস্টমেন্ট!',
    voiceoverScriptEn: 'Are you looking to generate a secure, high-yield secondary passive income alongside your current career or business? Noah Business Solution introduces premium luxury resort and 5-star hotel investments!',
    overlayType: 'hook',
    presenterPose: 'speaking_hands',
    highlightMetric: {
      value: '১৪.২%+',
      labelBn: 'বাৎসরিক নিশ্চিত মুনাফা',
      labelEn: 'Annual Guaranteed Yield',
      sublabel: 'ত্রৈমাসিক সরাসরি ব্যাংক পেআউট'
    },
    featuredImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-2',
    startTime: 22,
    endTime: 46,
    titleBn: 'বিশ্বমানের লাক্সারি বিচ রিসোর্ট ও প্রাইভেট ভিলা',
    titleEn: 'World-Class Beachfront Luxury Resorts & Private Villas',
    badgeBn: 'প্রকল্প প্রদর্শনী',
    badgeEn: 'Project Showcase',
    voiceoverScriptBn: 'সমুদ্রের মোহনা ও প্যানোরামিক ভিউ বেষ্টিত আমাদের মেগা রিসোর্ট প্রজেক্টে রয়েছে আন্তর্জাতিক মানের কটেজ ও ওভারওয়াটার ভিলা। আপনি পাবেন লাইফটাইম প্রপার্টি মালিকানা এবং প্রতি বছর পরিবারসহ ৩০ দিনের ফ্রি লাক্সারি স্টে সুবিধা!',
    voiceoverScriptEn: 'Surrounded by pristine ocean views, our mega beach resort development features overwater private villas, infinity amenities, registered deed ownership, and 30 days of complimentary annual luxury holidays for your family!',
    overlayType: 'resort_showcase',
    presenterPose: 'pointing_right',
    highlightMetric: {
      value: '৩০ দিন',
      labelBn: 'ফ্রি ভিআইপি স্টে/বছর',
      labelEn: 'Free VIP Stay / Year',
      sublabel: 'সকল এয়ারপোর্ট পিকআপ ও ফুড ইনক্লুডেড'
    },
    featuredImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-3',
    startTime: 46,
    endTime: 70,
    titleBn: '৫-স্টার প্রেসিডেন্সিয়াল স্যুইট ও ইনফিনিটি পুল সুবিধা',
    titleEn: '5-Star Presidential Suites & Sky Infinity Pools',
    badgeBn: '৫-স্টার আতিথেয়তা',
    badgeEn: '5-Star Hospitality',
    voiceoverScriptBn: 'প্রতিটি স্যুইট আধুনিক স্মার্ট হোম অটোমেশন, প্রিমিয়াম ইন্টেরিয়র এবং ভাসমান স্কাই ইনফিনিটি পুলে সমৃদ্ধ। আন্তর্জাতিক অপারেটরদের পেশাদার ব্যবস্থাপনায় আপনার সম্পদে থাকবে সর্বোচ্চ অকুপেন্সি ও নিয়মিত রেন্টাল রেভিনিউ।',
    voiceoverScriptEn: 'Every luxury suite is designed with modern automation, signature designer interiors, and floating sky infinity pools. Managed by world-class hospitality operators, ensuring maximum year-round occupancy and zero management hassle.',
    overlayType: 'suite_features',
    presenterPose: 'holding_tablet',
    highlightMetric: {
      value: '৮৮%+',
      labelBn: 'গড় অকুপেন্সি রেট',
      labelEn: 'Average Occupancy Rate',
      sublabel: 'আন্তর্জাতিক বুকিং পার্টনার নেটওয়ার্ক'
    },
    featuredImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-4',
    startTime: 70,
    endTime: 92,
    titleBn: 'ক্যাপিটাল গ্রোথ ও শতভাগ নিরাপদ ইনভেস্টমেন্ট চার্ট',
    titleEn: 'Guaranteed Capital Growth & Financial Security',
    badgeBn: 'উচ্চ মূলধন বৃদ্ধি',
    badgeEn: 'High Capital Growth',
    voiceoverScriptBn: 'গত কয়েক মাসে ১০০+ এরও বেশি প্রফেশনাল, ব্যবসায়ী ও রেমিট্যান্স যোদ্ধা আমাদের সাথে যুক্ত হয়ে তাদের ভবিষ্যৎ নিশ্চিত করেছেন। ভূমি ও ইউনিটের মূল্যের দ্রুত বৃদ্ধির সাথে সাথে ৫ বছরে মূলধনের বৃদ্ধি প্রায় ৪৮% পর্যন্ত!',
    voiceoverScriptEn: 'Over 100+ discerning professionals, doctors, engineers, and NRB investors have already secured their units. With prime tourism location demand, project capital appreciation is projected to reach +48% over 5 years.',
    overlayType: 'roi_growth',
    presenterPose: 'welcoming',
    highlightMetric: {
      value: '+৪৮%',
      labelBn: '৫ বছরে ক্যাপিটাল গ্রোথ',
      labelEn: '5-Year Asset Appreciation',
      sublabel: 'আইনি রেজিস্ট্রিকৃত সাবকবলা দলিল'
    },
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ch-5',
    startTime: 92,
    endTime: 110,
    titleBn: 'সীমিত আসন! আজই রেজিস্ট্রেশন ও ফ্রি কনসালটেশন নিন',
    titleEn: 'Limited Slots! Register & Book Free Consultation Today',
    badgeBn: 'কল ও হোয়াটসঅ্যাপ',
    badgeEn: 'Call & WhatsApp Now',
    voiceoverScriptBn: 'সুযোগ বারবার আসে না! সীমিত সংখ্যক এক্সক্লুসিভ স্যুইট বুকিং চলছে। আজই নিচে দেওয়া নম্বরে সরাসরি কল অথবা WhatsApp করুন এবং আমাদের গুলশান হেড অফিসে ভিজিট করে বিস্তারিত ফাইল ও দলিল যাচাই করুন!',
    voiceoverScriptEn: 'Opportunity knocks once! Limited exclusive suites available for this phase. Call or WhatsApp us now to reserve your VIP seminar slot or visit our Gulshan headquarters today!',
    overlayType: 'cta_contacts',
    presenterPose: 'closing_call',
    highlightMetric: {
      value: '২৪/৭',
      labelBn: 'ভিআইপি ইনভেস্টর সাপোর্ট',
      labelEn: 'VIP Investor Support',
      sublabel: 'WhatsApp: 01755-933200'
    },
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  }
];

export const PROPERTIES_DATA: PropertyItem[] = [
  {
    id: 'p-1',
    nameBn: 'নোয়াহ ওশান ব্লু বে রিসোর্ট',
    nameEn: 'Noah Ocean Blue Bay Resort',
    locationBn: 'মেরিন ড্রাইভ, ইনানী বিচ',
    locationEn: 'Marine Drive, Inani Beach',
    category: 'resort',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    priceStart: '১০,০০,০০০ ৳',
    annualRoi: '১৪.৫% বাৎসরিক',
    occupancyRate: '৯২%',
    featuresBn: ['প্রাইভেট বিচ এক্সেস', 'ওভারওয়াটার সানডেক', '৩৬০° ওশান ভিউ', '৩০ দিন ফ্রি স্টে'],
    featuresEn: ['Private Beach Access', 'Overwater Sundeck', '360° Ocean View', '30 Days Free Stay'],
    descriptionBn: 'বিশ্বের দীর্ঘতম সমুদ্র সৈকতের কোলে আন্তর্জাতিক মানের ফাইভ স্টার ইকো বিচ রিসোর্ট।',
    descriptionEn: 'An international 5-star eco-luxury beachfront resort situated on the pristine coastline.'
  },
  {
    id: 'p-2',
    nameBn: 'গ্র্যান্ড ইম্পেরিয়াল প্রেসিডেন্সিয়াল স্যুইট',
    nameEn: 'Grand Imperial Presidential Suites',
    locationBn: 'হোটেল টাওয়ার জোন, কক্সবাজার',
    locationEn: 'Hotel Tower Zone, Cox’s Bazar',
    category: 'suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    priceStart: '১৫,০০,০০০ ৳',
    annualRoi: '১৫.২% বাৎসরিক',
    occupancyRate: '৮৯%',
    featuresBn: ['স্মার্ট অটোমেশন', 'জ্যাকুজি ও ব্যালকনি বার', 'কনসিয়ার্জ সার্ভিস', 'লাইফটাইম রয়্যালটি'],
    featuresEn: ['Smart Home Automation', 'Jacuzzi & Balcony Bar', '24/7 Concierge', 'Lifetime Royalty'],
    descriptionBn: 'ভিআইপি ও কর্পোরেট অতিথিদের জন্য প্রিমিয়াম প্রেসিডেন্সিয়াল স্যুইট প্রপার্টি শেয়ার।',
    descriptionEn: 'Premium presidential suite fractional ownership tailored for luxury and corporate clients.'
  },
  {
    id: 'p-3',
    nameBn: 'স্কাই ইনফিনিটি পুল অ্যান্ড স্পা রিসোর্ট',
    nameEn: 'Skyline Infinity Pool & Spa Resort',
    locationBn: 'সেন্টমার্টিন কোরাল আইল্যান্ড',
    locationEn: 'Saint Martin Coral Island',
    category: 'villa',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
    priceStart: '১২,৫০,০০০ ৳',
    annualRoi: '১৪.০% বাৎসরিক',
    occupancyRate: '৯৫%',
    featuresBn: ['ফ্লোটিং ইনফিনিটি পুল', 'আয়ুর্বেদিক স্পা', 'হ্যালিপ্যাড সুবিধা', 'সরাসরি ডিভিডেন্ড'],
    featuresEn: ['Floating Sky Pool', 'Ayurvedic Spa Center', 'Helipad Facility', 'Direct Dividend'],
    descriptionBn: 'প্রকৃতির নির্মল কোরালে ফ্লোটিং ওয়াটার ভিলা ও লাক্সারি ওয়েলনেস স্পা প্রজেক্ট।',
    descriptionEn: 'Exclusive floating luxury villas with natural coral views and wellness spa center.'
  },
  {
    id: 'p-4',
    nameBn: 'নোয়াহ দুবাই মেরিনা প্রিমিয়ার রেসিডেন্স',
    nameEn: 'Noah Dubai Marina Premier Residence',
    locationBn: 'দুবাই মেরিনা, সংযুক্ত আরব আমিরাত',
    locationEn: 'Dubai Marina, UAE',
    category: 'hotel',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    priceStart: '২৫,০০,০০০ ৳',
    annualRoi: '১৬.৫% বাৎসরিক (USD/AED)',
    occupancyRate: '৯৪%',
    featuresBn: ['ট্যাক্স-ফ্রি রিটার্ন', 'দুবাই গোল্ডেন ভিসা সাপোর্ট', 'মেরিনা ক্রুজ অ্যাক্সেস', 'বৈদেশিক মুদ্রা ইনকাম'],
    featuresEn: ['Tax-Free Global Return', 'Golden Visa Eligibility', 'Marina Cruise Access', 'USD/AED Earnings'],
    descriptionBn: 'প্রবাসী বাংলাদেশি ও বৈশ্বিক বিনিয়োগকারীদের জন্য আন্তর্জাতিক ট্যাক্স-ফ্রি রিয়েল এস্টেট প্রজেক্ট।',
    descriptionEn: 'International tax-free luxury real estate investment with foreign currency dividends.'
  }
];

export const RAW_PROMPT_TEMPLATE = `Prompt: > A sleek and modern promotional video presenter style. A professional Bengali female presenter in a tailored suit standing in a modern office setup with a warm, elegant background, addressing the audience with enthusiasm and clarity. Dynamic visual overlays and motion graphics smoothly pop up around her, showing luxurious beach resort properties, 5-star hotel rooms, floating swimming pools, and investment growth charts. Smooth visual transitions, bright professional lighting, corporate presentation style, 4k resolution, hyper-realistic, cinematic motion, friendly and persuasive tone.

📌 প্রম্পট ব্যবহার করার সময় কিছু টিপস:
ভয়েসওভার/অডিও: আপনি যদি AI দিয়ে পুরো ভিডিও উইথ ভয়েস জেনারেট করতে চান, তবে স্ক্রিপ্ট হিসেবে আপনার রিসোর্ট/হোটেলের অফারের আসল তথ্যগুলো ভয়েস ওভারে যুক্ত করে দিতে পারেন।

ব্র্যান্ডিং/যোগাযোগ: ভিডিওর শেষে আপনার কোম্পানির যোগাযোগের নম্বর (যেমন WhatsApp/Call) যুক্ত করার জন্য AI এডিটিং ফ্রেম অথবা ভিডিও এডিটিং সফটওয়্যার (যেমন CapCut) দিয়ে শেষের টেক্সট এডিট করে নিতে পারেন।`;
