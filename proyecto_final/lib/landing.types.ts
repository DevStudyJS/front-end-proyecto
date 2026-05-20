export interface Stat {
  number: string;
  label: string;
}

export interface HeroData {
  courses: string;
  lessons: string;
  students: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  desc: string;
}

export interface StepItem {
  step: string;
  title: string;
  desc: string;
}

export interface Review {
  name: string;
  image: string;
  stars: number;
  role: string;
  text: string;
}

export interface LandingContent {
  hero: HeroData;
  features: {
    title: string;
    subtitle: string;
    cards: FeatureCard[];
  };
  steps: {
    title: string;
    subtitle: string;
    items: StepItem[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    reviews: Review[];
  };
  cta: {
    title: string;
    subtitle: string;
    btnPrimary: string;
    btnSecondary: string;
    badges: string[];
  };
}