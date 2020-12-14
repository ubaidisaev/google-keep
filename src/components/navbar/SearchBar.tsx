import React, { useState } from "react";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  AccountCircleOutlined as AccountIcon,
} from "@material-ui/icons";
import {
  makeStyles,
  IconButton,
  InputBase,
  Box,
  AppBar,
  Toolbar,
  useTheme,
  ClickAwayListener,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchbarContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    height: theme.spacing(6),
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.spacing(90),
      marginLeft: theme.spacing(10),
    },
  },
  searchbarContainerActive: {
    backgroundColor: "#535456",
  },
  searchIcon: {
    width: theme.spacing(6),
    height: "100%",
    display: "inline-flex",
    padding: theme.spacing(0, 2),
  },
  inputSearch: {
    width: "100%",
    maxWidth: "100%",
  },
}));

const SearchBar:React.FC<{
 onSearchClose?: () => void
}> = ({onSearchClose}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [isFocused, setFocused] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setFocused(false)}>
      <Box
        className={classes.searchbarContainer}
        bgcolor={
          isFocused
            ? theme.palette.background.default
            : theme.palette.background.paper
        }
        boxShadow={isFocused ? 2 : 0}
      >
        <IconButton className={classes.searchIcon}>
          <SearchIcon />
        </IconButton>
        <InputBase
          onClick={() => setFocused(true)}
          placeholder="Search"
          className={classes.inputSearch}
        />
        {isFocused && (
          <IconButton onClick={onSearchClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
