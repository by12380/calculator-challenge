import calculate from './calculate'

describe('calculate', () => {
  test('Should return 0 if input string is empty', () => {
    expect(calculate('')).toBe(0)
  })

  test('Should return 0 if input contains non-integer for one input value', () => {
    expect(calculate('x123')).toBe(0)
    expect(calculate('12x34')).toBe(0)
    expect(calculate('123x')).toBe(0)
  })

  test('Should return the number for one numeric input value', () => {
    expect(calculate('0')).toBe(0)
    expect(calculate('20')).toBe(20)
    expect(calculate('-1')).toBe(-1)
  })

  test('Should return 0 when both contain invalid characters for two input values', () => {
    expect(calculate('x, y')).toBe(0)
    expect(calculate('2k, x6')).toBe(0)
  })

  test('Should return the number when only one is a number out of two input values', () => {
    expect(calculate('123, x')).toBe(123)
    expect(calculate('y, -123')).toBe(-123)
    expect(calculate('5, tytyt')).toBe(5)
  })

  test('Should return the sum of numbers when both inputs values are valid numbers', () => {
    expect(calculate('123, 321')).toBe(444)
    expect(calculate('-123, -321')).toBe(-444)
    expect(calculate('0, -123')).toBe(-123)
    expect(calculate('4, -3')).toBe(1)
    expect(calculate('1, 5000')).toBe(5001)
  })

  test('Should return 0 when all input values contain invalid characters', () => {
    expect(calculate('x, y, z, a, b')).toBe(0)
    expect(calculate('2k, x6, -3d, as3, da')).toBe(0)
  })

  test('Should return the number when only one is a number out of all input values', () => {
    expect(calculate('123, x, y, z')).toBe(123)
    expect(calculate('x, y, z, -123')).toBe(-123)
    expect(calculate('5, tytyt, asasa, -c3c3c')).toBe(5)
  })

  test('Should return correct sum when a mix of valid numbers and invalid input values', () => {
    expect(calculate('123, x, y, z')).toBe(123)
    expect(calculate('x, y, z, -123')).toBe(-123)
    expect(calculate('5, tytyt, asasa, -c3c3c')).toBe(5)
  })

  test('Should return the sum of numbers when all inputs values are numbers', () => {
    expect(calculate('123, 321, 111, 0')).toBe(555)
    expect(calculate('-123, -321, -111, 0')).toBe(-555)
    expect(calculate('0, 0, 0, 0, 0')).toBe(0)
    expect(calculate('4, -3, -4, 3')).toBe(0)
    expect(calculate('1, 5000, 10000')).toBe(15001)
  })
})