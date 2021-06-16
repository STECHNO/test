import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Icon, Input, Menu, MenuList, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import swal from 'sweetalert';
import axios from "axios";
import { api } from '../../../../../../utils/Constant';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Yamde from "yamde";
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import TextField from '@material-ui/core/TextField';
import { stubFalse } from 'lodash-es';

const useStyles = makeStyles(theme => ({
    contentHeader: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        zIndex: 1,
    },
    root: {
        maxWidth: 266.94,
        margin: '10px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    dltBtnDiv: {
        position: 'relative',
        // top: 100,
        zIndex: 2,
        height: 'auto',
        width: '100%',
        // backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    dltBtn: {
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        flexWrap: 'wrap',
        overflowY: 'scroll',
        zIndex: 3000,
        marginTop: '5%',
        textAlign: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(12, 4, 3),
        // overflowY: 'auto'
    },
    contentMainDiv: {
        zIndex: 3000,
    },
    searchArea: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}));




function ArticleListContent(props) {
    const [allBlogs, setAllBlogs] = useState([])

    const [expanded, setExpanded] = useState({});
    const [showOptions, setShowOptions] = useState({});
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);


    const [logoUrl, setLogoUrl] = useState(null);
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [searchFromTags, setSearchFromTags] = useState('');
    const [searchedBlogs, setSearchedBlogs] = useState([]);
    const [allBlogsShow, setAllBlogsShow] = useState(true)



    const classes = useStyles(props);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);



    const handleExpandClick = (i) => {
        setExpanded({
            ...expanded,
            [i]: !expanded[i]
        });
    };

    const handleOptionClick = (i) => {
        setShowOptions({
            ...showOptions,
            [i]: !showOptions[i]
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const initiateUpdateArticle = (v) => {
        console.log(v)
        setText(v.content);
        setTags(v.searchTags);
        setAuthor(v.author);
        setTitle(v.title);
        setId(v._id);
    };

    const updateArticle = (v) => {
        console.log('update');
        console.log('author', author);
        console.log('title', title);
        console.log('tags', tags);
        console.log('content', text)
        console.log('id', id);

        fetch('http://localhost:5013/api/updateBlogs', {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                author: author,
                content: text,
                searchTags: tags,
                id: id,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(function (data) {
                console.log('data after submit button >>>>', data);
                if (data.message === 'Success') {
                    console.log('yes');
                    swal({
                        text: "Congratulations! your article has been updated",
                        icon: "success",
                        closeOnEsc: false,
                        dangerMode: false,
                    }).then(() => handleClose());
                }
                else if (data.message === 'error') {
                    console.log(data.error);
                }
            }).catch(function (error) {
                if (error.message === 'error') {
                    console.log(error.error);
                }
            });
    };



    const deleteHandler = (v) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this article!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(api + `5013/api/deleteBlog`, {
                    headers: {
                        "Content-type": "application/json",
                    },
                    data: {
                        id: v._id
                    }
                }).then(({ data }) => {
                    console.log('after delete', data)
                    if (data.message === 'Success') {
                        swal({
                            text: "Your article has been deleted",
                            icon: "success",
                            button: true,
                            closeOnEsc: false,
                            dangerMode: false,
                        }).then((res) => {
                            if(res === true){
                                window.location.reload()
                            }
                        })
                    }
                }).catch((e) => {
                    console.log('error', e);
                });
            }
            else {
                return null;
            }
        });
    };

    const searchBlogFromTags = () => {
        if (searchFromTags.length > 0) {
            fetch('http://localhost:5013/api/searchByTags', {
                method: 'POST',
                body: JSON.stringify({
                    text: searchFromTags
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
                .then(function (res) {
                    if (res.message === 'Success') {
                        if (res.data.length >= 1) {
                            setAllBlogsShow(false);
                            setSearchedBlogs(res.data);
                        }
                    }
                }).catch(function (error) {
                    if (error.message === 'error') {
                        console.log(error.message);
                    }
                });
        }
    }



    useEffect(() => {
        fetch('http://localhost:5013/api/allBlogs')
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(function (response) {
                setAllBlogs(response.data)
            }).catch(function (error) {
                console.log('Something went wrong.', error);
            });
    }, [])

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <ThemeProvider theme={mainTheme}>
                    <div className={classes.searchArea}>
                        <TextField style={{ width: '400px' }} id="standard-basic" label="Search Blog With Tags" value={searchFromTags} onChange={(e) => {
                            setSearchFromTags(e.target.value);
                        }} />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={searchBlogFromTags}
                        >
                            Search
                        </Button>
                    </div>
                    <div className={classes.contentHeader}>
                        {allBlogsShow && (
                            allBlogs.map((v, i) => {
                                return (
                                    <div key={i}>
                                        <Card style={{ height: '100%' }} className={classes.root} >
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        R
                                                </Avatar>
                                                }
                                                action={
                                                    <div>
                                                        <IconButton onClick={() => handleOptionClick(i)}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    </div>
                                                }
                                                title={v.author}
                                                subheader={`${new Date(v.published_date).toLocaleDateString()}, ${new Date(v.published_date).toLocaleTimeString()}`}
                                            />
                                            {showOptions[i] && (
                                                <div className={classes.dltBtnDiv} >
                                                    <span className={classes.dltBtn}>
                                                        <MenuList>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    deleteHandler(v);
                                                                }}
                                                            >
                                                                <ListItemIcon className="min-w-40">
                                                                    <Icon>delete</Icon>
                                                                </ListItemIcon>
                                                                <ListItemText primary="Remove" />
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    handleOpen();
                                                                    initiateUpdateArticle(v);
                                                                }}
                                                            >
                                                                <ListItemIcon className="min-w-40">
                                                                    <Icon>update</Icon>
                                                                </ListItemIcon>
                                                                <ListItemText primary="Edit" />
                                                            </MenuItem>
                                                        </MenuList>
                                                    </span>
                                                </div>
                                            )}
                                            <CardMedia
                                                className={classes.media}
                                                image="/static/images/cards/paella.jpg"
                                                title="Paella dish"
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">{v.title}</Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton>
                                                <IconButton
                                                    className={clsx(classes.expand, {
                                                        [classes.expandOpen]: expanded[i],
                                                    })}
                                                    onClick={() => handleExpandClick(i)}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>
                                            </CardActions>
                                            <Collapse in={expanded[i]} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography paragraph>
                                                        {v.content}
                                                    </Typography>
                                                </CardContent>
                                            </Collapse>
                                        </Card>

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
                                                    <div className={classes.contentMainDiv} >
                                                        <div className={classes.contentHeader}>
                                                            <div>
                                                                <span className={classes.root} noValidate autoComplete="off">
                                                                    <TextField style={{ width: '400px' }} id="standard-basic" label="Author" value={author} onChange={(e) => { setAuthor(e.target.value, console.log(e.target.value)) }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={classes.contentHeader}>
                                                            <div>
                                                                <form className={classes.root} noValidate autoComplete="off">
                                                                    <TextField style={{ width: '400px' }} id="standard-basic" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                                </form>
                                                            </div>
                                                        </div>

                                                        <div className={classes.contentHeader}>
                                                            <div>
                                                                <div style={{ width: '400px', height: '45px', marginLeft: '8px' }} className='input-group'>
                                                                    <InputTags values={tags} onTags={(value) => setTags(value.values)} placeholder='Enter Tags' />
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

                                                        <div >
                                                            <div>
                                                                <Yamde
                                                                    value={text}
                                                                    handler={setText}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={classes.contentHeader}>
                                                            <div>
                                                                <Button variant="contained" color="primary" onClick={(v) => updateArticle(v)}>
                                                                    Update Article
                                                            </Button>
                                                                <Button style={{ marginLeft: 10 }} variant="contained" color="primary" onClick={handleClose}>
                                                                    Cancel
                                                            </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fade>
                                        </Modal>
                                    </div>
                                )
                            })
                        )}

                        {!allBlogsShow && (
                            searchedBlogs.map((v, i) => {
                                return (
                                    <div key={i}>
                                        <Card style={{ height: '100%' }} className={classes.root} >
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        R
                                                </Avatar>
                                                }
                                                action={
                                                    <div>
                                                        <IconButton onClick={() => setShowDeleteBtn(handleOptionClick(i))}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    </div>
                                                }
                                                title={v.author}
                                                subheader={`${new Date(v.published_date).toLocaleDateString()}, ${new Date(v.published_date).toLocaleTimeString()}`}
                                            />
                                            {showOptions[i] && (
                                                <div className={classes.dltBtnDiv} >
                                                    <span className={classes.dltBtn}>
                                                        <MenuList>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    deleteHandler(v);
                                                                }}
                                                            >
                                                                <ListItemIcon className="min-w-40">
                                                                    <Icon>delete</Icon>
                                                                </ListItemIcon>
                                                                <ListItemText primary="Remove" />
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() => {
                                                                    handleOpen();
                                                                    initiateUpdateArticle(v);
                                                                }}
                                                            >
                                                                <ListItemIcon className="min-w-40">
                                                                    <Icon>update</Icon>
                                                                </ListItemIcon>
                                                                <ListItemText primary="Edit" />
                                                            </MenuItem>
                                                        </MenuList>
                                                    </span>
                                                </div>
                                            )}
                                            <CardMedia
                                                className={classes.media}
                                                image="/static/images/cards/paella.jpg"
                                                title="Paella dish"
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">{v.title}</Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton>
                                                <IconButton
                                                    className={clsx(classes.expand, {
                                                        [classes.expandOpen]: expanded[i],
                                                    })}
                                                    onClick={() => handleExpandClick(i)}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>
                                            </CardActions>
                                            <Collapse in={expanded[i]} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography paragraph>
                                                        {v.content}
                                                    </Typography>
                                                </CardContent>
                                            </Collapse>
                                        </Card>

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
                                                    <div className={classes.contentMainDiv} >
                                                        <div className={classes.contentHeader}>
                                                            <div>
                                                                <span className={classes.root} noValidate autoComplete="off">
                                                                    <TextField style={{ width: '400px' }} id="standard-basic" label="Author" value={author} onChange={(e) => { setAuthor(e.target.value, console.log(e.target.value)) }} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={classes.contentHeader}>
                                                            <div>
                                                                <form className={classes.root} noValidate autoComplete="off">
                                                                    <TextField style={{ width: '400px' }} id="standard-basic" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                                </form>
                                                            </div>
                                                        </div>

                                                        <div className={classes.contentHeader}>
                                                            <div>
                                                                <div style={{ width: '400px', height: '45px', marginLeft: '8px' }} className='input-group'>
                                                                    <InputTags values={tags} onTags={(value) => setTags(value.values)} placeholder='Enter Tags' />
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

                                                        <div >
                                                            <div>
                                                                <Yamde
                                                                    value={text}
                                                                    handler={setText}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={classes.contentHeader}>
                                                            <div>
                                                                <Button variant="contained" color="primary" onClick={(v) => updateArticle(v)}>
                                                                    Update Article
                                                            </Button>
                                                                <Button style={{ marginLeft: 10 }} variant="contained" color="primary" onClick={handleClose}>
                                                                    Cancel
                                                            </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fade>
                                        </Modal>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </ThemeProvider>
            </Container>
        </div>
    )
}

export default ArticleListContent;