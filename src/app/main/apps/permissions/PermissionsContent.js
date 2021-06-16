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
    actionInput: {
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
        width: '40%',
    },
    dltBtn: {
        '&:hover': {
            cursor: 'pointer',
        }
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

function PermissionsContent(props) {

    const [action, setAction] = useState('');
    const [actionArray, setActionArray] = useState([]);

    const classes = useStyles(props);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    const handelActionArray = () => {
        action === '' ? alert('Enter any action') : fetch(`${BaseUrl}3000/api/addPermission`,{
            method:"POST",
            headers: {
               'Content-Type': 'application/json;charset=UTF-8',
               "Access-Control-Allow-Origin": "*",
           },
            body:JSON.stringify({
                text:action
            })
        }).then(res=>res.json()).then((success)=>{
            setAction('');
            setActionArray(success.data.operations)
          console.log(success.data.operations)
        }).catch(err=>{
           console.log(err)
        })
      
    }
   React.useState(()=>{
     fetch(`${BaseUrl}3000/api/getPermission`,{
         method:"GET"
     }).then(res=>res.json()).then(doc=>{
         setActionArray(doc.data[0].operations)
     })
   },[])
    const handleDeleteItem = (i,value) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willdelete) => {
              if(willdelete){
                fetch(`${BaseUrl}3000/api/deletePermission`,{
                    method:"POST",
                    headers: {
                       'Content-Type': 'application/json;charset=UTF-8',
                       "Access-Control-Allow-Origin": "*",
                   },
                    body:JSON.stringify({
                        text:value
                    })
                }).then(res=>res.json()).then((success)=>{
                    setAction('');
                    const array = [...actionArray];
                    array.splice(i, 1);
                    setActionArray(array);
                    console.log(i, array)
                  console.log(success.data.operations)
                  swal("Poof! Your record has been deleted!", {
                    icon: "success",
                  });
                }).catch(err=>{
                   console.log(err)
                })  
              }
              else{
                  
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
                                placeholder="Enter your action"
                                className={classes.actionInput}
                                disableUnderline={true}
                                value={action}
                                onChange={(e) => setAction(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={handelActionArray}>
                                Add Action
                            </Button>
                        </div>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Table size='medium' className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Serial No.</StyledTableCell>
                                    <StyledTableCell align="left">Permissions</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {actionArray.map((v, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell align="left">{i + 1}</StyledTableCell>
                                        <StyledTableCell align="left">{v}</StyledTableCell>
                                        <StyledTableCell align="right"><Icon className={classes.dltBtn} onClick={(I) => handleDeleteItem(i,v)}>delete</Icon></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </FuseAnimate>
                </ThemeProvider>
            </Container>
        </div>
    )
}

export default PermissionsContent