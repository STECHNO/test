import React, { useState, useEffect } from "react";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  makeStyles,
  MenuList,
  MenuItem,
  TablePagination,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Paper,
  TableSortLabel,
  Input,
  IconButton,
  TableHead,
  TableRow,
  Menu,
  Checkbox,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";
import { FusePageSimple, FuseAnimate, FuseScrollbars, FusePageCarded } from "@fuse";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { ToastContainer, toast } from "react-toastify";
import clsx from "clsx";
import swal from 'sweetalert';
import moment from "moment";
import _ from "@lodash";
import axios from "axios";
import { api } from "../../../../../utils/Constant";

import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import AccordionActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const rows = [
  {
    id: "logo",
    align: "left",
    disablePadding: false,
    label: "Logo",
    sort: false,
  },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "type",
    align: "left",
    disablePadding: false,
    label: "Type",
    sort: true,
  },
  {
    id: "sub_categories",
    align: "left",
    disablePadding: false,
    label: "Sub Categories",
    sort: true,
  },
  {
    id: "is_active",
    align: "left",
    disablePadding: false,
    label: "Status",
    sort: true,
  },
  {
    id: "updatedAt",
    align: "right",
    disablePadding: false,
    label: "Last Updated",
    sort: true,
  },
];

const useStyles = makeStyles((theme) => ({
  layoutHeader: {
    height: 200,
    minHeight: 200,
    [theme.breakpoints.down("md")]: {
      height: 200,
      minHeight: 200,
    },
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  header: {
    height: 600,
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    color: theme.palette.primary.contrastText,
  },
}));

function CategoriesPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  // const [sections, setSections] = useState(null);


  const [searchText, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);
  const [ascending, setAscending] = useState(false);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const [data, setData] = useState(categories);
  function handleChangePage(event, page) {
    setPage(page);
  }

  const handleChange = (panel, i) => (event, isExpanded) => {
    // console.log(panel)
    setExpanded(isExpanded ? panel : false);
  };

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  useEffect(() => {
    setData(
      searchText.length === 0
        ? categories
        : _.filter(categories, (item) => {
          return item.name?.toLowerCase().includes(searchText.toLowerCase());
        })
    );
  }, [categories, searchText]);

  useEffect(() => {
    fetch('http://localhost:5007/api/categories')
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (response) {
        // console.log(response)
        setCategories(response.data)
      }).catch(function (error) {
        console.log('Something went wrong.', error);
      });
  }, [])

  function handleCheck(eve, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  }
  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null);
  }
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(categories.map((n) => n._id));
      return;
    }
    setSelected([]);
  }

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget);
  }
  const deleteHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willdelete) => {
      if (willdelete) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        selected.forEach(i => {
          axios
            .post(api + `5001/api/sec_delete/${i}`, config)
            .then(({ data }) => {
              window.location.reload()
            })
            .catch((e) => {
              console.log(e);
            });
        })
      }
    });
  };
  const handleRequestSort = (property) => {
    const id = property;
    let direction = "desc";
    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }
    setOrder({
      direction,
      id,
    });
  };

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      innerScroll
      header={
        <ThemeProvider theme={mainTheme}>
          <ToastContainer
            style={{ zIndex: 1, marginRight: "5%" }}
            newestOnTop={true}
            autoClose={3000}
            position="bottom-right"
            type="success"
            pauseOnHover={true}
          />
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Avatar
                  className="w-96 h-96"
                  src="assets/images/download.jpg"
                />
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  Categories Test hogya
                </Typography>
              </FuseAnimate>
              <div className="flex flex-1 items-center justify-center pr-0 pl-12 sm:px-12">
                <FuseAnimate animation="transition.slideDownIn" delay={300}>
                  <Paper
                    className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
                    elevation={1}
                  >
                    <Icon className="mr-8" color="action">
                      search
                    </Icon>
                    <Input
                      placeholder="Search"
                      className="flex flex-1"
                      disableUnderline
                      fullWidth
                      inputProps={{
                        "aria-label": "Search",
                      }}
                      value={searchText}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                    />
                  </Paper>
                </FuseAnimate>
              </div>
              <div className="flex items-center justify-end">
                {" "}
                <Button
                  className="mr-8 normal-case"
                  variant="contained"
                  onClick={() => {
                    props.history.push("/categories/add_category");
                    console.log('edit')
                  }}
                  aria-label="Follow"
                >
                  Create new category
                </Button>
              </div>
            </div>
          </div>
        </ThemeProvider>
      }
      content={
        <div className="w-full flex flex-col">
          <FuseScrollbars className="flex-grow overflow-x-auto">
            <Table className="min-w-xl" aria-labelledby="tableTitle">
              <TableHead>
                <TableRow className="h-64">
                  <TableCell
                    padding="checkbox"
                    className="relative pl-4 sm:pl-12"
                  >
                    <Checkbox
                      indeterminate={
                        selected?.length > 0 &&
                        selected?.length < categories.length
                      }
                      checked={selected?.length === categories?.length}
                      onChange={handleSelectAllClick}
                    />
                    {selected.length > 0 && (
                      <div
                        className={clsx(
                          "flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10",
                          classes.actionsButtonWrapper
                        )}
                      >
                        <IconButton
                          aria-owns={
                            selectedProductsMenu ? "selectedProductsMenu" : null
                          }
                          aria-haspopup="true"
                          onClick={openSelectedProductsMenu}
                        >
                          <Icon>more_horiz</Icon>
                        </IconButton>
                        <Menu
                          id="selectedProductsMenu"
                          anchorEl={selectedProductsMenu}
                          open={Boolean(selectedProductsMenu)}
                          onClose={closeSelectedProductsMenu}
                        >
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                deleteHandler();
                                closeSelectedProductsMenu();
                              }}
                            >
                              <ListItemIcon className="min-w-40">
                                <Icon>delete</Icon>
                              </ListItemIcon>
                              <ListItemText primary="Remove" />
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    )}
                  </TableCell>

                  {rows.map((row) => {
                    return (
                      <TableCell
                        key={row.id}
                        align={row.align}
                        padding={row.disablePadding ? "none" : "default"}
                        sortDirection={
                          order.id === row.id ? order.direction : false
                        }
                      >
                        {row.sort && (
                          <Tooltip
                            title="Sort"
                            placement={
                              row.align === "right"
                                ? "bottom-end"
                                : "bottom-start"
                            }
                            enterDelay={300}
                          >
                            <TableSortLabel
                              active={order.id === row.id}
                              direction={order.direction}
                              onClick={() => {
                                setAscending(!ascending);
                                handleRequestSort(row.id);
                              }}
                            >
                              {row.label}
                            </TableSortLabel>
                          </Tooltip>
                        )}
                      </TableCell>
                    );
                  }, this)}
                </TableRow>
              </TableHead>
              <TableBody>
                {_.orderBy(
                  data,
                  [
                    (o) => {
                      switch (order.id) {
                        default: {
                          return o[order.id];
                        }
                      }
                    },
                  ],
                  [order.direction]
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n, i) => {
                    const isSelected = selected.indexOf(n._id) !== -1;
                    return (
                      <TableRow
                        className="h-64 cursor-pointer"
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={i}
                        selected={isSelected}
                        onClick={() =>
                          history.push('/categories/edit_category/' + n._id)
                        }
                      >
                        <TableCell
                          className="w-48 px-4 sm:px-12"
                          padding="checkbox"
                        >
                          <Checkbox
                            checked={isSelected}
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => {
                              handleCheck(event, n._id);
                            }}
                          />
                        </TableCell>

                        <TableCell
                          className="w-52"
                          padding="none"
                          component="th"
                          scope="row"
                        >
                          {/* <Avatar src={n.logo} alt="logo" /> */}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {n.category_name}
                        </TableCell>

                        <TableCell
                          className="truncate"
                          component="th"
                          scope="row"
                        >
                          {n.categoryType}
                        </TableCell>

                        <TableCell
                          className="truncate"
                          component="th"
                          scope="row"
                        >
                          {n.sub_categories.length === 0 ? 'None' :
                            n.sub_categories.map((v, i) => {
                              return (
                                <span key={i}>
                                  <span>{i+1}. {v}</span>
                                  <br />
                                </span>
                              )
                            })}
                        </TableCell>

                        <TableCell
                          className="truncate"
                          component="th"
                          scope="row"
                        >
                          {n.is_active === 'inActive' ? "In Active" : " Active"}
                          {/* {n.is_active} */}
                        </TableCell>

                        <TableCell component="th" scope="row" align="right">
                          {moment(n.modified_on).format("DD-MM-YYYY")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </FuseScrollbars>
          <TablePagination
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            count={data?.length}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}

            onChangePage={handleChangePage}
            onChangeRowsPerPage={(e) => setRowsPerPage(e.target.value)}
          />
        </div>
      }


    />
  );
}

export default CategoriesPage;