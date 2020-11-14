import { theme as chakraTheme } from "@chakra-ui/core";

const fonts = {
  heading: `'Work Sans', sans-serif`,
  body: `'Work Sans', sans-serif`,
  mono: `'Work Sans', sans-serif`,
};

const breakpoints = ["40em", "52em", "64em"];

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: "#16161D",
    _purple: "#597EFF",
    _hoveredPurple: "#476FFF"
  },
  fonts,
  breakpoints,
};

export default theme;
