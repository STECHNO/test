import React from 'react';

export const EditCategoryConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/categories/edit_category/:id',
            component: React.lazy(() => import('./EditCategory'))
        }
    ]
}