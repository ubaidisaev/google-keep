import React from 'react';
import {Box, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';



const useStyles = makeStyles(theme => ({
  errorIcon: {
    paddingRight: theme.spacing(1),
  },
}));

interface Props {
  message: string;
  type: string;
}

const Message: React.FC<Props> = ({message, type}) => {
  const styles = useStyles();
  const color = type === 'success' ? 'red' : 'blue';
  return (
    <Box
      display="flex"
      alignItems="center"
      padding={1}
      border={`1px solid ${color}`}
      borderRadius={4}
      my={1}      
      color={color}
    >
      <ErrorOutlineIcon color="inherit" className={styles.errorIcon} />
      <Typography variant="caption" color="inherit">
        {message}
      </Typography>
    </Box>
  );
};


export default Message;
