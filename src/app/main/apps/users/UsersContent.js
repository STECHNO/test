import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Icon, Input } from '@material-ui/core';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import BaseUrl from './../../../../utils/baseUrl'

// import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import AccordionActions from '@material-ui/core/ExpansionPanelActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '2rem',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        // alignItems: 'center',
    },
    column: {
        // flexBasis: '33.33%',
        flexBasis: '25%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    moduleDiv: {
        marginLeft: '10px',
        marginRight: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '13px',
        paddingBottom: '14px',
        borderWidth: '1px',
        borderColor: 'gray',
        marginTop: '10px',
        '&:hover': {
            cursor: 'pointer',
            opacity: '0.8',
            backgroundColor: '#4295E3',
            color: '#ffffff',
            borderWidth: '1px',
            borderColor: '#4295E3',

        }
    },
    selectModuleDiv: {
        marginLeft: '10px',
        marginRight: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '13px',
        paddingBottom: '14px',
        borderWidth: '1px',
        borderColor: 'gray',
        marginTop: '10px',
        cursor: 'pointer',
        opacity: '0.8',
        backgroundColor: '#4295E3',
        color: '#ffffff',
        borderWidth: '1px',
        borderColor: '#4295E3'
    },
    permissionsDiv: {
        marginLeft: '10px',
        marginRight: '10px',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderWidth: '1px',
        borderColor: 'gray',
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    formControl: {
        minWidth: '95%',
        padding: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)',
        marginTop: '20px',
    },
    rolesModal: {
        backgroundColor: '#ffffff',
        boxShadow: '0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)',
        marginTop: '20px',
        marginLeft: '10px',
    },
    rolesModalBtn: {
        padding: '1.6rem',
        width: '100%'
    },
    modalBtn: {
        padding: '1.6rem',
        width: '100%',
        marginTop: '5px'
    },
    // selectEmpty: {
    //     marginTop: theme.spacing(2),
    // },
    select: {
        // height: '100px',
        // minHeight: '100px',
        // maxHeight: '100px',
        // margin: '4px',
        // paddingTop: '5px',
        // paddingBottom: '5px'
    },
    acc: {
        display: 'flex',
        flexDirection: 'row',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 5, 4),
    },
    modalRole: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4%',
    },
    roleModalDiv: {
        width: '250px',
        padding: '2%',
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


function UsersContent(props) {
    const [open, setOpen] = useState(false);
    const unCheck = (v) => {
        const arr = modulePermission.filter((item) => {
            return item !== v
        })
        setModulePermission(arr)
    }
    const Check = (v) => {
        console.log([...modulePermission, v])
        setModulePermission([...modulePermission, v])
    }
    const handleOpen = (val) => {
        console.log(val)
        console.log(val.rolesId)
        setUserId(val._id)
        if (val.rolesId !== null) {

            const arr = roleArray.map(item => {
                if (item.title === val.rolesId.title) {
                    item.check = true
                    return item
                }
                else {
                    return item
                }
            })
            setRoleArray(arr)
            setOpen(true);

        }
        else if (val.rolesId === null) {
            setOpen(true);

        }

    }


    const handleClose = () => {
        setOpen(false);
        setUserId('')
        setRoleId('')
    };

    const [role, setRole] = useState({
        roleName: ''
    });
    const [roleArray, setRoleArray] = useState([]);
    const onSaveChanges = () => {
        fetch(`${BaseUrl}5009/api/updateUserRole`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: userId,
                rolesId: roleId
            })
        }).then(res => res.json()).then((success) => {
            window.location.reload();

        }).catch(err => {
            console.log(err)
        })
    }

    const handleRoleChange = (v) => {
        setRoleId(v._id)
        const arry = roleArray.map(item => {

            item.check = false
            return item

        })
        setRoleArray(arry)
        const arr = roleArray.map(item => {
            if (item.title === v.title) {
                item.check = true
                return item
            }
            else {
                return item
            }
        })
        setRoleArray(arr)
    };
    const onSave = () => {

        fetch(`${BaseUrl}5009/api/setModuleWisePermission`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: userObj._id,
                moduleName: selectModule,
                data: modulePermission
            })
        }).then(res => res.json()).then((success) => {
            console.log(success)
            window.location.reload();

        }).catch(err => {
            console.log(err)
        })
    }
    const classes = useStyles(props);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const [selectModule, moduleSelection] = useState('');
    const [userObj, setUserObj] = useState({});

    const [moduleArray, setModuleArray] = useState([
        {
            moduleName: 'store',
        },
        {
            moduleName: 'product',
        },
        {
            moduleName: 'cms',
        },
        {
            moduleName: 'customDesign',
        },
        {
            moduleName: 'fundRaising',
        },
        {
            moduleName: 'order',
        },
        {
            moduleName: 'event',
        },
        {
            moduleName: 'paymentGateway',
        },
        {
            moduleName: 'newsLetter',
        },
        {
            moduleName: 'menu',
        },
        {
            moduleName: 'promotion',
        },
    ]);

    const [permissionArray, setPermissionArray] = useState([])
    const [userId, setUserId] = useState('')
    const [roleId, setRoleId] = useState('')
    const [usersArray, setUsersArray] = useState([])
    const [modulePermission, setModulePermission] = useState([]);

    React.useState(() => {
        fetch(`${BaseUrl}3000/api/getPermission`, {
            method: "GET"
        }).then(res => res.json()).then(doc => {
            setPermissionArray(doc.data[0].operations)
        }).catch(err => console.log(err))
        fetch(`${BaseUrl}3001/api/getAllRoles`, {
            method: "GET"
        }).then(res => res.json()).then(doc => {
            const arr = []
            doc.data.forEach(item => {
                item.check = false
                arr.push(item)
            })
            setRoleArray(arr)
        }).catch(err => console.log(err))
        fetch(`${BaseUrl}5009/api/users`, {
            method: "GET"
        }).then(res => res.json()).then(doc => {
            setUsersArray(doc.data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <ThemeProvider theme={mainTheme}>

                    {usersArray.map((v, i) => {
                        return (
                            <FuseAnimate animation="transition.slideLeftIn" delay={300} key={i}>
                                <div className={classes.acc}>
                                    <div className={classes.root}>
                                        <Accordion onClick={() => setUserObj(v)} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon onClick={() => setUserObj(v)} />}
                                                aria-controls="additional-actions2-content"
                                                id="additional-actions2-header"

                                            >
                                                <div className={classes.column}>
                                                    <Typography className={classes.heading}>{v.first_name}</Typography>
                                                </div>
                                                <div className={classes.column}>
                                                    <Typography className={classes.heading}>{v.email}</Typography>
                                                </div>
                                                <div className={classes.column}>
                                                    <Typography className={classes.heading}>{v.user_type}</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails className={classes.details}>
                                                <div className={classes.column}>
                                                    <div className={classes.secondTable}>
                                                        <Table size='medium' aria-label="customized table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCell align="center">Module</StyledTableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {moduleArray.map((v, i) => {
                                                                    if (selectModule === v.moduleName) {
                                                                        return (
                                                                            <div className={classes.selectModuleDiv} key={i} align="center" onClick={() => {
                                                                                console.log(userObj)
                                                                                moduleSelection(v.moduleName)
                                                                                setModulePermission(userObj.modulespermissions[v.moduleName])
                                                                            }}>{v.moduleName}</div>

                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <div className={classes.moduleDiv} key={i} align="center" onClick={() => {
                                                                                console.log(userObj)
                                                                                moduleSelection(v.moduleName)
                                                                                setModulePermission(userObj.modulespermissions[v.moduleName])

                                                                            }}>{v.moduleName}</div>

                                                                        )
                                                                    }
                                                                }

                                                                )}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>
                                                <div className={classes.column}>
                                                    <div className={classes.thirdTable}>
                                                        <Table size='medium' aria-label="customized table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCell align="center">Permissions</StyledTableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {(modulePermission.length > 0) ?
                                                                    permissionArray.map((v, i) => {
                                                                        var abc = modulePermission.map((val, ind) => {
                                                                            if (v === val) {
                                                                                return (
                                                                                    <div className={classes.permissionsDiv}>
                                                                                        <div style={{ paddingLeft: '10px' }}>{v}</div>
                                                                                        <div>
                                                                                            <Checkbox
                                                                                                checked={true}
                                                                                                color="primary"
                                                                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                                                onClick={() => unCheck(val)}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            else if (modulePermission.length - 1 === ind) {
                                                                                var bbc = modulePermission.includes(v)
                                                                                if (bbc === true) {
                                                                                    return null
                                                                                }
                                                                                else {
                                                                                    return (
                                                                                        <div className={classes.permissionsDiv}>
                                                                                            <div style={{ paddingLeft: '10px' }}>{v}</div>
                                                                                            <div>
                                                                                                <Checkbox
                                                                                                    checked={false}
                                                                                                    color="primary"
                                                                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                                                    onClick={() => Check(v)}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            }

                                                                        })
                                                                        return abc
                                                                    })
                                                                    :
                                                                    permissionArray.map((v, i) => (
                                                                        <div className={classes.permissionsDiv}>
                                                                            <div style={{ paddingLeft: '10px' }}>{v}</div>
                                                                            <div>
                                                                                <Checkbox
                                                                                    checked={false}
                                                                                    color="primary"
                                                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                                    onClick={() => (selectModule === "") ? alert("Select Any Module") : Check(v)}

                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>
                                                <div className={clsx(classes.column, classes.helper)}>
                                                    <Typography variant="caption">
                                                        <Button size="small" color="primary">Special Permission</Button>
                                                    </Typography>
                                                </div>
                                            </AccordionDetails>
                                            <Divider />
                                            <AccordionActions>
                                                <Button size="small" color="primary" onClick={() => onSave()}>Submit</Button>
                                            </AccordionActions>
                                        </Accordion>
                                    </div>
                                    <div className={classes.column}>
                                        {/* <FormControl variant="standard" className={classes.formControl}>
                                    <Select
                                        className={classes.select}
                                        native
                                        value={role.roleName}
                                        onChange={handleRoleChange}
                                        inputProps={{
                                            name: 'roleName',
                                            id: 'filled-age-native-simple',
                                        }}
                                    >
                                        <option value='None'>Select Role</option>
                                        {roleArray.map((v, i) => (
                                            <option value={i} key={i}>{v.role}</option>
                                        ))}
                                    </Select>
                                </FormControl> */}

                                        <div className={classes.rolesModal}>
                                            <button className={classes.rolesModalBtn} type="button" onClick={() => handleOpen(v)}>
                                                Select Role
                                        </button>
                                        </div>
                                    </div>

                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={open}>
                                            <div className={classes.paper}>
                                                <div >
                                                    <div className={classes.column}>
                                                        <div className={classes.secondTable}>
                                                            <Table size='medium' aria-label="customized table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <StyledTableCell align="center">Roles</StyledTableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {roleArray.map((v, i) => (
                                                                        <div className={classes.modalRole}>
                                                                            <div>
                                                                                <Checkbox
                                                                                    checked={v.check}
                                                                                    onClick={() => handleRoleChange(v, i)}
                                                                                    color="primary"
                                                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                                />
                                                                            </div>
                                                                            <div className={classes.roleModalDiv} key={i} align="left">{v.title}</div>
                                                                        </div>
                                                                    ))}
                                                                    <Button className={classes.modalBtn} variant="contained" color="primary" onClick={() => {
                                                                        onSaveChanges()
                                                                    }}>Save Changes</Button>
                                                                    <Button className={classes.modalBtn} variant="contained" color="primary"
                                                                        onClick={handleClose}
                                                                    >Cancel</Button>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                            </FuseAnimate>
                        )
                    })}


                </ThemeProvider>
            </Container>
        </div>
    )
}

export default UsersContent;