import React, { useEffect, useRef } from "react";
import { FusePageSimple, FuseAnimate } from "@fuse";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import TemplateHeader from "./TemplateHeader";
import TemplateContent from './TemplateContent'

const useStyles = makeStyles({
    addButton: {
        position: "absolute",
        right: 12,
        bottom: 12,
        zIndex: 99,
    },
});

function Template(props) {

    const classes = useStyles(props);
    const pageLayout = useRef(null);


    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content: "flex flex-col h-full",
                    leftSidebar: "w-256 border-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
                }}
                header={<TemplateHeader />}
                content={<TemplateContent />}
                ref={pageLayout}
                innerScroll
            />
        </React.Fragment>
    );
}

export default Template;
