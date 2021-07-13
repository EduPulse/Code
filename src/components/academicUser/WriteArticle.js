import React from 'react'
import NavBarWP from './navBarWP';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {alpha, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {FormControl, MenuItem, Select, TextField} from "@material-ui/core";
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import SchoolSharpIcon from '@material-ui/icons/SchoolSharp';
import Button from "@material-ui/core/Button";
import MoneyOffSharpIcon from '@material-ui/icons/MoneyOffSharp'
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import PresentToAllSharpIcon from '@material-ui/icons/PresentToAllSharp';
import CancelPresentationSharpIcon from '@material-ui/icons/CancelPresentationSharp';
import PausePresentationSharpIcon from '@material-ui/icons/PausePresentationSharp';
import Multiselect from 'multiselect-react-dropdown';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    editor: {
        paddingTop: 120,
        width: "50%",
        paddingBottom: 30,
        margin: "auto"
    },
    navBar: {
        display: "block",
    },
    optionSection: {
        width: "50%",
        paddingBottom: 100,
        margin: "auto"
    },
    dropdown: {
        marginLeft: 40,
        marginTop: -10,
    },
    question: {
        marginTop: 20,
        marginBottom: 20,
    },
    buttonPublish: {
        backgroundColor: '#935FF9',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: alpha("#935FF9", 0.70),
        },
        color: 'white',
        width: '15%',
        fontSize: 16,
        marginRight: theme.spacing(2)
    },
    licenceQuestion: {
        // display:"none",
    },
    moreButton: {
        backgroundColor: '#935FF9',
        color: '#fff'
    },
    postTitle:{
        marginTop:20,
        marginBottom:20,
        width:"100%",
        fontSize:20,
    },
}));


const state = {
    options: [{name: 'Option 1', id: 1},{name: 'Option 2', id: 2}]
};

export default function WriteArticle() {


    const classes = useStyles();
    let tagArray=Array("#ComputerScience","#Managment","#DataScience","#Medicine","#Low");
    return (
        <div>
            <NavBarWP className={classes.navBar}/>

            <div align="center" className={classes.editor}>

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Title" variant="outlined" multiline rows={3} className={classes.postTitle} />
                </form>

                <CKEditor

                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({event, editor, data});
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>

            <div className={classes.optionSection}>
                <Typography component="h6" variant="h6" className={classes.question}>
                    Select tags:
                    <Multiselect options={tagArray} isObject={false} selectionLimit={4}/>
                </Typography>
                <Typography component="h6" variant="h6" className={classes.question}>
                    Who can see this post?
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
                    Allow adaptations of your work to be shared?
                    <FormControl>
                        <Select
                            className={classes.dropdown}
                            id="demo-customized-select"
                            // value={age}
                            // onChange={handleChange}
                            // input={<BootstrapInput />}
                        >
                            <MenuItem value={1} defaultChecked={true}><PresentToAllSharpIcon/> &nbsp; Yes</MenuItem>
                            <MenuItem value={2}><PausePresentationSharpIcon/> &nbsp; Yes, But re-publish under the same terms</MenuItem>
                            <MenuItem value={3}><CancelPresentationSharpIcon/> &nbsp; No</MenuItem>
                        </Select>
                    </FormControl>
                </Typography>

                <Typography component="h6" variant="h6" className={classes.question}>
                    Allow commercial uses of your work?
                    <FormControl>
                        <Select
                            className={classes.dropdown}
                            id="demo-customized-select"
                            // value={age}
                            // onChange={handleChange}
                            // input={<BootstrapInput />}
                        >
                            <MenuItem value={1} defaultChecked={true}><AttachMoneySharpIcon/> &nbsp; Yes</MenuItem>
                            <MenuItem value={2}><MoneyOffSharpIcon/> &nbsp; No</MenuItem>
                        </Select>
                    </FormControl>
                </Typography>

                <br/>
                <Link to={"/components/academicUser/viewArticle"} style={{textDecoration:"none"}}>
                <Button variant="contained" className={classes.buttonPublish}>
                    Publish
                </Button>
                </Link>
                <Link to={"/components/academicUser/search"} style={{textDecoration:"none"}}>
                <Button variant="contained" className={classes.buttonPublish}>
                    Cancel
                </Button>
                </Link>
            </div>
        </div>

    )
}
