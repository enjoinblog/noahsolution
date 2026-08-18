export interface VideoChapter {
  id: string;
  startTime: number; // in seconds (0 to 110)
  endTime: number;
  titleBn: string;
  titleEn: string;
  badgeBn: string;
  badgeEn: string;
  voiceoverScriptBn: string;
  voiceoverScriptEn: string;
  overlayType: 'hook' | 'resort_showcase' | 'suite_features' | 'roi_growth' | 'cta_contacts';
  presenterPose: 'speaking_hands' | 'pointing_right' | 'holding_tablet' | 'welcoming' | 'closing_call';
  highlightMetric?: {
    value: string;
    labelBn: string;
    labelEn: string;
    sublabel: string;
  };
  featuredImage?: string;
  secondaryImage?: string;
}

export interface PropertyItem {
  id: string;
  nameBn: string;
  nameEn: string;
  locationBn: string;
  locationEn: string;
  category: 'resort' | 'hotel' | 'villa' | 'suite';
  image: string;
  priceStart: string;
  annualRoi: string;
  occupancyRate: string;
  featuresBn: string[];
  featuresEn: string[];
  descriptionBn: string;
  descriptionEn: string;
}

export interface ContactInfo {
  whatsapp1: string;
  whatsapp2: string;
  phoneCall: string;
  companyName: string;
  taglineBn: string;
  taglineEn: string;
  addressBn: string;
  addressEn: string;
  email: string;
}

export type VideoAspectRatio = '16:9' | '9:16';
export type LanguageMode = 'bn' | 'en';
