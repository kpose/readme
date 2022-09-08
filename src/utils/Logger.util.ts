/**
 * The logger basically allows use to log error
 * to the console in developement.
 * @param e Error
 */
const Logger = (e: Error) => {
  // don't log in production
  if (!__DEV__) {
    return;
  }
  // log error in developement
  console.log([e]);
};
// export Logger as module.
export default Logger;
