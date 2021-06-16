import React, { useState, memo, useEffect } from "react";
import {
  makeStyles,
  Tab,
  Tabs,
  TextField,
  Avatar,
  Input,
  Select,
  FormControl,
  FormLabel,
  InputLabel,
  Button,
  InputAdornment,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { FusePageCarded, FuseAnimate } from "@fuse";
import { SwatchesPicker } from "react-color";

import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { api } from "../../../../../../utils/Constant";

import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import clsx from "clsx";
import _ from "@lodash";
import S3 from "aws-s3";
import { config } from "../../../S3Configuration/s3";
import { loadmeta_categories, load_meta_products } from "app/store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#dc3546",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 30,
    padding: "0 20px",
  },
  layoutHeader: {
    height: 320,
    minHeight: 320,
    border: "10px",
    [theme.breakpoints.down("md")]: {
      height: 240,
      minHeight: 240,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateCampus = (props) => {
  const classes = useStyles();
  const ReactS3Client = new S3(config);
  const dispatch = useDispatch();

  const [pricePercent, setpricePerent] = useState("");
  const [selectedcategories, setSelectedcategories] = useState([]);
  const history = useHistory();
  const [percenterror, setPercenterror] = useState(false);
  const [pageLeave, SetPageLeave] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setloading] = useState(false);
  const [favIconUrl, setFavIconUrl] = useState(null);
  const [TopSectionImgUrl, setTopSectionImgUrl] = useState(null);
  const [emptyStoreInput, setEmptyStoreInput] = useState(false);
  const [emptyWinterInput, setEmptyWinterInput] = useState(false);
  const [storehourError, setStoreHourError] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const days = ["select days", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const StartHours = [
    "select start time",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12am",
  ];
  const CloseHours = [
    "select Close time",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
    "12pm",
  ];
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [editStoreHours, setEditStoreHours] = useState(true);
  const [editWinterSale, seteditWinterSale] = useState(true);
  const [currencyArray, setCurrencyArray] = useState([])
  const [showfooter_color, setshowfooter_color] = useState(false);
  const [
    showheader_font_primary_color,
    setshowheader_font_primary_color,
  ] = useState(false);
  const [
    showheader_font_secondary_color,
    setshowheader_font_secondary_color,
  ] = useState(false);
  const [showheader_primary_color, setshowheader_primary_color] = useState(
    false
  );
  const [showheader_secondary_color, setshowheader_secondary_color] = useState(
    false
  );
  const [
    showfooter_font_primary_color,
    setshowfooter_font_primary_color,
  ] = useState(false);
  const [
    showfooter_font_secondary_color,
    setshowfooter_font_secondary_color,
  ] = useState(false);

  const [uploadError, setuploadError] = useState("");
  const [addEnabled, setAddEnabled] = useState(false);
  const [WinterSaleError, setWinterSaleError] = useState("");
  const [currencyVal, setCurrencyVal] = useState("Select Currency");
  const [updateStoreHoursItem, setUpdateStoreHoursItem] = useState({
    day: "",
    startTime: "",
    closeTime: "",
  });

  const [updateWinterSaleItem, setUpdateWinterSaleItem] = useState({
    image: "",
    title: "",
    link: "",
  });
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    site_title: "",
    topsectionTitle: "",
    promo_section: {
      image: "",
      title: "",
      link: "",
      promo_text: "",
    },
    winter_sale: [],

    store_hours_timings: {
      day: days[0],
      startTime: StartHours[0],
      closeTime: CloseHours[0],
    },
    store_hours: [],
    meta_description: "",
    terms_of_use: "",
    url: "",
    urls: [],
    footer_color: "",
    header_font_primary_color: "",
    header_font_secondary_color: "",
    header_primary_color: "",
    header_secondary_color: "",
    footer_font_primary_color: "",
    footer_font_secondary_color: "",

  });

  useEffect(() => {
    dispatch(loadmeta_categories());
    dispatch(load_meta_products());
    fetchCurrencies();
  }, []);

  const { meta_categories } = useSelector(({ fuse }) => fuse.cat_pro);
  // console.log(meta_categories)

  const handlePricePercent = (e) => {
    let isvalid = false;
    if (e.target.value > 100) {
      isvalid = true;
    }
    setPercenterror(isvalid);
    setpricePerent(e.target.value);
  };
  const fetchCurrencies = async () => {
    fetch(`${api}5008/api/getCurrencies`, {
      method: "GET"
    }).then(res => res.json()).then(response => {
      console.log(response)
      setCurrencyArray(response.data)
    }).catch(err => console.log(err))

  }
  const handleChange = ({ target: { name, value } }, type) => {
    SetPageLeave(true);
    if (name === "day" || name === "startTime" || name === "closeTime") {
      setInputValues((prevState) => {
        return {
          ...prevState,
          store_hours_timings: {
            ...prevState.store_hours_timings,
            [name]: value,
          },
        };
      });
      !editStoreHours &&
        setUpdateStoreHoursItem({
          ...updateStoreHoursItem,
          [name]: value,
        });
      setStoreHourError(null);
    } else if (
      !editWinterSale &&
      (name === "title" || name === "link" || name === "promo_text")
    ) {
      setUpdateWinterSaleItem({
        ...updateWinterSaleItem,
        [name]: value,
      });
      setWinterSaleError(null);
    } else if (name === "title" || name === "link" || name === "promo_text") {
      setInputValues((prevState) => {
        return {
          ...prevState,
          promo_section: {
            ...prevState.promo_section,
            [name]: value,
          },
        };
      });
      setAddEnabled(false);
      setWinterSaleError(null);
    } else {
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const updatedData = {
      logo: logoUrl,
      favicon: favIconUrl,
      name: inputValues.name,
      address: inputValues.address,
      site_title: inputValues.site_title,
      meta_description: inputValues.meta_description,
      terms_of_use: inputValues.terms_of_use,
      urls: inputValues.urls,
      winter_sell: inputValues.winter_sale,
      store_hours: inputValues.store_hours,
      top_section: [TopSectionImgUrl, inputValues.topsectionTitle],
      footer_color: inputValues.footer_color,
      header_primary_color: inputValues.header_primary_color,
      header_secondary_color: inputValues.header_secondary_color,
      header_font_primary_color: inputValues.header_font_primary_color,
      header_font_secondary_color: inputValues.header_font_secondary_color,
      footer_font_primary_color: inputValues.footer_font_primary_color,
      footer_font_secondary_color: inputValues.footer_font_secondary_color,
      currency: (currencyVal === "") ? currencyArray[0]._id : currencyVal
    };
    console.log("yegya->", updatedData);
    // 8
    axios
      .post(api + "5008/api/campus_stores", updatedData, config)
      .then(({ data }) => {
        data && history.push(`/campus_stores/all`, { data: data.message });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChangeTab(e, tabValue) {
    setTabValue(tabValue);
  }
  const handleCurrencyChange = (v) => {
    setCurrencyVal(v._id)
  }
  const imageHandler = (e) => {
    e.persist();
    ReactS3Client.uploadFile(e.target.files[0], e.target.files[0]?.name)
      .then(({ location }) => {
        if (e.target.name === "logo") {
          setLogoUrl(location);
        } else if (e.target.name === "favIcon") {
          setFavIconUrl(location);
        } else if (e.target.name === "image") {
          if (!editWinterSale) {
            setUpdateWinterSaleItem({
              ...updateWinterSaleItem,
              image: location,
            });
          } else {
            setInputValues((prevState) => {
              return {
                ...prevState,
                promo_section: {
                  ...prevState.promo_section,
                  image: location,
                },
              };
            });
            setAddEnabled(true);
          }
        } else if (e.target.name === "TopSectionImgUrl") {
          setTopSectionImgUrl(location);
        }
      })
      .catch((err) => {
        setloading(false);
        setuploadError("network error");
      });
  };

  const handleCheck = (e, id, type, subname) => {
    const selsubname = [];
    const filt = selectedcategories.filter((v, i) => v.id === id);
    const remaining = selectedcategories.filter((v, i) => v.id !== id);

    if (filt.length === 0 && type === "categories") {
      subname.forEach((e) => {
        selsubname.push(e.subname);
      });
      const obj = { id, subname: selsubname };
      setSelectedcategories([...selectedcategories, obj]);
    } else if (filt[0]?.id && type === "categories") {
      setSelectedcategories(remaining);
    } else if (!filt[0]?.id && type === "subcategories") {
      const obj = { id, subname: selsubname.concat(subname) };
      setSelectedcategories([...selectedcategories, obj]);
    } else if (
      filt[0]?.id &&
      type === "subcategories" &&
      !filt[0]?.subname.includes(subname)
    ) {
      try {
        return filt[0]?.subname.push(subname);
      } finally {
        const newarr = remaining.concat(filt);
        setSelectedcategories(newarr);
      }
    } else if (filt[0]?.id && !filt[0]?.subname.includes(subname)) {
      const index = filt[0]?.subname.indexOf(subname);
      if (index === -1) {
        try {
          return filt[0]?.subname.push(subname);
        } finally {
          const newarr = remaining.concat(filt);
          setSelectedcategories(newarr);
        }
      }
    } else if (type === "subcategories" && filt[0]?.subname.includes(subname)) {
      const index = filt[0]?.subname.indexOf(subname);
      if (index > -1) {
        try {
          return filt[0]?.subname.splice(index, 1);
        } finally {
          const newarr = remaining.concat(filt);
          setSelectedcategories(newarr);
        }
      }
    }
    // else if (filt[0]?.id && filt[0]?.subname.length === 1) {
    //   console.log('elseif2')
    //   setSelectedcategories(remaining);
    // }
  };

  const addOrUpdateStoreHours = (e) => {
    e.preventDefault();
    if (
      (!inputValues.store_hours_timings?.day ||
        !inputValues.store_hours_timings?.startTime ||
        !inputValues.store_hours_timings?.closeTime) &&
      editStoreHours
    ) {
      setStoreHourError("all hour fields are required");
      return;
    }
    if (!editStoreHours) {
      setInputValues({
        ...inputValues,
        store_hours: inputValues.store_hours.concat(updateStoreHoursItem),
      });
      setEditStoreHours(!editStoreHours);
    } else {
      editStoreHours &&
        setInputValues({
          ...inputValues,
          store_hours: inputValues.store_hours.concat(
            inputValues.store_hours_timings
          ),
        });
    }
    setEmptyStoreInput(!emptyStoreInput);
  };

  const editStoreClick = (val, index) => {
    const filtAll = inputValues.store_hours.filter(
      (value, idx) => idx !== index
    );
    const filtSingle = inputValues.store_hours.filter(
      (value, idx) => idx === index
    );
    setUpdateStoreHoursItem({
      ...updateStoreHoursItem,
      day: filtSingle[0].day,
      startTime: filtSingle[0].startTime,
      closeTime: filtSingle[0].closeTime,
    });
    setInputValues({ ...inputValues, store_hours: filtAll });
  };

  const addOrUpdateWinterSale = (e) => {
    e.preventDefault();
    if (
      (!inputValues.promo_section?.link ||
        !inputValues.promo_section?.promo_text ||
        !inputValues.promo_section?.title) &&
      editWinterSale
    ) {
      setWinterSaleError("all fields are required");
    } else if (!editWinterSale) {
      if (!updateWinterSaleItem.title || !updateWinterSaleItem.link) {
        setWinterSaleError("all fields are required");
        // return;
      } else {
        setInputValues({
          ...inputValues,
          winter_sale: inputValues.winter_sale.concat(updateWinterSaleItem),
        });
        seteditWinterSale(!editWinterSale);
      }
    }
    inputValues.promo_section.title &&
      inputValues.promo_section.link &&
      inputValues.promo_section.promo_text &&
      editWinterSale &&
      setInputValues({
        ...inputValues,
        winter_sale: inputValues.winter_sale.concat(inputValues.promo_section),
      });
    setAddEnabled(false);
    setEmptyWinterInput(!emptyWinterInput);
  };
  const editWinterClick = (val, index) => {
    const filt = inputValues.winter_sale.filter((value, idx) => idx !== index);
    const filtSingle = inputValues.winter_sale.filter(
      (value, idx) => idx === index
    );
    setUpdateWinterSaleItem({
      ...updateWinterSaleItem,
      title: filtSingle[0].title,
      link: filtSingle[0].link,
    });
    setInputValues({ ...inputValues, winter_sale: filt });
    setAddEnabled(!addEnabled);
  };

  useEffect(() => {
    setInputValues({
      ...inputValues,
      store_hours_timings: {
        ...inputValues.store_hours_timings,
        day: "",
        startTime: "",
        closeTime: "",
      },
    });
  }, [emptyStoreInput]);

  useEffect(() => {
    setInputValues({
      ...inputValues,
      promo_section: {
        ...inputValues.promo_section,
        image: "",
        title: "",
        link: "",
        promo_text: "",
      },
    });
  }, [emptyWinterInput]);

  console.log(`inputValues.promo_section`, inputValues.promo_section);

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
                  New Campus
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        </ThemeProvider>
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64" }}
        >
          <Tab className="h-64 normal-case" label="General Info" />
          <Tab className="h-64 normal-case" label="Category import " />
          <Tab className="h-64 normal-case" label="Product import" />
          <Tab className="h-64 normal-case" label="CMS settings" />
          <Tab className="h-64 normal-case" label="Report Configuration" />
        </Tabs>
      }
      //body
      content={
        <div className="p-16 sm:p-24 max-w-2xl">
          <div>
            {tabValue === 0 && (
              <>
                <div>
                  {logoUrl ? (
                    <div style={{ display: "flex", marginLeft: "5px" }}>
                      <div className="flex justify-center sm:justify-start flex-wrap">
                        <Avatar
                          src={logoUrl}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <Icon fontSize="small" onClick={() => setLogoUrl(null)}>
                          clear
                        </Icon>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <input
                        className="hidden"
                        id="logo"
                        name="logo"
                        type="file"
                        required
                        onChange={imageHandler}
                      />
                      <div className="flex justify-center sm:justify-start flex-wrap">
                        <label
                          htmlFor="logo"
                          className={clsx(
                            classes.productImageUpload,
                            "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                          )}
                        >
                          Upload logo
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <br />

                <div>
                  {favIconUrl ? (
                    <>
                      <div className="flex justify-center sm:justify-start flex-wrap">
                        <Avatar
                          src={favIconUrl}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <Icon
                          fontSize="small"
                          onClick={() => setFavIconUrl(null)}
                        >
                          clear
                        </Icon>
                      </div>
                    </>
                  ) : (
                    <div>
                      <input
                        className="hidden"
                        name="favIcon"
                        type="file"
                        required
                        id="favIcon"
                        onChange={imageHandler}
                      />
                      <div className="flex justify-center sm:justify-start flex-wrap">
                        <label
                          htmlFor="favIcon"
                          className={clsx(
                            classes.productImageUpload,
                            "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                          )}
                        >
                          Upload favicon
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <br />

                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Name"
                  id="name"
                  name="name"
                  value={inputValues.name}
                  onChange={(e) => handleChange(e, "name")}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16"
                  id="address"
                  name="address"
                  onChange={handleChange}
                  label="Address"
                  type="text"
                  required
                  value={inputValues.address}
                  rows={5}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16"
                  id="site_title"
                  name="site_title"
                  onChange={handleChange}
                  label="Site title"
                  type="text"
                  required
                  value={inputValues.site_title}
                  rows={5}
                  variant="outlined"
                  fullWidth
                />
                <div
                  className="p-5"
                  style={{
                    marginTop: "2%",
                    borderTopWidth: "1px",
                    borderTopColor: "#949494",
                    borderTopStyle: "solid",

                    // borderBottomWidth: "1.5px",
                    // borderBottomColor: "#949494",
                    // borderBottomStyle: "solid",
                  }}
                >
                  <h2>Add Store Hours</h2>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "3%",
                    }}
                    className="w-100"
                  >
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Day
                      </InputLabel>
                      <Select
                        name="day"
                        onChange={handleChange}
                        type="text"
                        id="day"
                        required
                        value={
                          !editStoreHours
                            ? updateStoreHoursItem.day
                            : inputValues.store_hours_timings.day
                        }
                        className={classes.selectEmpty}
                      >
                        {days.map((v, i) => (
                          <MenuItem key={i} value={v}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Start Time
                      </InputLabel>
                      <Select
                        name="startTime"
                        onChange={handleChange}
                        type="text"
                        required
                        className={classes.selectEmpty}
                        value={
                          !editStoreHours
                            ? updateStoreHoursItem.startTime
                            : inputValues.store_hours_timings.startTime
                        }
                      >
                        {StartHours.map((v, i) => (
                          <MenuItem key={i} value={v}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Close Time
                      </InputLabel>
                      <Select
                        name="closeTime"
                        onChange={handleChange}
                        type="text"
                        required
                        value={
                          !editStoreHours
                            ? updateStoreHoursItem.closeTime
                            : inputValues.store_hours_timings.closeTime
                        }
                      >
                        {CloseHours.map((v, i) => (
                          <MenuItem key={i} value={v}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      color="secondary"
                      style={{
                        marginLeft: "5px",
                        marginTop: "20px",
                        height: "50%",
                      }}
                      className="mr-8 normal-case"
                      variant="contained"
                      onClick={addOrUpdateStoreHours}
                    >
                      {editStoreHours === true ? "Add" : "Update"}
                    </Button>
                  </div>
                </div>
                <br />
                <p style={{ color: "#dc3545" }}>{storehourError}</p>
                <div>
                  {" "}
                  {inputValues.store_hours.map((value, index) => (
                    <div key={index}>
                      {value.day} {value.startTime} - {value.closeTime}{" "}
                      <Button
                        color="secondary"
                        style={{ margin: "2px" }}
                        className="mr-8 normal-case"
                        variant="contained"
                        aria-label="Follow"
                        disabled={!editStoreHours}
                        size="small"
                        onClick={() => {
                          editStoreClick(value, index);
                          setEditStoreHours(false);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ margin: "2px" }}
                        color="primary"
                        type="button"
                        variant="contained"
                        size="small"
                        classes={{
                          root: classes.root,
                        }}
                        // variant="outlined"
                        // shape="square"
                        // size="small"
                        type="button"
                        onClick={() => {
                          const filt = inputValues.store_hours.filter(
                            (_, idx) => idx !== index
                          );
                          setInputValues({ ...inputValues, store_hours: filt });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
                <div
                  className="p-5"
                  style={{
                    marginTop: "2%",
                    borderTopWidth: "1px",
                    borderTopColor: "#949494",
                    borderTopStyle: "solid",

                    // borderBottomWidth: "1.5px",
                    // borderBottomColor: "#949494",
                    // borderBottomStyle: "solid",
                  }}
                >
                  <h2>Add Promo Section</h2>
                  <div style={{ display: "flex" }} className="mt-5 w-100">
                    <div>
                      <Input
                        className="hidden"
                        id="image"
                        name="image"
                        type="file"
                        onChange={imageHandler}
                      />
                      <div className="flex justify-center sm:justify-start flex-wrap">
                        <label
                          style={{ textAlign: "center" }}
                          htmlFor="image"
                          className={clsx(
                            classes.productImageUpload,
                            "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                          )}
                        >
                          Upload Promo Image
                        </label>
                      </div>
                    </div>
                  </div>
                  <TextField
                    className="mt-8 mb-16"
                    required
                    label="Title"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    variant="outlined"
                    value={inputValues.promo_section.title}
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    required
                    label="Link"
                    id="link"
                    name="link"
                    value={inputValues.promo_section.link}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    required
                    label="Promo text"
                    id="promo_text"
                    name="promo_text"
                    value={inputValues.promo_section.promo_text}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />

                  <Button
                    color="secondary"
                    style={{ margin: "2px 5px 2px 2px", height: "40px" }}
                    onClick={addOrUpdateWinterSale}
                    variant="contained"
                  >
                    {editWinterSale === true ? "Add" : "Update"}
                  </Button>
                  <p style={{ color: "#dc3545" }} className="mt-3">
                    {WinterSaleError}
                  </p>
                  <div className="mt-4">
                    <div>
                      {inputValues.winter_sale.map((value, index) => (
                        <div key={index}>
                          <Avatar
                            src={value.image}
                            alt="image"
                            style={{
                              width: "100px",
                              height: "100px",
                              marginTop: "10px",
                            }}
                          />
                          <div>
                            <p className="mt-3">{value.title}</p>
                            <p className="mt-3">{value.link}</p>
                            <p className="mt-3">{value.promo_text}</p>
                          </div>
                          <Button
                            style={{ margin: "2px", backgroundColor: "red" }}
                            color="secondary"
                            style={{ margin: "2px" }}
                            className="mr-8 normal-case"
                            variant="contained"
                            aria-label="Follow"
                            disabled={!editWinterSale}
                            size="small"
                            onClick={() => {
                              editWinterClick(value, index);
                              seteditWinterSale(false);
                              setAddEnabled(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            // style={{ margin: "2px", backgroundColor: "red" }}
                            color="primary"
                            variant="contained"
                            size="small"
                            classes={{
                              root: classes.root,
                            }}
                            type="button"
                            onClick={() => {
                              const filt = inputValues.winter_sale.filter(
                                (val, idx) => idx !== index
                              );
                              setInputValues({
                                ...inputValues,
                                winter_sale: filt,
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <br />

                <div
                  className="p-5"
                  style={{
                    borderTopWidth: "1px",
                    borderTopColor: "#949494",
                    borderTopStyle: "solid",

                    // borderBottomWidth: "1.5px",
                    // borderBottomColor: "#949494",
                    // borderBottomStyle: "solid",
                  }}
                >
                  <h2>Add Top Section</h2>
                  <div style={{ display: "flex" }} className="mt-5  w-100">
                    {TopSectionImgUrl ? (
                      <Avatar
                        src={TopSectionImgUrl}
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <div>
                        <Input
                          className="hidden"
                          type="file"
                          id="TopSectionImgUrl"
                          name="TopSectionImgUrl"
                          onChange={imageHandler}
                        />
                        <div className="flex justify-center sm:justify-start flex-wrap">
                          <label
                            htmlFor="TopSectionImgUrl"
                            className={clsx(
                              classes.productImageUpload,
                              "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                            )}
                            style={{
                              textAlign: "center",
                              display: "flex",
                              alignSelf: "center",
                            }}
                          >
                            Upload Top section image
                          </label>
                        </div>
                      </div>
                    )}
                    {TopSectionImgUrl && (
                      <Icon onClick={() => setTopSectionImgUrl(null)}>
                        clear{" "}
                      </Icon>
                    )}
                  </div>

                  <TextField
                    className="mt-8 mb-16"
                    id="topsectionTitle"
                    name="topsectionTitle"
                    onChange={handleChange}
                    label="Top section title"
                    type="text"
                    value={inputValues.topsectionTitle}
                    rows={5}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    variant="outlined"
                    fullWidth
                    id="meta_description"
                    name="meta_description"
                    onChange={handleChange}
                    label="Meta description"
                    type="text"
                    value={inputValues.meta_description}
                    rows={5}
                  />
                  <TextField
                    className="mt-8 mb-16"
                    id="terms_of_use"
                    name="terms_of_use"
                    onChange={handleChange}
                    label="Terms of use"
                    type="text"
                    value={inputValues.terms_of_use}
                    rows={5}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                {/**
                 * Color Section
                 */}
                <div
                  className="p-5"
                  style={{
                    marginTop: "2%",
                    borderTopWidth: "1px",
                    borderTopColor: "#949494",
                    borderTopStyle: "solid",

                    // borderBottomWidth: "1.5px",
                    // borderBottomColor: "#949494",
                    // borderBottomStyle: "solid",
                  }}
                >
                  {/* <h2>Footer Color Section</h2> */}
                  <h2>Select Currency (Default currency will be USD $)</h2>

                  <select
                  >
                    {currencyArray.map((v, i) => (
                      <option key={i} value={v} onClick={() => handleCurrencyChange(v)}>
                        {v.currency_name} - {v.currency_symbol}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="p-5"
                  style={{
                    marginTop: "2%",
                    borderTopWidth: "1px",
                    borderTopColor: "#949494",
                    borderTopStyle: "solid",

                    // borderBottomWidth: "1.5px",
                    // borderBottomColor: "#949494",
                    // borderBottomStyle: "solid",
                  }}
                >
                  {/* <h2>Footer Color Section</h2> */}
                  <h2>Color Section</h2>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginTop: "15px" }}>
                      <h4 style={{ marginBottom: "5px", color: "#535353" }}>
                        Primary Color
                      </h4>
                      <Button
                        style={{
                          cursor: "pointer",
                          backgroundColor: inputValues.header_primary_color,
                        }}
                        required
                        onClick={() =>
                          setshowheader_primary_color(!showheader_primary_color)
                        }
                      >
                        {inputValues.header_primary_color ||
                          "Select primary color"}{" "}
                      </Button>
                      {showheader_primary_color ? (
                        <div style={{ position: "absolute", zIndex: "2" }}>
                          <SwatchesPicker
                            onChange={(e) => {
                              SetPageLeave(true);
                              setInputValues({
                                ...inputValues,
                                header_primary_color: e.hex,
                              });
                              setshowheader_primary_color(
                                !showheader_primary_color
                              );
                            }}
                            color={inputValues.header_primary_color}
                          />
                        </div>
                      ) : null}
                    </div>

                    <div style={{ marginTop: "15px", marginLeft: "3%" }}>
                      <h4 style={{ marginBottom: "5px", color: "#535353" }}>
                        Secondary Color
                      </h4>
                      <Button
                        style={{
                          cursor: "pointer",
                          backgroundColor: inputValues.header_secondary_color,
                        }}
                        onClick={() =>
                          setshowheader_secondary_color(
                            !showheader_secondary_color
                          )
                        }
                      >
                        {inputValues.header_secondary_color ||
                          "Select secondary color"}{" "}
                      </Button>
                      {showheader_secondary_color ? (
                        <div style={{ position: "absolute", zIndex: "2" }}>
                          <SwatchesPicker
                            onChange={(e) => {
                              SetPageLeave(true);
                              setInputValues({
                                ...inputValues,
                                header_secondary_color: e.hex,
                              });
                              setshowheader_secondary_color(
                                !showheader_secondary_color
                              );
                            }}
                            color={inputValues.header_secondary_color}
                          />
                        </div>
                      ) : null}
                    </div>

                    <div style={{ marginTop: "15px", marginLeft: "3%" }}>
                      <h4 style={{ marginBottom: "5px", color: "#535353" }}>
                        Button Color
                      </h4>
                      {/* <Typography
                        style={{
                          marginBottom: "5px",
                          color: "#535353",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                        // className="md:ml-24"
                        variant="body2"
                        color="inherit"
                      >
                        Button Color
                      </Typography> */}
                      <Button
                        style={{
                          cursor: "pointer",
                          backgroundColor: inputValues.footer_color,
                        }}
                        onClick={() => setshowfooter_color(!showfooter_color)}
                      >
                        {inputValues.footer_color || "Select Button color"}
                      </Button>
                      {showfooter_color ? (
                        <div style={{ position: "absolute", zIndex: "2" }}>
                          <SwatchesPicker
                            onChange={(e) => {
                              SetPageLeave(true);
                              setInputValues({
                                ...inputValues,
                                footer_color: e.hex,
                              });
                              setshowfooter_color(!showfooter_color);
                            }}
                            color={inputValues.footer_color}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* <div style={{ marginTop: "10px" }}>
                    <h4 style={{ marginBottom: "5px", color: "#535353" }}>
                      Footer Font Primary Color
                    </h4>
                    <Button
                      style={{
                        cursor: "pointer",
                        backgroundColor: inputValues.footer_font_primary_color,
                      }}
                      onClick={() =>
                        setshowfooter_font_primary_color(
                          !showfooter_font_primary_color
                        )
                      }
                    >
                      {inputValues.footer_font_primary_color ||
                        "Select footer font primary color"}
                    </Button>
                    {showfooter_font_primary_color ? (
                      <div style={{ position: "absolute", zIndex: "2" }}>
                        <SwatchesPicker
                          onChange={(e) => {
                            SetPageLeave(true);
                            setInputValues({
                              ...inputValues,
                              footer_font_primary_color: e.hex,
                            });
                            setshowfooter_font_primary_color(
                              !showfooter_font_primary_color
                            );
                          }}
                          color={inputValues.footer_font_primary_color}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <h4 style={{ marginBottom: "5px", color: "#535353" }}>
                      Footer Font Secondary Color
                    </h4>
                    <Button
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          inputValues.footer_font_secondary_color,
                      }}
                      onClick={() =>
                        setshowfooter_font_secondary_color(
                          !showfooter_font_secondary_color
                        )
                      }
                    >
                      {inputValues.footer_font_secondary_color ||
                        "Select footer font secondary color"}
                    </Button>
                    {showfooter_font_secondary_color ? (
                      <div style={{ position: "absolute", zIndex: "2" }}>
                        <SwatchesPicker
                          onChange={(e) => {
                            SetPageLeave(true);
                            setInputValues({
                              ...inputValues,
                              footer_font_secondary_color: e.hex,
                            });
                            setshowfooter_font_secondary_color(
                              !showfooter_font_secondary_color
                            );
                          }}
                          color={inputValues.footer_font_secondary_color}
                        />
                      </div>
                    ) : null}
                  </div>
                */}
                </div>
                {/**
                 * Header Color
                 */}
                {/* <div
                  className="p-5"
                  style={{
                    marginTop: "2%",
                    borderTopWidth: "1px",
                    borderTopColor: "#949494",
                    borderTopStyle: "solid",

                    // borderBottomWidth: "1.5px",
                    // borderBottomColor: "#949494",
                    // borderBottomStyle: "solid",
                  }}
                >
                  <h2>Header Color Section</h2> */}

                {/* <div style={{ marginTop: "10px" }}>
                    <h4 style={{ marginBottom: "5px", color: "#535353" }}>
                      Header Font Primary Color
                    </h4>
                    <Button
                      style={{
                        cursor: "pointer",
                        backgroundColor: inputValues.header_font_primary_color,
                      }}
                      onClick={() => {
                        setshowheader_font_primary_color(
                          !showheader_font_primary_color
                        );
                      }}
                    >
                      {inputValues.header_font_primary_color ||
                        "Select header font primary color"}{" "}
                    </Button>
                    {showheader_font_primary_color ? (
                      <div style={{ position: "absolute", zIndex: "2" }}>
                        <SwatchesPicker
                          onChange={(e) => {
                            SetPageLeave(true);
                            setInputValues({
                              ...inputValues,
                              header_font_primary_color: e.hex,
                            });
                            setshowheader_font_primary_color(
                              !showheader_font_primary_color
                            );
                          }}
                          color={inputValues.header_font_primary_color}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <h4 style={{ marginBottom: "5px", color: "#535353" }}>
                      Header Font Secondary Color
                    </h4>
                    <Button
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          inputValues.header_font_secondary_color,
                      }}
                      required
                      onClick={() =>
                        setshowheader_font_secondary_color(
                          !showheader_font_secondary_color
                        )
                      }
                    >
                      {inputValues.header_font_secondary_color ||
                        "Select header font secondary color"}
                    </Button>
                    {showheader_font_secondary_color ? (
                      <div style={{ position: "absolute", zIndex: "2" }}>
                        <SwatchesPicker
                          onChange={(e) => {
                            SetPageLeave(true);
                            setInputValues({
                              ...inputValues,
                              header_font_secondary_color: e.hex,
                            });
                            setshowheader_font_secondary_color(
                              !showheader_font_secondary_color
                            );
                          }}
                          color={inputValues.header_font_secondary_color}
                        />
                      </div>
                    ) : null}
                  </div>
               */}
                {/* </div> */}
                <Button
                  color="secondary"
                  style={{ margin: "10px" }}
                  onClick={submit}
                  variant="contained"
                  aria-label="Follow"
                >
                  Submit
                </Button>
              </>
            )}
          </div>
          {tabValue === 1 && (
            <ul>
              {" "}
              {meta_categories?.map(
                ({ _id, categoryType, sub_categories, category_names }, i) => {
                  const incl = selectedcategories.filter(
                    (v, i) => v.id === _id
                  );
                  return (
                    <li key={i} style={{ display: "flex", margin: "10px" }}>
                      <div>
                        <div style={{ display: "flex" }}>
                          <input
                            style={{ height: "20px", width: "20px" }}
                            type="checkbox"
                            checked={incl[0]?.id && true}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleCheck(e, _id, "categories", sub_categories)
                            }
                          />{" "}
                          <p>{categoryType}</p>
                        </div>
                        <ul>
                          {category_names?.map((val, i) => {
                            return (
                              <div key={i}>
                                <div style={{ display: "flex" }}>
                                  <input
                                    name="subname"
                                    id="subname"
                                    style={{ height: "20px", width: "20px" }}
                                    type="checkbox"
                                    checked={incl[0]?.category_name.includes(
                                      val.category_name
                                    )}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                      handleCheck(
                                        e,
                                        _id,
                                        "subcategories",
                                        val.category_name
                                      )
                                    }
                                  />
                                  <p>{val.category_name}</p>
                                  <ul>
                                    {val.sub_category.map((v, i) => (
                                      <li key={i}>
                                        <p>{v}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            );
                          })}
                          {/* {sub_categories?.map((val, i) => {
                      return (<div key={i} >
                        <div style={{ display: 'flex' }} >
                          <input
                            name='subname'
                            id='subname'
                            style={{ height: '20px', width: '20px' }}
                            type='checkbox'
                            checked={incl[0]?.subname.includes(val.subname)}
                            onClick={e => e.stopPropagation()}
                            onChange={e => handleCheck(e, _id, 'subcategories', val.subname,)}
                          />
                          <p>{val.subname}</p> </div>
                      </div>)
                    }
                    )} */}
                        </ul>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          )}
          {tabValue === 2 && (
            <div>
              <TextField
                value={pricePercent}
                id="pricePercent"
                className="mt-8 mb-16"
                label="Add Percentage"
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                name="pricePercent"
                onChange={handlePricePercent}
              />
              {percenterror && (
                <p style={{ color: "red" }}>Please enter between 1-100</p>
              )}
            </div>
          )}
        </div>
      }
    />
  );
};
export default CreateCampus;
