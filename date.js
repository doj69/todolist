exports.getDate = () => {
  const options = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date();
  return today.toLocaleDateString("en-US", options);
};

exports.getCurrentYear = () => {
  const today = new Date();
  return today.getFullYear();
};
