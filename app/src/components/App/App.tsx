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
    <div className="grid grid-cols-2 gap-4 App">
      <div><OptionsForm updateSimulationResults={setSimulationResults} updateSimulationState={setSimulationState} /></div>
      <div><CalculationsOutput simulationResults={simulationResults} simulationState={simulationState}/></div>
    </div>
  )
}

export default App;
