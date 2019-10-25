import React  from 'react';
import CalculatorInput from './components/CalculatorInput'
import SubmitButton from './components/SubmitButton'
import './App.css';

class App extends React.Component {
  state = {
    input: ''
  }

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render () {
    return (
      <div className="App">
        <CalculatorInput
          onInputChange={this.handleInputChange}
        />
        <div className="submit-btn-wrapper">
          <SubmitButton />
        </div>
      </div>
    )
  }
}

export default App;
