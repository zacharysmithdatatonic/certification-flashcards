import React from 'react';
import { Box, Container, Typography, Stack, Button, Chip } from '@mui/material';
import type { ProviderInfo, QuestionBank, TierInfo } from '../../lib/banks';
import {
    CERTIFICATION_PROVIDERS,
    getBankBasePath,
    getBanksByTier,
} from '../../lib/banks';
import { getAssetUrl } from '../../lib/assets';
import { Lock } from 'lucide-react';
import { getCertificationIcon } from '../../lib/certificationIcons';
import { getProviderLogo } from '../../lib/providerLogos';
import { ReactProviders } from './ReactProviders';

const CertificationItem: React.FC<{ bank: QuestionBank }> = ({ bank }) => {
    const href = bank.available ? getBankBasePath(bank) : undefined;

    return (
        <Button
            component={href ? 'a' : 'button'}
            href={href}
            disabled={!bank.available}
            variant="text"
            sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                padding: '0.35rem 0',
                minHeight: 32,
                overflow: 'hidden',
                alignItems: 'center',
                color: bank.available ? 'text.primary' : 'text.disabled',
                '& .MuiButton-startIcon': {
                    marginLeft: 1,
                    marginRight: 1,
                },
            }}
            startIcon={
                <Box
                    sx={{
                        color: bank.available ? bank.color : 'text.disabled',
                    }}
                >
                    {getCertificationIcon(bank.key, 18)}
                </Box>
            }
        >
            <Stack spacing={0.25} sx={{ alignItems: 'flex-start' }}>
                <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{ alignItems: 'center' }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {bank.name}
                    </Typography>
                    {bank.beta && (
                        <Chip
                            label="Beta"
                            size="small"
                            sx={{
                                height: 18,
                                fontSize: '0.625rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                bgcolor: '#e8f0fe',
                                color: '#1a73e8',
                                border: '1px solid #cce0ff',
                                '& .MuiChip-label': {
                                    px: 0.6,
                                },
                            }}
                        />
                    )}
                </Stack>
                {!bank.available && (
                    <Typography variant="caption" color="text.secondary">
                        <Lock size={12} /> Coming soon
                    </Typography>
                )}
            </Stack>
        </Button>
    );
};

const TierColumn: React.FC<{
    tierInfo: TierInfo;
    banks: QuestionBank[];
}> = ({ tierInfo, banks }) => {
    return (
        <Box
            sx={{
                borderLeft: '4px solid',
                borderColor: tierInfo.color,
                pl: 2,
                py: 1,
            }}
        >
            <Stack spacing={1.5}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {tierInfo.name} certification
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {tierInfo.description}
                    </Typography>
                </Box>
                <Typography variant="overline" color="text.secondary">
                    Role
                </Typography>
                <Stack spacing={0.5}>
                    {banks.map(bank => (
                        <CertificationItem key={bank.key} bank={bank} />
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
};

const ProviderSection: React.FC<{ provider: ProviderInfo }> = ({
    provider,
}) => (
    <Stack spacing={2} component="section">
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
            <Box sx={{ display: 'flex', color: 'text.primary' }} aria-hidden>
                {getProviderLogo(provider.key, 28)}
            </Box>
            <Typography variant="h5">{provider.name}</Typography>
        </Stack>
        <Box
            sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                    xs: '1fr',
                    md: `repeat(${provider.tiers.length}, 1fr)`,
                },
            }}
        >
            {provider.tiers.map(tierInfo => (
                <TierColumn
                    key={tierInfo.key}
                    tierInfo={tierInfo}
                    banks={getBanksByTier(provider.key, tierInfo.key)}
                />
            ))}
        </Box>
    </Stack>
);

function CertificationSelectorContent() {
    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    <Stack spacing={2} sx={{ alignItems: 'center' }}>
                        <Stack
                            direction="row"
                            spacing={{ xs: 1.5, md: 2 }}
                            sx={{ alignItems: 'center' }}
                        >
                            <Box
                                component="img"
                                src={getAssetUrl('/logo.png')}
                                alt=""
                                sx={{
                                    width: { xs: 44, md: 60 },
                                    height: { xs: 44, md: 60 },
                                }}
                            />
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '1.875rem', md: '2.5rem' },
                                    fontWeight: 500,
                                    letterSpacing: '-0.01em',
                                    lineHeight: 1.2,
                                    textWrap: 'balance',
                                }}
                            >
                                Certification Flashcards
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                textAlign: 'center',
                                maxWidth: 700,
                                textWrap: 'pretty',
                            }}
                        >
                            Choose a provider and certification track to start
                            studying with focused flashcards tailored to the
                            exam.
                        </Typography>
                    </Stack>

                    {CERTIFICATION_PROVIDERS.map(provider => (
                        <ProviderSection
                            key={provider.key}
                            provider={provider}
                        />
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}

export function CertificationSelector() {
    return (
        <ReactProviders>
            <CertificationSelectorContent />
        </ReactProviders>
    );
}
