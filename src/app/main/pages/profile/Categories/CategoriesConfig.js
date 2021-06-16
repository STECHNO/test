import React from 'react';

export const CategoriesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/categories/all',
            component: React.lazy(() => import('./Categories'))
        }
    ]
}