const cluster = require('cluster');
const {availableParallelism} = require('os');


const numCPUs = availableParallelism();
if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    require('./app'); // Import the app module to start the server in worker threads
    console.log(`Worker ${process.pid} started`);
}