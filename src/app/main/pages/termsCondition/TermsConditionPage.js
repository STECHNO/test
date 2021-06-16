import React from 'react';

export const TermsConditionPage = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/terms-condition_page',
            component: React.lazy(() => import('../../apps/terms_condition/TermsCondition'))
        }
    ]
};