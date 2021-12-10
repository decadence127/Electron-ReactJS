import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Tooltip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect } from 'react';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));



const CategoryChipList = ({ selectedCategories, setSelectedCategories, chipData }) => {

  const handleDelete = (chipToDelete) => () => {
    console.log(selectedCategories);
    console.log(chipToDelete);
    setSelectedCategories((chips) => new Set([...chips].filter((chip) => chip !== chipToDelete)));
  }
  let intersection = chipData.filter((elem) => {
    return [...selectedCategories].indexOf(elem.id) > -1
  })

  useEffect(() => {
    console.log(chipData);
    console.log(intersection)
  }, [chipData])
  return (
    <>
      {chipData && intersection.map((data) => {
        let icon = <DoneIcon />;
        return (
          <Tooltip title={`${data.taxPercentage}%`}>
            <Chip
              sx={{ margin: 1 }}
              icon={icon}
              label={data.category}
              onDelete={handleDelete(data.id)}
              variant="outlined"
            />
          </Tooltip>
        );
      })}
    </>
  );
};

export default CategoryChipList;