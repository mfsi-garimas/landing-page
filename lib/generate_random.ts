const generateRandomId = (length = 12) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

export default generateRandomId