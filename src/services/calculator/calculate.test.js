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

  test('Should throw an error when more than two input values exists', () => {
    expect(() => calculate('1, 2, 3')).toThrow('More than two numbers provided.')
    expect(() => calculate(',,')).toThrow('More than two numbers provided.')
    expect(() => calculate('d1, 123, -23')).toThrow('More than two numbers provided.')
  })
})