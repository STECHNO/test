import React from 'react';

export const UsersPage = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/users_page',
            component: React.lazy(() => import('../../apps/users/Users'))
        }
    ]
};