const unableToParseErrorMessage = "Unable to parse brandingColor.";

export const brandingColorParser = (brandingColor: any): string | string[] => {
  if (typeof brandingColor === "string") {
    if (brandingColor.match(/^#([0-9a-f]{3}){1,2}$/i)) {
      // Hex Color Code
      return brandingColor;
    } else {
      // TODO: Add support for Material Colors
      return [
        `${unableToParseErrorMessage} brandingColor does not appear to be a hex color code.`,
        "Support for Material Colors is coming soon. In the mean time, you can get the hex code of a material color at https://material.io/design/color/the-color-system.",
      ];
    }
  } else {
    return [unableToParseErrorMessage];
  }
};
