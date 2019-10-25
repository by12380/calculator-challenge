export default function calculate (inputString) {
  const delimiter = ','

  const inputValues = inputString.split(delimiter)

  const mappedValues = inputValues.map(value => {
    // Trim white spaces
    value = value.trim()

    // Check if value is empty
    const isEmpty = value.length === 0

    // Check if value is a valid integer
    const validInteger = /^-?\d+$/.test(value)

    const valid = !isEmpty && validInteger
    return valid ? parseInt(value) : 0
  })

  // Cannot have more than two numbers
  if (mappedValues.length > 2) {
    throw Error('More than two numbers provided.')
  }

  // Return sum of all numbers
  return mappedValues.reduce((sum, value) => {
    return sum += value
  }, 0)
}