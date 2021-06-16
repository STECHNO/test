import React from 'react';

export const PrivacyPolicyPage = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/privacy-policy_page',
            component: React.lazy(() => import('../../apps/privacy_policy/PrivacyPolicy'))
        }
    ]
};