import React, { useState, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Icon, Input } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import EmailEditor from 'react-email-editor';


import swal from 'sweetalert';

const useStyles = makeStyles({
    contentHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '35px',
        overflowX: 'scroll',
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
        flexDirection: 'column',
        marginTop: '15px',
        alignItems: 'center',
        justifyContent: 'center'
    },


});

function TemplateContent(props) {
    const emailEditorRef = useRef(null);

    const exportHtml = () => {
        emailEditorRef.current.editor.saveDesign((value) => {

            emailEditorRef.current.editor.exportHtml((data) => {
                const { design, html } = data;
                console.log(typeof html)

                fetch('http://localhost:5014/api/createTemplate', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        email_template: html,
                        saveJson: value
                    })
                }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
                console.log('exportdesign', design);
            })

        });
    };


    const onLoad = () => {
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    };


    const classes = useStyles(props);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);




    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <div className={classes.contentHeader}>
                            <EmailEditor
                                ref={emailEditorRef}
                                onLoad={onLoad}
                                minHeight='700px'
                                options={
                                    {
                                        mergeTags: [
                                            {
                                                name: "First Name",
                                                value: "{{first_name}}",
                                                sample: "John"
                                            },
                                            {
                                                name: "Last Name",
                                                value: "{{last_name}}",
                                                sample: "Doe"
                                            }

                                        ]

                                    }
                                }
                            />
                        </div>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <div className={classes.contentItem}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={exportHtml}
                            >
                                Export HTML
                            </Button>
                        </div>
                    </FuseAnimate>



                </ThemeProvider>

            </Container>
        </div>
    )
}

export default TemplateContent;