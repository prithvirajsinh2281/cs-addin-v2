import { createTheme } from "@mui/material/styles";

const spacing = 4;

const hx = {
  fontFamily: "'Segoe UI', sans-serif",
  fontStyle: "normal",
  fontWeight: "bold",
  color: "#02162A",
};

export default createTheme({
  spacing,
  breakpoints: {
    values: {
      xs: 0,
      // tp: 375, // tiny phones below here
      // ph: 414, // many iphones are this size
      sm: 380,
      // sm1: 600,
      // sm2: 700,
      md: 960,
      // md2: 1100,
      lg: 1280,
      // lg2: 1366,
      // lg3: 1440,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "'Segoe UI', sans-serif",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: "#E5EFFF !important",
            color: "#0C4EB5 !important",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: "normal",
          lineHeight: "24px",
          paddingTop: spacing,
          paddingBottom: spacing,
        },
      },
    },
    // MuiTreeItem: {
    //   styleOverrides: {
    //     label: {
    //       fontSize: 16,
    //       fontWeight: "normal",
    //       lineHeight: "24px",
    //       paddingTop: spacing,
    //       paddingBottom: spacing,
    //       paddingRight: spacing * 4,
    //     },
    //   },
    // },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
          paddingTop: spacing,
          paddingBottom: spacing,
          transform: "initial !important",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          marginBottom: spacing,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
        label: {
          "&.Mui-disabled": { color: "#d0d2d4" },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          paddingTop: spacing,
          paddingBottom: spacing,
          "&.Mui-checked": { color: "#16CDA3" },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          paddingTop: spacing,
          paddingBottom: spacing,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          fontSize: 16,
          fontWeight: "normal",
          lineHeight: "24px",
          paddingTop: spacing,
          paddingBottom: spacing,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& fieldset": {
            top: 0,
          },
          "& legend": {
            display: "none",
          },
          "&.Mui-disabled": { color: "inherit", cursor: "not-allowed" },
        },
        input: {
          "&.Mui-disabled": {
            textFillColor: "inherit",
            cursor: "not-allowed",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          marginRight: 0,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        // component: RouterLink,
      },
      styleOverrides: {
        root: {
          ...hx,
          fontWeight: "normal",
          color: "#0C4EB5 !important",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // LinkComponent: RouterLink,
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        colorDisabled: { color: "#d0d2d4" },
      },
    },
  },
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#0c4eb5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#16CDA3",
      contrastText: "#ffffff",
    },
    info: {
      main: "#676B72",
    },
    // heavy: {
    //   main: "#02162A",
    // },
    action: {
      disabledBackground: "#d0d2d4",
      disabled: "#3b3d3f",
    },
    // neutral: {
    //   main: "#676B72",
    // },
    warning: {
      main: "#F8B981",
    },
    error: {
      main: "#F34456",
      contrastText: "#ffffff",
    },
    // confidenceLow: { main: "#dc3545" },
    // confidenceMed: { main: "#ffc107" },
    // confidenceHigh: { main: "#29a645" },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: 14,
    h1: { ...hx, fontSize: 64, lineHeight: "78px" },
    h2: { ...hx, fontSize: 40, lineHeight: "49px" },
    h3: { ...hx, fontSize: 32, lineHeight: "39px" },
    h4: { ...hx, fontSize: 24, lineHeight: "29px" },
    h5: { ...hx, fontSize: 20, lineHeight: "24px" },
    h6: { ...hx, fontSize: 16, lineHeight: "22px" },
    body1: {
      fontFamily: "'Segoe UI', sans-serif",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 14,
      lineHeight: "19px",
      color: "#676B72",
    },
    body2: {
      fontFamily: "'Segoe UI', sans-serif",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: "19px",
      color: "#676B72",
    },
  },
  shape: {
    borderRadius: 4,
  },
});
