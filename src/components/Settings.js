import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Themes from '../modules/Theme.js';
import * as actionType from '../modules/action';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10%',
        width: '80%',
        alignSelf : 'center',
        backgroundColor: theme.palette.background.paper,
        borderStyle:'solid',
        borderWidth:'1px',
        borderColor:'#A0A0A0',
    },
}));

const Settings = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const Themelist = useState(Themes);
    const ThemeArr = Object.keys(Themelist[0]);
    const [selectedIndex, setSelectedIndex] = useState('Original');

    useEffect(() => {
        
    }, [])

    const ChangeTheme = (event, key) =>{
        let color = Themes[key].color;
        let ChangeArr = Object.keys(color);
        ChangeArr.forEach(key => {
            document.documentElement.style.setProperty(key, color[key]);
        });
        dispatch(actionType.setPolygondesign(Themes[key].polygondesign));        
        dispatch(actionType.setThemename(key));
        setSelectedIndex(key);
    }


    return (
        <div className='SidebarContent'>
            <div className='Sidebarhead'>환경설정</div>
            <div className='Sidebarbody'>
                <List component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            테마
                        </ListSubheader>
                    }
                    className={classes.root}>
                    {
                        ThemeArr.map(key => {
                            return (
                                <ListItem key={key} selected={selectedIndex === key} button onClick={(event) => ChangeTheme(event, key)}>
                                    <ListItemText primary={key} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </div>
    )
}

export default Settings;