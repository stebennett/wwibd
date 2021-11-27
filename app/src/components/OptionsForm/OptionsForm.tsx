import React, { FC, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, FormGroup, ListGroup, Row, Table } from 'react-bootstrap';
import { Simulate } from '../../simulate';
import ThroughputInput from '../ThroughputInput/ThroughputInput';

interface OptionsFormProps {
    updateSimulationResults: any,
    updateSimulationState: any,
}

const OptionsForm: FC<OptionsFormProps> = ({updateSimulationResults, updateSimulationState}) => {

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
      const [throughputValues, setThroughputValues] = useState(tp);
    
      const addThroughputValue = (tp: number) => {
        setThroughputValues((prevThroughputValues) => [
            ...prevThroughputValues,
            tp
          ]
        )
      }

      const [throughputPeriod, setThroughputPeriod] = useState(7);

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          updateSimulationState('RUNNING');
          let results = Simulate(500, new Date(startDate), outstandingTasks.min, outstandingTasks.max, throughputValues, throughputPeriod);
          updateSimulationResults(results);
          updateSimulationState('COMPLETE');
      }


  return (
      <div>
          <h2>Simulation Options</h2>
          <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                  <div className="colspan-2">
                    <label>
                        <span>Start Date</span>
                        <input type="date" onChange={ e => setStartDate(e.target.value) }/>
                    </label>
                  </div>
                  <div className="colspan-2">
                      <p>Number of Outstanding Tasks</p>
                  </div>
                  <div>
                      <label>
                          <span>Min</span>
                          <input type="number" onChange={ e => updateMinOutstandingTasks(parseInt(e.target.value)) }/>
                      </label>
                  </div>
                  <div>
                      <label>
                          <span>Max</span>
                          <input type="number" onChange={ e => updateMaxOutstandingTasks(parseInt(e.target.value)) }/>
                      </label>
                  </div>
                  <div className="colspan-2">
                      <label>
                          <span>Throughput Measurement Period</span>
                          <select onChange={ e => setThroughputPeriod(parseInt(e.target.value)) }>
                            <option value="7">7 days</option>
                            <option value="14">14 days</option>
                            <option value="21">21 days</option>
                            <option value="28">28 days</option>
                          </select>
                      </label>
                  </div>
                  <div className="colspan-2">
                    <ThroughputInput addThroughputValue={addThroughputValue} throughputValues={throughputValues}></ThroughputInput>
                  </div>
                  <div className="colspan-2">
                      <button type="submit">Simulate</button>
                  </div>
                </div>
            </form>
      </div>
  );
}

export default OptionsForm;
