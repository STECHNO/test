import React from 'react';
import { FuseExample, FuseHighlight, FusePageSimple } from '@fuse';
import { Button, Icon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
/* eslint import/no-webpack-loader-syntax: off */
/* eslint no-unused-vars: off */
/* eslint-disable jsx-a11y/accessible-emoji */
const useStyles = makeStyles(theme => ({
    layoutRoot: {
        '& .description': {
            marginBottom: 16
        }
    }
}));

function DialogsDoc(props) {
    const classes = useStyles();
    return (

        <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-16">
                            <Icon className="text-18" color="action">home</Icon>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Documentation</Typography>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Material UI Components</Typography>
                        </div>
                        <Typography variant="h6">Dialogs</Typography>
                    </div>
                    <Button
                        className="normal-case"
                        variant="contained"
                        component="a"
                        href="https://material-ui.com/components/dialogs"
                        target="_blank"
                    >
                        <Icon className="mr-4">link</Icon>
                        Reference
                    </Button>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl">
                    <Typography className="text-44 mt-32 mb-8" component="h1">Dialogs</Typography>
                    <Typography className="description">Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple
                        tasks.</Typography>

                    <Typography className="mb-16" component="div">A <a href="https://material.io/design/components/dialogs.html">Dialog</a> is a type of <a
                        href="/components/modal/">modal</a> window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all
                        app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.</Typography>
                    <Typography className="mb-16" component="div">Dialogs are purposefully interruptive, so they should be used sparingly.</Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Simple Dialogs</Typography>
                    <Typography className="mb-16" component="div">Simple dialogs can provide additional details or actions about a list item.
                        For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account).</Typography>
                    <Typography className="mb-16" component="div">Touch mechanics:</Typography>
                    <ul>
                        <li>Choosing an option immediately commits the option and closes the menu</li>
                        <li>Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog</li>
                    </ul>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/SimpleDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/SimpleDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Alerts</Typography>
                    <Typography className="mb-16" component="div">Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.</Typography>
                    <Typography className="mb-16" component="div">Most alerts don&#39;t need titles.
                        They summarize a decision in a sentence or two by either:</Typography>
                    <ul>
                        <li>Asking a question (e.g. &quot;Delete this conversation?&quot;)</li>
                        <li>Making a statement related to the action buttons</li>
                    </ul>
                    <Typography className="mb-16" component="div">Use title bar alerts only for high-risk situations, such as the potential loss of connectivity.
                        Users should be able to understand the choices based on the title and button text alone.</Typography>
                    <Typography className="mb-16" component="div">If a title is required:</Typography>
                    <ul>
                        <li>Use a clear question or statement with an explanation in the content area, such as &quot;Erase USB storage?&quot;.</li>
                        <li>Avoid apologies, ambiguity, or questions, such as “Warning!” or “Are you sure?”</li>
                    </ul>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/AlertDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/AlertDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Transitions</Typography>
                    <Typography className="mb-16" component="div">You can also swap out the transition, the next example uses <code>{`Slide`}</code>.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/AlertDialogSlide.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/AlertDialogSlide.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Form dialogs</Typography>
                    <Typography className="mb-16" component="div">Form dialogs allow users to fill out form fields within a dialog.
                    For example, if your site prompts for potential subscribers to fill in their email address, they can fill out the email field and
                        touch &#39;Submit&#39;.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/FormDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/FormDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Customized dialogs</Typography>
                    <Typography className="mb-16" component="div">Here is an example of customizing the component. You can learn more about this in the
                        <a href="/customization/components/">overrides documentation page</a>.</Typography>
                    <Typography className="mb-16" component="div">The dialog has a close button added to aide usability.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/CustomizedDialogs.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/CustomizedDialogs.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Full-screen dialogs</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/FullScreenDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/FullScreenDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Optional sizes</Typography>
                    <Typography className="mb-16" component="div">You can set a dialog maximum width by using the <code>{`maxWidth`}</code> enumerable in combination with
                        the <code>{`fullWidth`}</code> boolean.
                        When the <code>{`fullWidth`}</code> property is true, the dialog will adapt based on the <code>{`maxWidth`}</code> value.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/MaxWidthDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/MaxWidthDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Responsive full-screen</Typography>
                    <Typography className="mb-16" component="div">You may make a dialog responsively full screen using <code>{`withMobileDialog`}</code>. By
                        default, <code>{`withMobileDialog()(Dialog)`}</code> responsively full screens <em>at or below</em> the <code>{`sm`}</code> <a
                            href="/customization/breakpoints/">screen size</a>. You can choose your own breakpoint for example <code>{`xs`}</code> by passing
                        the <code>{`breakpoint`}</code> argument: <code>{`withMobileDialog({breakpoint: &#39;xs&#39;})(Dialog)`}</code>.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/ResponsiveDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/ResponsiveDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Confirmation dialogs</Typography>
                    <Typography className="mb-16" component="div">Confirmation dialogs require users to explicitly confirm their choice before an option is committed.
                        For example, users can listen to multiple ringtones but only make a final selection upon touching “OK”.</Typography>
                    <Typography className="mb-16" component="div">Touching “Cancel” in a confirmation dialog, or pressing Back, cancels the action, discards any changes, and closes
                        the dialog.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/ConfirmationDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/ConfirmationDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Accessibility</Typography>
                    <Typography className="mb-16" component="div">Follow the <a href="/components/modal/#accessibility">Modal accessibility section</a>.</Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Scrolling long content</Typography>
                    <Typography className="mb-16" component="div">When dialogs become too long for the user’s viewport or device, they scroll.</Typography>
                    <ul>
                        <li><code>{`scroll=paper`}</code> the content of the dialog scrolls within the paper element.</li>
                        <li><code>{`scroll=body`}</code> the content of the dialog scrolls within the body element.</li>
                    </ul>
                    <Typography className="mb-16" component="div">Try the demo below to see what we mean:</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/ScrollDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/ScrollDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Draggable dialog</Typography>
                    <Typography className="mb-16" component="div">You can create a draggable dialog by using <a
                        href="https://github.com/mzabriskie/react-draggable">react-draggable</a>.
                        To do so, you can pass the the imported <code>{`Draggable`}</code> component as the <code>{`PaperComponent`}</code> of
                        the <code>{`Dialog`}</code> component.
                        This will make the entire dialog draggable.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/documentation/material-ui-components/components/dialogs/DraggableDialog.js').default}
                        raw={require('!raw-loader!app/main/documentation/material-ui-components/components/dialogs/DraggableDialog.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Performance</Typography>
                    <Typography className="mb-16" component="div">Follow the <a href="/components/modal/#performance">Modal performance section</a>.</Typography>

                </div>
            }
        />

    );
}

export default DialogsDoc;
