import React from 'react';
import { Hidden, Icon, IconButton, Input, Paper, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
function ContactsHeader(props) {

    return (
        <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

            <div className="flex flex-shrink items-center sm:w-224">
                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-12">description</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" className="hidden sm:flex">Permissions</Typography>
                    </FuseAnimate>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
            </div>
        </div>
    );
}

export default ContactsHeader;
