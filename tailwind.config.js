export const content = ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors:{
      red:{
        100: ''
      }
    }
  },
};
export const plugins = [];