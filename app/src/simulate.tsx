interface OutstandingTasks {
    min: number,
    max: number,
}

interface SimulationResult {
    iterationNumber: number,
    startDate: Date,
    totalSize: number,
    iterationStats: IterationStats,
}

interface SimulationResults {
    startDate: Date,
    outstandingTasks: OutstandingTasks,
    throughputValues: number[],
    samples: number,
    results: SimulationResult[],
}

interface Iteration {
    weekStartDate: Date,
    weekEndDate: Date,
    throughput: number,
    tasksRemaining: number,
}

interface IterationStats {
    allTasksCompleteDate: Date,
    iterations: Iteration[],
}

const Simulate = (numberOfSamples: number, startDate: Date, minNumOutstandingTasks: number, maxNumberOutstandingTasks: number, throughputValues: number[]): SimulationResults => {

    const estimateBetween = (min: number, max: number) : number => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const pickRandomFromArray = (arr: number[]) : number => {
        return arr[estimateBetween(0, arr.length - 1)];
    }

    const addDays = (input: Date, days: number): Date => {
        let newDate = new Date(input.valueOf());
        newDate.setDate(input.getDate() + days);
        return newDate;
    }

    const buildIterationStats = (startDate: Date, totalSize: number, throughputValues: number[]): IterationStats => {
        var remainingTasks = totalSize;
        var weekStartDate = startDate;

        let iterations : Iteration[] = [];

        while(remainingTasks > 0) {
            let simulatedThroughputSize = pickRandomFromArray(throughputValues);
            let tasksRemainingAtEndOfIteration = remainingTasks - simulatedThroughputSize > 0 ? remainingTasks - simulatedThroughputSize : 0;
        
            let iteration: Iteration = {
                weekStartDate: weekStartDate,
                weekEndDate: addDays(weekStartDate, 6), // days
                throughput: simulatedThroughputSize,
                tasksRemaining: tasksRemainingAtEndOfIteration,  
            }

            // add it to the stack
            iterations.push(iteration);

            // set vars for next week
            remainingTasks = tasksRemainingAtEndOfIteration;    
            weekStartDate = addDays(weekStartDate, 7); // next week
        }

        return {
            allTasksCompleteDate: iterations[iterations.length - 1].weekEndDate,
            iterations: iterations,
        }
    }

    return {
        startDate: startDate,
        outstandingTasks: {
            min: minNumOutstandingTasks,
            max: maxNumberOutstandingTasks
        },
        throughputValues: throughputValues,
        samples: numberOfSamples,
        results: Array(numberOfSamples).fill({}).map((element, index) => {
            let totalSize = estimateBetween(minNumOutstandingTasks, maxNumberOutstandingTasks);
            return {
                    iterationNumber: index,
                    startDate: startDate,
                    totalSize: totalSize,
                    iterationStats: buildIterationStats(startDate, totalSize, throughputValues),
                }
        })
    }

}

export { Simulate };
export type { OutstandingTasks, SimulationResult, SimulationResults, Iteration, IterationStats };
