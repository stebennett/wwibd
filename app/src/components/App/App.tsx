import './App.css';
import OptionsForm from '../OptionsForm/OptionsForm';
import CalculationsOutput from '../CalculationsOutput/CalculationsOutput';
import { useState } from 'react';
import { SimulationResult } from '../../simulate';

function App() {

  const [simulationState, setSimulationState] = useState('DEFAULT');

  const [simulationResults, setSimulationResults] = useState({
    startDate: new Date(),
    outstandingTasks: {
      min: 0,
      max: 0
    },
    throughputValues: [] as number[],
    samples: 0,
    results: [] as SimulationResult[]
  })

  return (
    <div className="App">
      <OptionsForm updateSimulationResults={setSimulationResults} updateSimulationState={setSimulationState} />
      <CalculationsOutput simulationResults={simulationResults} simulationState={simulationState}/>
    </div>
  )
}

export default App;
