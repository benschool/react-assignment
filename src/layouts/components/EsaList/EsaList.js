import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletToolbar
} from '../index';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles, List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from "@material-ui/core/index";

const styles = theme => ({
  header: {
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.default.dark,
    color: theme.palette.default.contrastText
  },
  portletContent: {
    height: 0,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column'
  },
  listItem: {
    cursor: 'pointer',
    justifyContent: ' space-between',
    '&.Mui-selected.haveData,&.Mui-selected.haveData:hover': {
      backgroundColor: 'rgba(41, 150, 243, .3)'
    },
    '&:hover, &.Mui-selected,&.Mui-selected:hover': {
      backgroundColor: theme.palette.default.light
    },
    '&::selection': { backgroundColor: 'transparent' }
  }
});
const useStyles = makeStyles(styles);

const EsaList = props => {
  const { options } = props;

  const classes = useStyles();


  const [selectedOptions, setSelect] = useState([]);
  const isSelected = value => selectedOptions.includes(value);

  const handleSelect = value => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelect(newSelectedOptions);
  };

  return (
    <Portlet>
      <PortletHeader className={classes.header}>
        <PortletLabel title="Title" />
        <PortletToolbar>
          <MoreVertIcon />
        </PortletToolbar>
      </PortletHeader>
      <PortletContent className={classes.portletContent} noPadding>
        <List>
          { options.map(
            option => (
              <ListItem
                key={option}
                className={classes.listItem}
                selected={isSelected(option)}
                onClick={() => handleSelect(option)}
              >
                <ListItemText primary={`item-${option}`} />
              </ListItem>
            )
          ) }
        </List>
      </PortletContent>
    </Portlet>
  )

};

EsaList.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
};

EsaList.defaultProps = {
  label: '',
  id: '',
  value: [],
  options: []
};

export default withStyles(styles)(EsaList);