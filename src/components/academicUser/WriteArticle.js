import React from 'react'
import NavBarWP from './navBarWP';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {alpha, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import SchoolSharpIcon from '@material-ui/icons/SchoolSharp';
import Button from "@material-ui/core/Button";
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
   editor:{
        paddingTop:120,
       width:"50%",
       paddingBottom:50,
       margin:"auto"
   },
   navBar:{
    display:"block",
   },
    optionSection:{
        width:"50%",
        paddingBottom:100,
        margin:"auto"
    },
    dropdown:{
        marginLeft:40,
        marginTop:-10,
    },
    question:{
        marginTop:20,
        marginBottom:20,
    },
    buttonPublish: {
        backgroundColor:'#935FF9',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        color: 'white',
        width:'15%',
        fontSize:16,
        marginRight: theme.spacing(2)
    },
    licenceQuestion:{
        display:"none",
    },
    moreButton:{
        backgroundColor:'#935FF9',
        color:'#fff'
    }
}));

export default function WriteArticle() {
    const classes = useStyles();
    return (
        <div>
            <NavBarWP className={classes.navBar} />

            <div align="center" className={classes.editor}>
                <CKEditor

                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>

            <div className={classes.optionSection}>
                <Typography component="h6" variant="h6" className={classes.question}>
                    Who can see this post ?
                    <FormControl>
                        <Select
                            className={classes.dropdown}
                            id="demo-customized-select"
                            // value={age}
                            // onChange={handleChange}
                            // input={<BootstrapInput />}
                        >
                            <MenuItem value={10} defaultChecked={true}><PublicSharpIcon/> &nbsp; Anyone</MenuItem>
                            <MenuItem value={20}><PeopleSharpIcon/> &nbsp; Academics Only</MenuItem>
                            <MenuItem value={30}><SchoolSharpIcon/> &nbsp; Within University Only</MenuItem>
                        </Select>
                    </FormControl>
                </Typography>

                <Typography component="h6" variant="h6" className={classes.question}>
                    Choose License
                    <FormControl>
                        <Select
                            className={classes.dropdown}
                            id="demo-customized-select"
                            // value={age}
                            // onChange={handleChange}
                            // input={<BootstrapInput />}
                        >
                            <MenuItem value={"CC BY"}><img src={"https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png"} width={50} alt="by" />&nbsp; CC BY</MenuItem>
                            <MenuItem value={"CC BY-NC"}><img src={"https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc.png"} width={50} alt="by-nc" />&nbsp; CC BY-NC</MenuItem>
                            <MenuItem value={"CC BY-SA"}><img src={"https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png"} width={50} alt="by-sa" />&nbsp; CC BY-SA</MenuItem>
                            <MenuItem value={"CC BY-NC-SA"}><img src={"https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png"} width={50} alt="by-nc-sa" />&nbsp; CC BY-NC-SA</MenuItem>
                            <MenuItem value={"CC BY-ND"}><img src={"https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nd.png"} width={50} alt="by-nd" />&nbsp; CC BY-ND</MenuItem>
                            <MenuItem value={"CC BY-NC-ND"}><img src={"https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png"} width={50} alt="by-nc-nd" />&nbsp; CC BY-NC-ND</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    Don’t have an idea about licences ?  Let us help you &nbsp;<Button className={classes.moreButton}><ArrowDropDownSharpIcon/></Button>
                    <div className={classes.licenceQuestion} id={'licence-question'}>
                        <span>Q1. Allow adaptations of your work to be shared?</span>
                        <FormControl>
                            <Select
                                className={classes.dropdown}
                                id="demo-customized-select"
                                // value={age}
                                // onChange={handleChange}
                                // input={<BootstrapInput />}
                            >
                                <MenuItem value={1} defaultChecked={true}>Yes</MenuItem>
                                <MenuItem value={2}>Yes, But re-publish under the same terms</MenuItem>
                                <MenuItem value={3}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <span>Q2. Allow commercial uses of your work?</span>
                        <FormControl>
                            <Select
                                className={classes.dropdown}
                                id="demo-customized-select"
                                // value={age}
                                // onChange={handleChange}
                                // input={<BootstrapInput />}
                            >
                                <MenuItem value={1} defaultChecked={true}>Yes</MenuItem>
                                <MenuItem value={2}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Typography>
                <br/>
                <Button variant="contained"  className={classes.buttonPublish}>
                    Publish
                </Button>

                <Button variant="contained"  className={classes.buttonPublish}>
                    Cancel
                </Button>

            </div>

        </div>
    )
}
