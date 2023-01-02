const notFound = (req, res) => {
    console.log('route not found middleware working...');
    res.status(404).send('Route does not exist')
}
export default notFound
