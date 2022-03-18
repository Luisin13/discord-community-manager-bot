//Simple Sleep function for the bot

/**
 * @param {Number} ms
 */
module.exports = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
