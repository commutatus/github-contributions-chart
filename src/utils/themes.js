import { themes } from "github-contributions-canvas";

const customThemes = {
  commutatus: {
    background: "#101217",
    text: "#FFFFFF",
    meta: "#FFFFFF",
    grade4: "#27D545",
    grade3: "#10983D",
    grade2: "#00602D",
    grade1: "#003820",
    grade0: "#202731"
  }
}

const finalThemeObj = {
  ...themes,
  ...customThemes
};

export default finalThemeObj;