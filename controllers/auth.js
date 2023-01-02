const register = (req, res) => {
    res.end('You\'ve hit the register controller')
}

const login = (req, res) => {
    res.end('You\'ve hit the login controller')
}

export { register, login }