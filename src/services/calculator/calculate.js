const MAX_VALUE = 1000
const CUSTOM_DELIMITER_SINGLE_CHAR_REGEX = /^\/\/.\n/
const CUSTOM_DELIMITER_MULTI_CHAR_REGEX = /^\/\/\[[^\]]*\]\n/
const MULTI_CUSTOM_DELIMITER_MULTI_CHAR_REGEX = /^\/\/(\[[^\]]*\])+\n/

export default function calculate (inputString) {
  // Regex matching ',' or '\n'
  let delimiters = [',', '\n']

  // Parse delimiter
  let parsedResult = null
  if (parseMultiCharMultiCustomDelimiter(inputString)) {
    parsedResult = parseMultiCharMultiCustomDelimiter(inputString)
  } else if (parseMultiCharCustomDelimiter(inputString)) {
    parsedResult = parseMultiCharCustomDelimiter(inputString)
  } else if (parseSingleCharCustomDelimiter(inputString)) {
    parsedResult = parseSingleCharCustomDelimiter(inputString)
  }

  if (parsedResult) {
    const {
      customDelimiters,
      numbers
    } = parsedResult

    // Add custom delimiters to existing ones
    delimiters = [...delimiters, ...customDelimiters]
    inputString = numbers
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

const parseSingleCharCustomDelimiter = (inputString) => {
  const customDelimiters = []
  let numbers = null
  const hasSingleCharCustomDelimiter = CUSTOM_DELIMITER_SINGLE_CHAR_REGEX.test(inputString)
  if (!hasSingleCharCustomDelimiter) return null

  const customDelimiterPattern = inputString.match(CUSTOM_DELIMITER_SINGLE_CHAR_REGEX)[0]
  const customDelimiter =
    customDelimiterPattern.slice(2, -1)
    // Collect custom delimiters
    customDelimiters.push(customDelimiter)
    // Set inputString to contain the numbers part of the input
    numbers = inputString.slice(customDelimiterPattern.length)

  return {
    customDelimiters,
    numbers
  }
}

const parseMultiCharCustomDelimiter = (inputString) => {
  const customDelimiters = []
  let numbers = null
  const hasMultiCharCustomDelimiter = CUSTOM_DELIMITER_MULTI_CHAR_REGEX.test(inputString)
  if (!hasMultiCharCustomDelimiter) return null

  const customDelimiterPattern = inputString.match(CUSTOM_DELIMITER_MULTI_CHAR_REGEX)[0]
  const customDelimiter =
    customDelimiterPattern.slice(3, -2)
    // Collect custom delimiters
    customDelimiters.push(customDelimiter)
    // Set inputString to contain the numbers part of the input
    numbers = inputString.slice(customDelimiterPattern.length)

  return {
    customDelimiters,
    numbers
  }
}

const parseMultiCharMultiCustomDelimiter = (inputString) => {
  let numbers = null
  const hasMultiCharCustomDelimiter = MULTI_CUSTOM_DELIMITER_MULTI_CHAR_REGEX.test(inputString)
  if (!hasMultiCharCustomDelimiter) return null

  const customDelimiterPattern = inputString.match(MULTI_CUSTOM_DELIMITER_MULTI_CHAR_REGEX)[0]
  let customDelimiters = customDelimiterPattern.slice(2, -1)    
  customDelimiters = customDelimiters.match(/\[[^\]]*\]/g).map(delimiter => {
    // Remove surrounding brakets
    return delimiter.slice(1,-1)
  })
  // Set inputString to contain the numbers part of the input
  numbers = inputString.slice(customDelimiterPattern.length)

  return {
    customDelimiters,
    numbers
  }
}