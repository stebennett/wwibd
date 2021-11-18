import './App.css';
import OptionsForm from '../OptionsForm/OptionsForm';
import CalculationsOutput from '../CalculationsOutput/CalculationsOutput';
import { useState } from 'react';
import { maxHeaderSize } from 'http';

function App() {

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [outstandingTasks, setOutstandingTasks] = useState({
    min: 0,
    max: 0
  })

  const updateMinOutstandingTasks = (min: number) => {
    setOutstandingTasks({
      min: min,
      max: outstandingTasks.max
    })
  }

  const updateMaxOutstandingTasks = (max: number) => {
    setOutstandingTasks({
      min: outstandingTasks.min,
      max: max
    })
  }

  const tp: number[] = [];
  const [throughputValues, setThroughputValues] = useState(tp)

  const addThroughputValue = (tp: number) => {
    setThroughputValues((prevThroughputValues) => [
        ...prevThroughputValues,
        tp
      ]
    )
  }

  return (
    <div className="App">
      <OptionsForm 
        updateStartDate={setStartDate} 
        updateMinOutstandingTasks={updateMinOutstandingTasks} 
        updateMaxOutstandingTasks={updateMaxOutstandingTasks} 
        addThroughputValue={addThroughputValue} 
        throughputValues={throughputValues}
      />
      <CalculationsOutput startDate={startDate} outstandingTasks={outstandingTasks}></CalculationsOutput>
    </div>
  )
}

export default App;
