import React, { FC, useState } from 'react';
import { Button, Col, FloatingLabel, Form, ListGroup, Row } from 'react-bootstrap';

interface ThroughputInputProps {
    addThroughputValue: any,
    throughputValues: number[]
}

const ThroughputInput:FC<ThroughputInputProps> = ({addThroughputValue, throughputValues}) => {

    const [userThroughputValue, setUserThroughputValue] = useState("");

    const handleAddThroughputValue = () => {
        addThroughputValue(parseInt(userThroughputValue));
        setUserThroughputValue("");
    }

    return (
        <Row>
            <p>Throughput</p> 
            <Col>
                <FloatingLabel controlId="throughputInput" label="Throughput">
                    <Form.Control type="number" value={ userThroughputValue } onChange={ e => setUserThroughputValue(e.target.value) }/>
                </FloatingLabel>
            </Col>
            <Col>
                <Button onClick={handleAddThroughputValue}>Add Value</Button>
            </Col>
            <Col>
                <ListGroup>
                    {throughputValues.map((item, index) => (
                        <ListGroup.Item key={ index }>{ item }</ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
    )
}

export default ThroughputInput;