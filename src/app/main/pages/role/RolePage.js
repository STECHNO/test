import React from 'react';

export const RolePage = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/role_page',
            component: React.lazy(() => import('../../apps/role/Role'))
        }
    ]
};