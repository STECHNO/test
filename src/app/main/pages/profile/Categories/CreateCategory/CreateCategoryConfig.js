import React from 'react';

export const CreateCategoryConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/categories/add_category',
            component: React.lazy(() => import('./CreateCategory'))
        }
    ]
}