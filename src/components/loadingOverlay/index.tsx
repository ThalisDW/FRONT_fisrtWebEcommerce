import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Backdrop } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 500,
    color: '#999999',
  },
}));

interface ILoading {
    bool : boolean;
}

const LoadingOverlay = (props: ILoading) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props.bool}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
};

export default LoadingOverlay;