import calculate from './calculate'

class CalculatorService {
  compute (input) {
    return calculate(input)
  }
}

export default CalculatorService