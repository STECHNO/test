import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Icon, Input, Avatar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { config } from '../../S3Configuration/s3';
import S3 from "aws-s3";
import Yamde from "yamde";
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css';
import swal from 'sweetalert';

const useStyles = makeStyles(theme => ({
    contentHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15px',
        width: '100%'
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

}));


function CreateBlogContent(props) {
    const ReactS3Client = new S3(config);
    const [logoUrl, setLogoUrl] = useState(null);
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');

    const classes = useStyles(props);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);


    const imageHandler = (e) => {
        e.persist();
        ReactS3Client.uploadFile(e.target.files[0], e.target.files[0]?.name)
            .then(({ location }) => {
                if (e.target.name === "article") {
                    setLogoUrl(location);
                }
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const postArticle =() => {
      console.log('post article')
      console.log('author', author);
      console.log('title', title);
      console.log('tags', tags);
      console.log('content', text)

      fetch('http://localhost:5013/api/createBlogs', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          author: author,
          content: text,
          searchTags: tags,
          storeID: ''
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
            console.log(data.msg);
            swal({
                text: "Your article has been published",
                icon: "success",
                closeOnEsc: false,
                dangerMode: false,
            }).then(
                setAuthor(''),
                setTitle(''),
                setTags([]),
                setText('')
            );
          }
          else if(data.message === 'error') {
            swal({
                text: "Blog Content is required",
                icon: "warning",
                closeOnEsc: false,
                dangerMode: true,
            });
          }
        }).catch(function (error) {
          console.log(error);
        });


    }

   
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.contentHeader}>
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
                                        Upload Blog Photo
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={classes.contentHeader}>
                    <div>
                        <span className={classes.root} noValidate autoComplete="off">
                            <TextField style={{ width: '400px' }} id="standard-basic" label="Author"  value={author} onChange={(e) => setAuthor(e.target.value)}/>
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
                            <InputTags  values={tags} onTags={(value) => setTags(value.values)} placeholder='Enter Tags'/>
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
                        {/* <div style={{color: "blue",textDecoration: "underline",cursor: "pointer"}} onClick={() => setIsLightMode(!isLightMode)}>
                            {`${isLightMode ? "Dark" : "Light"} Mode`}
                        </div> */}

                        <Yamde
                            value={text}
                            handler={setText}
                        // theme={isLightMode ? "light" : "dark"}
                        />
                    </div>
                </div>
                <div className={classes.contentHeader}>
                    <div>
                        <Button variant="contained" color="primary" onClick={postArticle}>
                            Post Article
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CreateBlogContent;