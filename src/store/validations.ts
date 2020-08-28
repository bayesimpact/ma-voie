// Regex from https://stackoverflow.com/a/1373724/4482064
const emailRegexp = new RegExp(
  '^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)' +
  '*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$')


// Returns true for a string containing a valid email. false otherwise.
function validateEmail(value?: string): value is string {
  return !!value && emailRegexp.test(value)
}

export {validateEmail}
