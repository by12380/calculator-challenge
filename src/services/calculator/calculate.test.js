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
  })

  test('Should return 0 when both contain invalid characters for two input values', () => {
    expect(calculate('x, y')).toBe(0)
    expect(calculate('2k, x6')).toBe(0)
  })

  test('Should return the number when only one is a number out of two input values', () => {
    expect(calculate('123, x')).toBe(123)
    expect(calculate('5, tytyt')).toBe(5)
  })

  test('Should return the sum of numbers when both inputs values are valid numbers', () => {
    expect(calculate('123, 321')).toBe(444)
    expect(calculate('1, 5000')).toBe(1)
  })

  test('Should return 0 when all input values contain invalid characters', () => {
    expect(calculate('x, y, z, a, b')).toBe(0)
    expect(calculate('2k, x6, -3d, as3, da')).toBe(0)
  })

  test('Should return the number when only one is a number out of all input values', () => {
    expect(calculate('123, x, y, z')).toBe(123)
    expect(calculate('5, tytyt, asasa, -c3c3c')).toBe(5)
  })

  test('Should return correct sum when a mix of valid numbers and invalid input values', () => {
    expect(calculate('123, x, y, z')).toBe(123)
    expect(calculate('5, tytyt, asasa, -c3c3c')).toBe(5)
  })

  test('Should return the sum of numbers when all inputs values are numbers', () => {
    expect(calculate('123, 321, 111, 0')).toBe(555)
    expect(calculate('0, 0, 0, 0, 0')).toBe(0)
    expect(calculate('1, 5000, 10000')).toBe(1)
  })

  test('Should return sum when two number is seperated by newline charater', () => {
    expect(calculate('0\n1')).toBe(1)
  })

  test('Should return the number when only one input value is number, seperated by newline charater', () => {
    expect(calculate('0\nx')).toBe(0)
    expect(calculate('y\n1')).toBe(1)
    expect(calculate('x\ny\n1')).toBe(1)
    expect(calculate('1\nx\ny')).toBe(1)
  })

  test('Should return correct sum when mixed with valid and non-valid input values, seperated by newline charater', () => {
    expect(calculate('0\nx\n1')).toBe(1)
    expect(calculate('y\n1\nx')).toBe(1)
    expect(calculate('5\nx\ny\n1')).toBe(6)
  })

  test('Should return correct sum when seperated by a mix of comma and newline charater', () => {
    expect(calculate('123, 321 \n 111, 0')).toBe(555)
    expect(calculate('0, 0, 0\n 0, 0')).toBe(0)
    expect(calculate('1, 5000\n10000')).toBe(1)
  })

  test('Should throw an error when negative numbers exist', () => {
    expect(() => calculate('1, 2 \n -1')).toThrow('-1')
    expect(() => calculate(',-20\n')).toThrow('-20')
    expect(() => calculate('-5, das, -23')).toThrow('-5,-23')
  })

  test('Should return correct sum when seperated by custom delimiter', () => {
    expect(calculate('//#\n123, 321 \n 111# 0')).toBe(555)
    expect(calculate('//!\n0, 0! 0\n 0, 0')).toBe(0)
    expect(calculate('//*\n1* 5000\n10000, 2')).toBe(3)
    expect(calculate('//.\n1.200\n300, 2')).toBe(503)
  })

  test('Should return correct sum when seperated by multi-char custom delimiter', () => {
    expect(calculate('//[#]\n123, 321 \n 111# 0')).toBe(555)
    expect(calculate('//[!!]\n0, 0!! 0\n 0, 0')).toBe(0)
    expect(calculate('//[***]\n1*** 5000\n10000, 2')).toBe(3)
    expect(calculate('//[.!*]\n1.!*200\n300, 2')).toBe(503)
  })
})