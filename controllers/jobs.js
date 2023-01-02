const getAllJobs = (req, res) => {
    res.send('You\'ve hit the getAllJobs controller')
}

const getJob = (req, res) => {
    res.send('You\'ve hit the getJob controller')
}

const createJob = (req, res) => {
    res.send('You\'ve hit the createJob controller')
}

const updateJob = (req, res) => {
    res.send('You\'ve hit the updateJob controller')
}

const deleteJob = (req, res) => {
    res.send('You\'ve hit the deleteJob controller')
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob }