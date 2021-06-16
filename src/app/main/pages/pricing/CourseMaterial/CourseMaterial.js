import React, { useState, useEffect, useCallback } from "react";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  makeStyles,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TablePagination,
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
import { useSelector, useDispatch } from "react-redux";
import { FusePageCarded, FuseAnimate, FuseScrollbars } from "@fuse";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { api } from "../../../../../utils/Constant";

import clsx from "clsx";
import moment from "moment";
import _ from "@lodash";
import { ThemeProvider } from "@material-ui/styles";
import { ToastContainer, toast } from "react-toastify";
import { loadCourses } from "app/store/actions";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
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
  badge: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
  price: {
    backgroundColor: theme.palette.primary[600],
    color: theme.palette.getContrastText(theme.palette.primary[600]),
  },
}));

const rows = [
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
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
function CourseMaterial() {
  const [CourseMaterial, setcourseMaterial] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  const [searchText, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const [data, setData] = useState(CourseMaterial);

  useEffect(() => {
    axios
      .get(api + `5001/api/crs_mat?page=1&limit=${rowsPerPage}`)
      .then(({ data }) => {
        setTimeout(() => {
          history.location.state?.data &&
            toast.dark(history.location.state?.data);
        }, [500]);

        setcourseMaterial(data.data || data.result?.results);
      })
      .catch((err) => {});
  }, [rowsPerPage]);

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget);
  }
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

  useEffect(() => {
    setData(
      searchText.length === 0
        ? CourseMaterial
        : _.filter(CourseMaterial, (item) => {
            return item.name?.toLowerCase().includes(searchText.toLowerCase());
          })
    );
  }, [CourseMaterial, searchText]);

  function handleChangePage(event, page) {
    setPage(page);
  }
  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null);
  }
  const deleteHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
      .then((willdelete) => {
          if (willdelete) {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
              selected.forEach(i=>{
              axios
              .post(api + `5001/api/crs_mat_delete/${i}`, config)
              .then(({ data }) => {
               window.location.reload()
              })
              .catch((e) => {
                console.log(e);
              });
              })
          
          }
          else {

          }

      });

  
  };
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(CourseMaterial.map((n) => n._id));
      return;
    }
    setSelected([]);
  }

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
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      innerScroll
      header={
        <ThemeProvider theme={mainTheme}>
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <ToastContainer
                style={{ zIndex: 1, marginRight: "5%" }}
                newestOnTop={true}
                autoClose={3000}
                position="bottom-right"
                type="success"
                pauseOnHover={true}
              />
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  Course Materials
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
                      onChange={(e) => setSearch(e.target.value)}
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
                    history.push("/academics/courses_material_create");
                  }}
                  aria-label="Follow"
                >
                  Create new Material
                </Button>
              </div>
            </div>
          </div>
        </ThemeProvider>
      }
      content={
        <div className="w-full flex flex-col">
          <FuseScrollbars className="flex-grow overflow-x-auto">
            <Table
              className="min-w-xl"
              style={{ width: "80%" }}
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow className="h-64">
                  <TableCell
                    padding="checkbox"
                    className="relative pl-4 sm:pl-12"
                  >
                    <Checkbox
                      indeterminate={
                        selected?.length > 0 &&
                        selected?.length < CourseMaterial.length
                      }
                      checked={selected?.length === CourseMaterial?.length}
                      onChange={handleSelectAllClick}
                    />
                    {selected.length > 0 && (
                      <div
                      style={{left: '30px'}}
                        className={clsx(
                          "flex items-center justify-center absolute w-64 top-0 left-0 ml-88 h-64 z-10",
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
                          history.push(
                            "/academics/course_material_edit/" + n._id
                          )
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

                        <TableCell component="th" scope="row">
                          {n.name}
                        </TableCell>

                        <TableCell
                          className="truncate"
                          component="th"
                          scope="row"
                        >
                          {n.is_active === 0 ? "active" : "In active"}
                        </TableCell>
                        <TableCell component="th" scope="row" align="right">
                          {moment(n.updatedAt).format("DD-MM-YYYY")}
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
export default CourseMaterial;
