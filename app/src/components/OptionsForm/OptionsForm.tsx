import React, { FC, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, FormGroup, ListGroup, Row, Table } from 'react-bootstrap';
import { Simulate } from '../../simulate';
import ThroughputInput from '../ThroughputInput/ThroughputInput';

import './OptionsForm.css';

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
      const [throughputValues, setThroughputValues] = useState(tp)
    
      const addThroughputValue = (tp: number) => {
        setThroughputValues((prevThroughputValues) => [
            ...prevThroughputValues,
            tp
          ]
        )
      }

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          updateSimulationState('RUNNING');
          let results = Simulate(500, new Date(startDate), outstandingTasks.min, outstandingTasks.max, throughputValues);
          updateSimulationResults(results);
          updateSimulationState('COMPLETE');
      }


  return (
      <Container>
        <Form onSubmit={handleSubmit}>
            <Row>
                <FormGroup as={Col} controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" onChange={ e => setStartDate(e.target.value) }/>
                </FormGroup>
            </Row>
            <Row>
                <p>Number of Outstanding Tasks</p>
                <Col>
                    <FloatingLabel controlId="minNumOutstandingTasks" label="Min">
                        <Form.Control type="number" onChange={ e => updateMinOutstandingTasks(parseInt(e.target.value)) }></Form.Control>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="maxNumOutstandingTasks" label="Max">
                        <Form.Control type="number" onChange={ e => updateMaxOutstandingTasks(parseInt(e.target.value)) }></Form.Control>
                    </FloatingLabel>
                </Col>
            </Row>
            <ThroughputInput addThroughputValue={addThroughputValue} throughputValues={throughputValues}></ThroughputInput>
            <Row>
                <Col>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
      </Container>
  );
}

export default OptionsForm;
