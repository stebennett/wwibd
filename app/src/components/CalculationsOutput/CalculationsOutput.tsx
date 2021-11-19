import React, { FC, useState } from 'react';
import { SimulationResults } from '../../simulate';
import SimulationResultsTable from '../SimulationResultsTable/SimulationResultsTable';

interface CalculationsOutputProps {
    simulationResults: SimulationResults,
    simulationState: string,
}

const CalculationsOutput:FC<CalculationsOutputProps> = ({simulationResults, simulationState}) => {


    return (
        <div>
            <h2>Simulation Results</h2>
            <p>{ simulationState }</p>
            { simulationState == 'COMPLETE' && <SimulationResultsTable simulationResults={simulationResults}/> }
        </div>
    )
        
}

export default CalculationsOutput;