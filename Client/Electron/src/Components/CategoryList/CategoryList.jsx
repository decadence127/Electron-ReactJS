import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse

} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CategoryList = ({ chipData, addCategory }) => {
  const [openList, setOpenList] = React.useState(false);
  const expandList = e => {
    setOpenList(!openList);
  }
  return (
    <List>
      <ListItemButton onClick={expandList}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Категории" />
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {chipData && chipData.map((value, index) => {
            return (
              <ListItemButton key={value.id} sx={{ pl: 4 }} onClick={addCategory(value.id)} >
                <ListItemText key={value.id} primary={`${value.category} (${value.taxPercentage}%)`} />
              </ListItemButton>
            )
          })}
        </List>
      </Collapse>
    </List>
  );
};

export default CategoryList;