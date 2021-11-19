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

    const datesBetween = (startDate: Date, endDate: Date, increment: number) : Date[] => {
        var dates: Date[] = [];
        var currentDate = new Date(startDate.valueOf());

        while(currentDate <= endDate) {
            dates.push(new Date(currentDate.valueOf()))
            currentDate = addDays(currentDate, 7);
        }
        
        return dates;
    }

    const minEndingDate = (simulationResults: SimulationResult[]): Date => {
        return simulationResults.sort((thisResult: SimulationResult, otherResult: SimulationResult) : number => {
            return thisResult.iterationStats.allTasksCompleteDate.valueOf() - otherResult.iterationStats.allTasksCompleteDate.valueOf()
        })[0].iterationStats.allTasksCompleteDate
    }

    const maxEndingDate = (simulationResults: SimulationResult[]): Date => {
        return simulationResults.sort((thisResult: SimulationResult, otherResult: SimulationResult) : number => {
            return otherResult.iterationStats.allTasksCompleteDate.valueOf() - thisResult.iterationStats.allTasksCompleteDate.valueOf()
        })[0].iterationStats.allTasksCompleteDate   
    }

    const numberOfIterationsComplete = (simulationResults: SimulationResult[], compareToDate: Date): number => {
        return simulationResults.filter((result) => {
            return result.iterationStats.allTasksCompleteDate <= compareToDate
        }).length;
    }

    console.log(simulationResults);

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <th>Iteration End Date</th>
                    <th>Number of Iterations Complete</th>
                    <th>Likelihood</th>
                </thead>
                <tbody>
                    {datesBetween(minEndingDate(simulationResults.results), maxEndingDate(simulationResults.results), 7).map((date, index) => (
                        <tr key={ index }>
                            <td>{ date.toDateString() }</td>
                            <td>{ numberOfIterationsComplete(simulationResults.results, date) }</td>
                            <td>{ Math.round((numberOfIterationsComplete(simulationResults.results, date) / simulationResults.samples) * 100) }%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
        
}

export default SimulationResultsTable;