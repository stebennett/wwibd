import OptionsForm from '../OptionsForm/OptionsForm';
import CalculationsOutput from '../CalculationsOutput/CalculationsOutput';
import { useState } from 'react';
import { SimulationResult } from '../../simulate';
import { Col, Container, Row } from 'react-bootstrap';

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
    <Container className="App">
      <Row>
        <Col><OptionsForm updateSimulationResults={setSimulationResults} updateSimulationState={setSimulationState} /></Col>
        <Col><CalculationsOutput simulationResults={simulationResults} simulationState={simulationState}/></Col>
      </Row>
    </Container>
  )
}

export default App;
