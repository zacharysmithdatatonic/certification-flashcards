import React from 'react';
import type { CertificationProvider } from './banks';

interface LogoProps {
    size: number;
}

/** Google Cloud mark from devicon (MIT). */
const GoogleCloudLogo: React.FC<LogoProps> = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        role="img"
        aria-label="Google Cloud"
    >
        <path
            fill="#ea4535"
            d="M80.6 40.3h.4l-.2-.2 14-14v-.3c-11.8-10.4-28.1-14-43.2-9.5C36.5 20.8 24.9 32.8 20.7 48c.2-.1.5-.2.8-.2 5.2-3.4 11.4-5.4 17.9-5.4 2.2 0 4.3.2 6.4.6.1-.1.2-.1.3-.1 9-9.9 24.2-11.1 34.6-2.6h-.1z"
        />
        <path
            fill="#557ebf"
            d="M108.1 47.8c-2.3-8.5-7.1-16.2-13.8-22.1L80 39.9c6 4.9 9.5 12.3 9.3 20v2.5c16.9 0 16.9 25.2 0 25.2H63.9v20h-.1l.1.2h25.4c14.6.1 27.5-9.3 31.8-23.1 4.3-13.8-1-28.8-13-36.9z"
        />
        <path
            fill="#36a852"
            d="M39 107.9h26.3V87.7H39c-1.9 0-3.7-.4-5.4-1.1l-15.2 14.6v.2c6 4.3 13.2 6.6 20.7 6.6z"
        />
        <path
            fill="#f9bc15"
            d="M40.2 41.9c-14.9.1-28.1 9.3-32.9 22.8-4.8 13.6 0 28.5 11.8 37.3l15.6-14.9c-8.6-3.7-10.6-14.5-4-20.8 6.6-6.4 17.8-4.4 21.7 3.8L68 55.2C61.4 46.9 51.1 42 40.2 42.1z"
        />
    </svg>
);

/** Anthropic mark from Simple Icons (CC0); inherits the text colour so it works in both themes. */
const AnthropicLogo: React.FC<LogoProps> = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        role="img"
        aria-label="Anthropic"
        fill="currentColor"
    >
        <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
);

const PROVIDER_LOGOS: Record<CertificationProvider, React.FC<LogoProps>> = {
    'google-cloud': GoogleCloudLogo,
    anthropic: AnthropicLogo,
};

export const getProviderLogo = (
    provider: CertificationProvider,
    size: number = 24
) => {
    const Logo = PROVIDER_LOGOS[provider];
    return <Logo size={size} />;
};
