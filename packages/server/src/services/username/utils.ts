export const sanitiseString = (str: string): string => {
  const noPunctuation = str.replace(/[.,/#!$%^&*;:{}=\-_`~()'"?<>[\]\\|]/g, "");
  const withHyphens = noPunctuation.replace(/\s+/g, "-");
  const lowerCase = withHyphens.toLowerCase();

  return lowerCase;
};
