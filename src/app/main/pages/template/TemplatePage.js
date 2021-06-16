import React from 'react';

export const TemplatePage = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/template',
            component: React.lazy(() => import('../../apps/template/Template'))
        }
    ]
};