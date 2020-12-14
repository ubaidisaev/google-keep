import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { amber, red } from "@material-ui/core/colors";

const fontFamilyRoboto = {
  fontFamily: [
    "Roboto",
    "Arial",
    "sans-serif"
  ].join(","),
};

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    notePaletteColors: {
      borderColor?: string;
      firstIconBorderColor?: string;
      checkMarkColor: string;
      noteBackground: {
        [key: string]: string;
      };
    };
    note: {
      labelColor: string;
    }
  }
  interface ThemeOptions {
    notePaletteColors: {
      borderColor?: string;
      firstIconBorderColor?: string;
      checkMarkColor: string;
      noteBackground: {
        [key: string]: string;
      };
    };
    note: {
      labelColor: string;
    }
  }
}

const lightMuiTheme = createMuiTheme({
  notePaletteColors: {
    borderColor: "rgba(0,0,0,0.87)",
    firstIconBorderColor: '#e0e0e0',
    checkMarkColor: 'rgba(0,0,0,0.4)',
    noteBackground: {
      default: "#fff",
      red: "#f28b82",
      orange: "#fbbc04",
      yellow: "#fff475",

      green: "#ccff90",
      cyan: "#fdcfe8",
      lightblue: "#cbf0f8",
      darkblue: "#aecbfa",

      purple: "#d7aefb",
      pink: "#fdcfe8",
      brown: "#e6c9a8",
      grey: "#e8eaed"
    },
  },
  note: {
    labelColor: '#3c4043'
  },
  palette: {
    type: "light",
    primary: {
      main: "#FFF",
    },
    secondary: {
      main: amber[500],
      light: "#feefc3",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#FFF",
      paper: "#F1F3F4",
    },
  },
  typography: {
    ...fontFamilyRoboto,
    overline: {
      fontWeight: 500,
      fontSize: "0.7rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

const darkMuiTheme = createMuiTheme({
  notePaletteColors: {
    borderColor: 'rgba(255,255,255,0.87)',
    firstIconBorderColor: '#5f6368',
    checkMarkColor: 'rgb(154, 160, 166)',
    noteBackground: {
      default: "#0000",
      red: "#5C2B29",
      orange: "#614A19",
      yellow: "#635D18",
      green: "#345920",
      cyan: "#16504B",
      lightblue: "#2D555E",
      darkblue: "#1E3A5F",
      purple: "#42275E",
      pink: "#5B2245",
      brown: "#442F19",
      grey: "#3C3F43",
    },
  },
  note: {
    labelColor: '#e8eaed'
  },
  palette: {
    type: "dark",
    primary: {
      main: "#202124",
    },
    secondary: {
      main: amber[500],
      light: "#41331C",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#202124",
      paper: "#535456",
    },
    text: {
      primary: "#E8EAED",
      secondary: "#FFFFFFDE",
    },
  },
  typography: {
    ...fontFamilyRoboto,
    overline: {
      fontWeight: 500,
      fontSize: "0.7rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },

  overrides: {
    MuiListItemText: {
      primary: {
        ...fontFamilyRoboto,
        fontWeight: 500,
        fontSize: "0.87rem",
      },
    },
  },
});

export const light = responsiveFontSizes(lightMuiTheme);
export const dark = responsiveFontSizes(darkMuiTheme);
