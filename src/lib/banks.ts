export interface CaseStudy {
    name: string;
    url: string;
}

export interface Question {
    id: string;
    question: string;
    options: string[];
    answer: string[];
    explanation: string;
    caseStudy?: CaseStudy;
    explanationLinks?: string[];
    questionImages?: string[];
    optionImages?: Array<string | null>;
}

export interface QuestionPerformance {
    questionId: string;
    correctCount: number;
    incorrectCount: number;
    lastAnswered: Date | null;
    lastCorrect: boolean | null;
    scheduledNext: number | null;
}

export type StudyMode =
    | 'quiz'
    | 'exam'
    | 'review'
    | 'memorise'
    | 'fill-in-blank';

export type CertificationProvider = 'google-cloud' | 'anthropic';

export type CertificationTier =
    | 'foundational'
    | 'associate'
    | 'professional'
    | 'foundations';

/** Official standard-exam length (not the shorter renewal exam). */
export interface ExamSpec {
    durationMinutes: number;
    questionCountMin: number;
    questionCountMax: number;
}

export interface QuestionBank {
    key: string;
    name: string;
    shortName: string;
    provider: CertificationProvider;
    tier: CertificationTier;
    dataset: string | null;
    available: boolean;
    beta?: boolean;
    color: string;
    exam: ExamSpec;
}

const EXAM_FOUNDATIONAL: ExamSpec = {
    durationMinutes: 90,
    questionCountMin: 50,
    questionCountMax: 60,
};

const EXAM_STANDARD: ExamSpec = {
    durationMinutes: 120,
    questionCountMin: 50,
    questionCountMax: 60,
};

const EXAM_PDE: ExamSpec = {
    durationMinutes: 120,
    questionCountMin: 40,
    questionCountMax: 50,
};

const EXAM_PAA: ExamSpec = {
    durationMinutes: 180,
    questionCountMin: 50,
    questionCountMax: 80,
};

/** CCAR-F: 60 items across 4 of 6 scenarios in 120 minutes. */
const EXAM_CCAR_F: ExamSpec = {
    durationMinutes: 120,
    questionCountMin: 60,
    questionCountMax: 60,
};

export interface TierInfo {
    key: CertificationTier;
    name: string;
    color: string;
    description: string;
}

export interface ProviderInfo {
    key: CertificationProvider;
    name: string;
    /** Tiers in the order they are shown on the homepage. */
    tiers: TierInfo[];
}

const ANTHROPIC_COLOR = '#D97757';
const ANTHROPIC_PROFESSIONAL_COLOR = '#A9583E';

export const CERTIFICATION_PROVIDERS: ProviderInfo[] = [
    {
        key: 'google-cloud',
        name: 'Google Cloud',
        tiers: [
            {
                key: 'foundational',
                name: 'Foundational',
                color: '#34A853',
                description:
                    'Validates broad knowledge of cloud concepts and Google Cloud products, services, and tools.',
            },
            {
                key: 'associate',
                name: 'Associate',
                color: '#FBBC05',
                description:
                    'Validates fundamental skills to deploy and maintain cloud projects.',
            },
            {
                key: 'professional',
                name: 'Professional',
                color: '#4285F4',
                description:
                    'Validates advanced skills in design, implementation, and management.',
            },
        ],
    },
    {
        key: 'anthropic',
        name: 'Anthropic',
        tiers: [
            {
                key: 'foundations',
                name: 'Foundations',
                color: ANTHROPIC_COLOR,
                description:
                    'Validates practical judgment building production solutions with Claude, Claude Code, the Agent SDK, and MCP.',
            },
            {
                key: 'professional',
                name: 'Professional',
                color: ANTHROPIC_PROFESSIONAL_COLOR,
                description:
                    'Validates advanced expertise designing and operating Claude systems at scale.',
            },
        ],
    },
];

export const QUESTION_BANKS: QuestionBank[] = [
    {
        key: 'cdl',
        name: 'Cloud Digital Leader',
        shortName: 'CDL',
        provider: 'google-cloud',
        tier: 'foundational',
        dataset: '/cdl.json',
        available: true,
        color: '#34A853',
        exam: EXAM_FOUNDATIONAL,
    },
    {
        key: 'genai',
        name: 'Generative AI Leader',
        shortName: 'GenAI',
        provider: 'google-cloud',
        tier: 'foundational',
        dataset: '/genai.json',
        available: true,
        color: '#34A853',
        exam: EXAM_FOUNDATIONAL,
    },
    {
        key: 'ace',
        name: 'Cloud Engineer',
        shortName: 'ACE',
        provider: 'google-cloud',
        tier: 'associate',
        dataset: null,
        available: false,
        color: '#FBBC05',
        exam: EXAM_STANDARD,
    },
    {
        key: 'adp',
        name: 'Data Practitioner',
        shortName: 'ADP',
        provider: 'google-cloud',
        tier: 'associate',
        dataset: null,
        available: false,
        color: '#FBBC05',
        exam: EXAM_STANDARD,
    },
    {
        key: 'agwa',
        name: 'Google Workspace Administrator',
        shortName: 'AGWA',
        provider: 'google-cloud',
        tier: 'associate',
        dataset: null,
        available: false,
        color: '#FBBC05',
        exam: EXAM_STANDARD,
    },
    {
        key: 'pca',
        name: 'Cloud Architect',
        shortName: 'PCA',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: '/pca.json',
        available: true,
        color: '#4285F4',
        exam: EXAM_STANDARD,
    },
    {
        key: 'pcde',
        name: 'Cloud Database Engineer',
        shortName: 'PCDE',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: null,
        available: false,
        color: '#4285F4',
        exam: EXAM_STANDARD,
    },
    {
        key: 'pcd',
        name: 'Cloud Developer',
        shortName: 'PCD',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: '/pcd.json',
        available: true,
        color: '#4285F4',
        exam: EXAM_STANDARD,
    },
    {
        key: 'pde',
        name: 'Data Engineer',
        shortName: 'PDE',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: '/pde.json',
        available: true,
        color: '#4285F4',
        exam: EXAM_PDE,
    },
    {
        key: 'pcdo',
        name: 'Cloud DevOps Engineer',
        shortName: 'PCDO',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: null,
        available: false,
        color: '#4285F4',
        exam: EXAM_STANDARD,
    },
    {
        key: 'pcse',
        name: 'Cloud Security Engineer',
        shortName: 'PCSE',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: null,
        available: false,
        color: '#4285F4',
        exam: EXAM_STANDARD,
    },
    {
        key: 'pcne',
        name: 'Cloud Network Engineer',
        shortName: 'PCNE',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: null,
        available: false,
        color: '#4285F4',
        exam: EXAM_STANDARD,
    },
    {
        key: 'pmle',
        name: 'Machine Learning Engineer',
        shortName: 'PMLE',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: '/pmle.json',
        available: true,
        color: '#4285F4',
        exam: EXAM_STANDARD,
    },
    {
        key: 'paa',
        name: 'Agentic Architect',
        shortName: 'PAA',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: '/paa.json',
        available: true,
        beta: true,
        color: '#4285F4',
        exam: EXAM_PAA,
    },
    {
        key: 'psoe',
        name: 'Security Operations Engineer',
        shortName: 'PSOE',
        provider: 'google-cloud',
        tier: 'professional',
        dataset: null,
        available: false,
        color: '#4285F4',
        exam: EXAM_STANDARD,
    },
    {
        key: 'ccar-f',
        name: 'Claude Certified Architect',
        shortName: 'CCAR-F',
        provider: 'anthropic',
        tier: 'foundations',
        dataset: '/ccar-f.json',
        available: true,
        color: ANTHROPIC_COLOR,
        exam: EXAM_CCAR_F,
    },
    {
        key: 'cca-f',
        name: 'Claude Certified Associate',
        shortName: 'CCA-F',
        provider: 'anthropic',
        tier: 'foundations',
        dataset: null,
        available: false,
        color: ANTHROPIC_COLOR,
        exam: EXAM_CCAR_F,
    },
    {
        key: 'ccd-f',
        name: 'Claude Certified Developer',
        shortName: 'CCD-F',
        provider: 'anthropic',
        tier: 'foundations',
        dataset: null,
        available: false,
        color: ANTHROPIC_COLOR,
        exam: EXAM_CCAR_F,
    },
    {
        key: 'ccar-p',
        name: 'Claude Certified Architect',
        shortName: 'CCAR-P',
        provider: 'anthropic',
        tier: 'professional',
        dataset: null,
        available: false,
        color: ANTHROPIC_PROFESSIONAL_COLOR,
        exam: EXAM_CCAR_F,
    },
];

export const toSlug = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const getBankFromParams = (
    provider: string | undefined,
    tier: string | undefined,
    slug: string | undefined
): QuestionBank | null => {
    if (!provider || !tier || !slug) return null;
    return (
        QUESTION_BANKS.find(
            bank =>
                bank.provider === provider &&
                bank.tier === tier &&
                toSlug(bank.name) === slug &&
                bank.available
        ) || null
    );
};

export const getStaticBankPaths = () =>
    QUESTION_BANKS.filter(b => b.available).map(bank => ({
        params: {
            provider: bank.provider,
            tier: bank.tier,
            slug: toSlug(bank.name),
        },
        props: { bank },
    }));

export const getBankBasePath = (bank: QuestionBank) =>
    `${import.meta.env.BASE_URL}${bank.provider}/${bank.tier}/${toSlug(bank.name)}/`;

export const getBankModePath = (bank: QuestionBank, mode: StudyMode) => {
    const modeSegment = mode === 'fill-in-blank' ? 'fill-in-blank' : mode;
    return `${getBankBasePath(bank)}${modeSegment}`;
};

export const getBanksByTier = (
    provider: CertificationProvider,
    tier: CertificationTier
) =>
    QUESTION_BANKS.filter(
        bank => bank.provider === provider && bank.tier === tier
    ).sort((a, b) => {
        if (a.available && !b.available) return -1;
        if (!a.available && b.available) return 1;
        return 0;
    });

export const MODE_LABELS: Record<StudyMode, string> = {
    quiz: 'Quiz Mode',
    exam: 'Exam Mode',
    review: 'Review Mode',
    memorise: 'Memorise Mode',
    'fill-in-blank': 'Fill-in-Blank Mode',
};

export const MODE_SHORT_LABELS: Record<StudyMode, string> = {
    quiz: 'Quiz',
    exam: 'Exam',
    review: 'Review',
    memorise: 'Memorise',
    'fill-in-blank': 'Fill-in-Blank',
};
