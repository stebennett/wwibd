import React, { FC } from 'react';
import { Container, Table } from 'react-bootstrap';
import { SimulationResult, SimulationResults } from '../../simulate';

interface SimulationResultsTableProps {
    simulationResults: SimulationResults
}

const SimulationResultsTable:FC<SimulationResultsTableProps> = ({simulationResults}) => {

    const addDays = (input: Date, days: number): Date => {
        let newDate = new Date(input.valueOf());
        newDate.setDate(input.getDate() + days);
        return newDate;
    }

    const sortByCompleteDate = (simulationResults: SimulationResult[]) : SimulationResult[] => {
        return [...simulationResults].sort((thisResult: SimulationResult, otherResult: SimulationResult) : number => {
            return thisResult.iterationStats.allTasksCompleteDate.valueOf() - otherResult.iterationStats.allTasksCompleteDate.valueOf()
        });
    }

    const percentile = (simulationResults: SimulationResult[], percent: number): SimulationResult => {
        var index = Math.ceil( percent / 100.0 * simulationResults.length);
        index = index < 0 ? 0 : index;
        return simulationResults[index - 1];
    }

    const percentiles = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
    const sortedSimulationResults : SimulationResult[] = sortByCompleteDate(simulationResults.results);

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <th>Likelihood</th>
                    <th>Date</th>
                </thead>
                <tbody>
                    {percentiles.map((p, index) => (
                        <tr key={ index }>
                            <td>{ p }%</td>
                            <td>{ percentile(sortedSimulationResults, p).iterationStats.allTasksCompleteDate.toDateString() }</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
        
}

export default SimulationResultsTable;