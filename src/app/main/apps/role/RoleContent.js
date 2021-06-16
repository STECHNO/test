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
import BaseUrl from './../../../../utils/baseUrl'
import swal from 'sweetalert';

const useStyles = makeStyles({
    contentHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '15px',
    },
    roleInput: {
        marginRight: '30px',
        width: '400px',
        borderWidth: '1px',
        borderColor: 'gray',
        paddingLeft: '10px'
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
    table: {
        marginTop: '15px',
        width: '100%',
    },
    dltBtn: {
        marginRight: '10px',
        '&:hover': {
            cursor: 'pointer',
            color: 'black'
        }
    },
    threeTable: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '15px',
        borderBottomWidth: '2px',
        borderColor: 'gray',
        // overflowX: 'auto',
        // whiteSpace: 'nowrap',
        paddingBottom: '15px',
    },
    firstTable: {
        width: '30%'
    },
    roleDiv: {
        marginLeft: '10px',
        marginRight: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10px',
        paddingBottom: '10px',
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
    selectRoleDiv: {
        marginLeft: '10px',
        marginRight: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderWidth: '1px',
        borderColor: 'gray',
        marginTop: '10px',
        cursor: 'pointer',
        opacity: '0.8',
        backgroundColor: '#4295E3',
        color: '#ffffff',
        borderWidth: '1px',
        borderColor: '#4295E3',


    },
    secondTable: {
        width: '30%'
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
    thirdTable: {
        width: '40%'
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
    }

});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            width: '300px',
        },
    },
}))(TableRow);

function RoleContent(props) {
    const [selectRole, roleSelection] = useState('');
    const [selectModule, moduleSelection] = useState('');
    const [role, setRole] = useState('');
    const [roleArray, setRoleArray] = useState([]);
    const [roleObj, setRoleObj] = useState({});
    const [modulePermission, setModulePermission] = useState([]);
    const [permissionArray, setPermissionArray] = useState([]);
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

    const classes = useStyles(props);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const unCheck = (v) => {
        const arr = modulePermission.filter((item) => {
            return item !== v
        })
        setModulePermission(arr)
    }
    const Check = (v) => {
        setModulePermission([...modulePermission, v])
    }
    const handelActionArray = () => {
        role === '' ? alert('Enter any action') : fetch(`${BaseUrl}3001/api/createRole`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                title: role
            })
        }).then(res => res.json()).then((success) => {
            setRole('');
            setRoleArray([...roleArray, success.data])

        }).catch(err => {
            console.log(err)
        })


    }
    const onSave = () => {
        fetch(`${BaseUrl}3001/api/setModuleWisePermission`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: roleObj._id,
                moduleName: selectModule,
                data: modulePermission
            })
        }).then(res => res.json()).then((success) => {
            console.log(success)

        }).catch(err => {
            console.log(err)
        })
    }
    React.useState(() => {
        fetch(`${BaseUrl}3000/api/getPermission`, {
            method: "GET"
        }).then(res => res.json()).then(doc => {
            setPermissionArray(doc.data[0].operations)
        }).catch(err => console.log(err))
        fetch(`${BaseUrl}3001/api/getAllRoles`, {
            method: "GET"
        }).then(res => res.json()).then(doc => {
            setRoleArray(doc.data)
        }).catch(err => console.log(err))
    }, [])
    const handleDeleteItem = (value, i) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willdelete) => {
                if (willdelete) {
                    fetch(`${BaseUrl}3001/api/deleteRole`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                            id: value._id
                        })
                    }).then(res => res.json()).then((success) => {
                        setRole('');
                        const array = [...roleArray];
                        array.splice(i, 1);
                        setRoleArray(array);
                        console.log(i, array)
                        console.log(success.data.operations)
                        swal("Poof! Your record has been deleted!", {
                            icon: "success",
                        });
                    }).catch(err => {
                        console.log(err)
                    })
                }
                else {

                }

            });



    };
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <div className={classes.contentHeader}>
                            <Input
                                placeholder="Enter any role"
                                className={classes.roleInput}
                                disableUnderline={true}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={handelActionArray}>
                                Add Role
                            </Button>
                        </div>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <div className={classes.threeTable} >
                            <div className={classes.firstTable}>
                                <Table size='medium' aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Role</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {roleArray.map((v, i) => {
                                            if (v.title === selectRole) {
                                                return (

                                                    <div className={classes.selectRoleDiv} key={i} onClick={() => {
                                                        roleSelection(v.title)
                                                        setRoleObj(v)
                                                    }}>
                                                        <div style={{ paddingLeft: '10px' }} >{v.title}</div>
                                                        <Icon className={classes.dltBtn} onClick={() => handleDeleteItem(v, i)}>delete</Icon>
                                                    </div>

                                                )
                                            }
                                            else {
                                                return (

                                                    <div className={classes.roleDiv} key={i} onClick={() => {
                                                        roleSelection(v.title)
                                                        setRoleObj(v)

                                                    }}>
                                                        <div style={{ paddingLeft: '10px' }} >{v.title}</div>
                                                        <Icon className={classes.dltBtn} onClick={() => handleDeleteItem(v, i)}>delete</Icon>
                                                    </div>

                                                )
                                            }
                                        }


                                        )}
                                    </TableBody>
                                </Table>
                            </div>

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
                                                        moduleSelection(v.moduleName)
                                                        setModulePermission(roleObj.modulesFeatureAccess[v.moduleName])
                                                    }}>{v.moduleName}</div>

                                                )
                                            }
                                            else {
                                                return (
                                                    <div className={classes.moduleDiv} key={i} align="center" onClick={() => {
                                                        moduleSelection(v.moduleName)
                                                        setModulePermission(roleObj.modulesFeatureAccess[v.moduleName])

                                                    }}>{v.moduleName}</div>

                                                )
                                            }
                                        }

                                        )}
                                    </TableBody>
                                </Table>
                            </div>
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
                                                            onClick={() => unCheck(v)}

                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </FuseAnimate>
                    <div style={{ float: 'right', marginTop: '15px' }}>
                        <Button variant="contained" color="primary" onClick={() => onSave()}>Apply changes</Button>
                    </div>
                </ThemeProvider>

            </Container>
        </div>
    )
}

export default RoleContent;