import React  from 'react';
import CalculatorInput from './components/CalculatorInput'
import SubmitButton from './components/SubmitButton'

import CalculatorService from './services/calculator'

import './App.css';

class App extends React.Component {
  constructor () {
    super()
    this.calculatorService = new CalculatorService()
  }

  state = {
    input: '',
    result: null
  }

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = () => {
    const input = this.state.input
    const result = this.calculatorService.compute(input)
    this.setState({
      result
    })
  }

  render () {
    const result = this.state.result

    return (
      <div className="App">
        <CalculatorInput
          onInputChange={this.handleInputChange}
        />
        <div className="submit-btn-wrapper">
          <SubmitButton
            onClick={this.handleSubmit}
          />
        </div>
        <div className="output-container">
          {result !== null ? `Answer: ${result}` : ''}
        </div>
      </div>
    )
  }
}

export default App;
