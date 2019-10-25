const MAX_VALUE = 1000
const CUSTOM_DELIMITER_REGEX = /^\/\/.\n/

export default function calculate (inputString) {
  // Regex matching ',' or '\n'
  let delimiters = [',', '\n']

  // Parse delimiter
  const hasCustomDelimiter = CUSTOM_DELIMITER_REGEX.test(inputString)
  if (hasCustomDelimiter) {
    const customDelimiterPattern = inputString.match(CUSTOM_DELIMITER_REGEX)[0]
    const customDelimiter =
      customDelimiterPattern.slice(2, -1)
      // Add custom delimiter to exisiting delimiters
      delimiters.push(customDelimiter)
      // Set inputString to contain the numbers part of the input
      inputString = inputString.slice(customDelimiterPattern.length)
  }

  // Escape delimiters reserved in regex syntax
  delimiters = delimiters.map(delimiter => {
    return escapeRegExp(delimiter)
  })

  const regexDelimiters = new RegExp(delimiters.join('|'))

  const inputValues = inputString.split(regexDelimiters)

  const mappedValues = inputValues.map(value => {
    // Trim white spaces
    value = value.trim()

    // Check if value is empty
    const isEmpty = value.length === 0

    // Check if value is a valid integer
    const validInteger = /^-?\d+$/.test(value)

    const valid = !isEmpty && validInteger

    // Return 0 if input value is invalid
    if (!valid) return 0

    const number = parseInt(value)

    // Return 0 if number is greater than 1000
    return number > MAX_VALUE ? 0 : number
  })

  const negativeNumbers = mappedValues.filter(value => {
    return value < 0
  })

  // Throw error if input values contain negative numbers
  if (negativeNumbers.length > 0) {
    // Include all negative numbers in error
    throw Error(negativeNumbers.join(','))
  }

  // Return sum of all numbers
  return mappedValues.reduce((sum, value) => {
    return sum += value
  }, 0)
}

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}