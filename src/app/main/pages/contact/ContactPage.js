import React from 'react';

export const ContactPage = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/contact_page',
            component: React.lazy(() => import('../../apps/contacts/ContactsApp'))
        }
    ]
};