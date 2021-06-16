import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Icon, Input } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import BaseUrl from '../../../../utils/baseUrl'
import swal from 'sweetalert';

const useStyles = makeStyles({
    contentHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '15px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'flex-start',
        marginTop: '15px',
    },
    contentHeading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'flex-start',
        marginTop: '15px',
    },
    contentItem: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '15px',
        borderBottomWidth: '2px',
        borderBottomColor: 'gray',
        width: '25%',
    },

});


function PrivacyPolicyContent(props) {

    const classes = useStyles(props);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <div className={classes.contentHeader}>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                Ipsum, ut doloribus vitae rerum numquam suscipit aliquam enim 
                                quod, aliquid laudantium est culpa perferendis, sequi eos iste 
                                dicta temporibus officiis beatae. <br/><br/>
                            </div>

                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                Ipsum, ut doloribus vitae rerum numquam suscipit aliquam enim 
                                quod, aliquid laudantium est culpa perferendis, sequi eos iste 
                                dicta temporibus officiis beatae.<br/><br/>
                            </div>

                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                Ipsum, ut doloribus vitae rerum numquam suscipit aliquam enim 
                                quod, aliquid laudantium est culpa perferendis, sequi eos iste 
                                dicta temporibus officiis beatae.<br/><br/>
                            </div>

                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                Ipsum, ut doloribus vitae rerum numquam suscipit aliquam enim 
                                quod, aliquid laudantium est culpa perferendis, sequi eos iste 
                                dicta temporibus officiis beatae.
                            </div>
                        </div>
                    </FuseAnimate>

                   
                </ThemeProvider>

            </Container>
        </div>
    )
}

export default PrivacyPolicyContent;