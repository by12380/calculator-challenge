const MAX_VALUE = 1000

export default function calculate (inputString) {
  // Regex matching ',' or '\n'
  const delimiter = /,|\n/

  const inputValues = inputString.split(delimiter)

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