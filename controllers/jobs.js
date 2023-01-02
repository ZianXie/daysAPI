const getAllJobs = (req, res) => {
    res.send('You\'v hit the getAllJobs controller')
}

const getJob = (req, res) => {
    res.send('You\'v hit the getJob controller')
}

const createJob = (req, res) => {
    res.send('You\'v hit the createJob controller')
}

const updateJob = (req, res) => {
    res.send('You\'v hit the updateJob controller')
}

const deleteJob = (req, res) => {
    res.send('You\'v hit the deleteJob controller')
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob }