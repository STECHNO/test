import React from 'react';

export const PermissionPage = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/permissions_page',
            component: React.lazy(() => import('../../apps/permissions/Permissions'))
        }
    ]
};