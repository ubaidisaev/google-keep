import React, { useState, useRef } from "react";
import {
  makeStyles,
  useTheme,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  useMediaQuery,
  RootRef,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  AccountCircleOutlined as AccountIcon,
  Brightness4 as ThemeSwitchIcon
} from "@material-ui/icons";



import Profile from "./Profile";
import SearchBar from "./SearchBar";

import Logo from 'components/Logo';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  containerBorder: {
    borderBottomWidth: "1px",
  },
  menuButton: {
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(1),
    },
  },

  logo: {
    display: "none",
    height: theme.spacing(5.5),
    padding: theme.spacing(0, 1, 0, 0),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },


  themeColor: {
    background: theme.palette.secondary.light,
  },
}));



export default (props: any) => {
  const { switchTheme } = props;
  const { setNavBarOpen, isNavBarOpen } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [isSearchActive, setSearchActive] = useState(false);
  const [isProfilePopoverOpen, setProfilePopoverOpen] = React.useState<boolean>(
    false
  );

  const profileIconRef = useRef<HTMLButtonElement | null>(null);

  const popoverOpenHandler = (
    event?: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setProfilePopoverOpen(!isProfilePopoverOpen);
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          aria-label="open drawer"
          onClick={() => setNavBarOpen(!isNavBarOpen)}
        >
          <MenuIcon />
        </IconButton>
        {isMobile ? (
          isSearchActive ? (
            <SearchBar onSearchClose={() => setSearchActive(false)} />
          ) : (
            <Logo />
          )
        ) : (
          <>
            <Logo />
            <SearchBar />
          </>
        )}
        <div className={classes.grow}></div>
        {isMobile && !isSearchActive && (
          <IconButton onClick={() => setSearchActive(true)}>
            <SearchIcon />
          </IconButton>
        )}
        <IconButton onClick={switchTheme}>
          <ThemeSwitchIcon />
        </IconButton>
        <RootRef rootRef={profileIconRef}>
          <IconButton onClick={popoverOpenHandler}>
            <AccountIcon />
          </IconButton>
        </RootRef>
        <Profile
          popoverOpenHandler={popoverOpenHandler}
          anchorEl={profileIconRef.current}
          isOpen={isProfilePopoverOpen}
        />
      </Toolbar>
    </AppBar>
  );
};
