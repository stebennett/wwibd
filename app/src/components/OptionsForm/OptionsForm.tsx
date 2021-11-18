import React, { FC } from 'react';
import { Button, Col, Container, FloatingLabel, Form, FormGroup, ListGroup, Row, Table } from 'react-bootstrap';
import ThroughputInput from '../ThroughputInput/ThroughputInput';

import './OptionsForm.css';

interface OptionsFormProps {
    updateStartDate: any,
    updateMinOutstandingTasks: any,
    updateMaxOutstandingTasks: any,
    addThroughputValue: any,
    throughputValues: number[],
}

const OptionsForm: FC<OptionsFormProps> = ({updateStartDate, updateMinOutstandingTasks, updateMaxOutstandingTasks, addThroughputValue, throughputValues}) => {

  return (
      <Container>
        <Form>
            <Row>
                <FormGroup as={Col} controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" onChange={ e => updateStartDate(e.target.value) }/>
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
