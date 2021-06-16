import React, { useState, useEffect } from "react";
import {
  makeStyles,
  MenuList,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Select,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { api } from "../../../../../../utils/Constant";

import { ThemeProvider } from "@material-ui/styles";
import { useSelector, } from "react-redux";

import { FusePageSimple, FuseAnimate, FusePageCarded } from "@fuse";
import { useParams, useHistory } from "react-router-dom";
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css';

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
  cardHeader: {
    backgroundColor: theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[800]),
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15px',
    width: '100%'
  },
}));

function EditCategory(props) {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [err, setErr] = useState("");
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categoryStatus, setCategoryStatus] = useState('');
  const [categoryStatusArray, setCategoryStatusArray] = useState(['inActive', 'active']);

  const [subCategories, setSubCategories] = useState([]);
  const [tags, setTags] = useState([]);









  const submit = (e) => {
    // e.preventDefault();
    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //     "x-auth-token": localStorage.getItem("token"),
    //   },
    // };
    // if (!inputValues.depart_id) {
    //   return setErr("all fields are required");
    // }
    // const updatedData = JSON.stringify({
    //   course_name: inputValues.name,
    //   course_no: inputValues.course_no,
    //   depart_id: inputValues.depart_id,
    // });
    // axios
    //   .post(api + "5001/api/crs", updatedData, config)
    //   .then(({ data }) => {
    //     console.log("add course----", data);
    //     data && history.push(`/academics/courses`, { data: data.message });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    console.log(props, id);

    axios
      .get(api + "5007/api//categories/" + id)
      .then(({ data }) => {
        console.log("data.data", data.cat);
        setCategoryName(data.cat.category_name);
        setCategoryType(data.cat.categoryType);
        // setCategoryStatusArray(data.cat.is_active);
        setTags(data.cat.sub_categories);
      })
      .catch((err) => {
        console.log("error to get data", err);
      });
  }, [])

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <ThemeProvider theme={mainTheme}>
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  Edit Category
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        </ThemeProvider>
      }
      content={
        <ThemeProvider theme={mainTheme}>
          <div className="p-8 sm:p-24 max-w-2xl">
            <TextField
              className="mt-8 mb-16"
              required
              label="Category Name"
              id="name"
              style={{ marginLeft: "5px" }}
              name="name"
              type="text"
              variant="outlined"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <TextField
              className="mt-8 mb-16"
              required
              label="Category Type"
              id="type"
              style={{ marginLeft: "5px" }}
              name="type"
              type="text"
              variant="outlined"
              fullWidth
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
            />


            <div className={classes.contentHeader}>
              <div>
                <div style={{ width: '30vw', height: '50px', marginLeft: '7px' }} className='input-group'>
                  <InputTags values={tags} onTags={(value) => setTags(value.values)} placeholder='Enter Sub Categories' />
                  <button
                    className='btn btn-outline-secondary'
                    type='button'
                    data-testid='button-clearAll'
                    onClick={() => {
                      setTags([])
                    }}
                  >
                    Delete all
                  </button>
                </div>
                <hr />
                <ol>
                  {tags.map((item, index) => (
                    <li key={item + index}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>

            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
              style={{ marginTop: '8px' }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Select Status
              </InputLabel>
              <Select
                id="categoryStatus"
                variant="outlined"
                required
                type="text"
                value={categoryStatus}
                defaultValue={'asdasd'}
                onChange={(e) => setCategoryStatus(e.target.value)}
                name="categoryStatus"
                className="mt-15 mb-16"
                style={{ marginLeft: "7px" }}
                label="Age"
              >
                {categoryStatusArray.map((v, i) => {
                  console.log('vvvvvvvv', v)
                  return (
                    <MenuItem key={i} value={v}>
                      {v === 'inActive' ? "In Active" : " Active"}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* {err && <p style={{ color: "red" }}>{err}</p>} */}

            <Button
              color="primary"
              style={{ margin: "10px" }}
              variant="contained"
              aria-label="Follow"
              type="submit"
              className="mr-8 normal-case"
            >
              Submit
            </Button>

          </div>
        </ThemeProvider>
      }
    />
  );
}

export default EditCategory;