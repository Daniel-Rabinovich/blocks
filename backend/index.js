// *********************
// imports
// *********************
const cors = require('cors')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const { query } = require('./db.js')


const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json()) // parse json requests
const secret = 'k3J30Vwb0XVjFq7bsNCPNk3J30Vwb0Xhdsa2M2TrVgjSRQoqNyXALwfgsIvt'

// *********************
// middleware
// *********************

// check if token is valid
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]

    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return res.status(400).json({ "error": "invalid token"})
        }
        req.username = decoded.username
        req.token = token
        next()
    })
}


// *********************
// API
// *********************

// default api gateway
app.get('/api', async (_, res) => {
    return res.status(200).json({ "message": "API working"})
})

app.get('/api/blocks/:id', validateToken, async(req, res) => {
    const stmt=`
        SELECT id,username,data,to_char(date, 'YYYY-MM-DD') as date
        FROM blocks
        WHERE id=$1
        AND username=$2
    `
    try {
        const result = (await query(stmt, [req.params.id, req.username]))[0]
        return res.status(200).json({
            ...result
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            'error': e
        })
    }
})


app.put('/api/blocks/:id', validateToken, async(req, res) => {

    const { data } = req.body

    const stmt=`
        UPDATE blocks
        SET data=$1
        WHERE username=$2
        AND id=$3
        RETURNING id,username,data,to_char(date, 'YYYY-MM-DD') as date
    `
    try {

        const updatedBlock = await query(stmt, [data, req.username, req.params.id])
        return res.status(200).json({
            'message': 'Block updated',
            'block': updatedBlock[0]
        })

    } catch (e) {
        console.log(e)
        return res.status(400).json({
            'error': e
        })
    }
})

app.delete('/api/blocks/:id', validateToken, async(req, res) => {
    const stmt=`
        DELETE FROM blocks
        WHERE id=$1
        AND username=$2
    `
    try{
        await query(stmt, [req.params.id, req.username])
        return res.status(200).json({
            'message': 'Block deleted'
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            'error': e
        })
    }
})


app.get('/api/blocks', validateToken, async(req, res) => {
    
    const stmt =`
        SELECT id,username,data,to_char(date, 'YYYY-MM-DD') as date
        FROM blocks
        WHERE username=$1
        ORDER BY id DESC
    `
    try {
        const result = await query(stmt, [req.username])
        return res.status(200).json({
            'blocks': result
        })
    } catch (e) {
        return res.status(400).json({
            'error': e
        })
    }
})


app.post('/api/blocks', validateToken, async(req, res) => {
    // list of allowed blocks
    const { data } = req.body
    
    // check fields
    if (!data){
        return res.status(400).json({
            'error': 'missing block data'
        })
    } else {
        const stmt =`
            INSERT INTO blocks(username,data)
            VALUES ($1,$2)
            RETURNING id,username,data,to_char(date, 'YYYY-MM-DD') as date
        `
        try {
            const result = await query(stmt,[req.username, data])
            return res.status(200).json({
                'message': 'block added',
                'block': result[0]
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                'error': e
            })
        } 
    }
})


// handle generating users if new username
// and handle login if user exists
app.post('/api/auth/login', async (req, res) => {

    // get username and password from req
    const { username, password } = req.body

    // token expiration
    const expire = { expiresIn: '1h'}

    // check if user failed to include username and password
    if(!username || !password) {
        return res.status(400).json({
            "error": "username or password field is missing"
        })
    }

    // get username password from db
    const stmt = `
        SELECT username, password
        FROM users
        WHERE username = $1
        `
    const result = await query(stmt, [username])

    const isRegistred = result.length > 0
    const passwordFromDB = isRegistred && result[0]["password"]
    const hashedPassword = await bcrypt.hash(password, 11)
    const isMatch = (passwordFromDB 
        && await bcrypt.compare(password, passwordFromDB))

    if (!isRegistred) {
        // user is not registred
        // and typed username and password to register
        const stmt = `
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            `
        await query(stmt, [username, hashedPassword])

        const token = jwt.sign({ username }, secret, expire)

        // response with signed token
        return res.status(200).json({
            token,
            username,
            "message": "Registred successfully"
        })

    } else if (isRegistred && isMatch) {
        // user is registred and typed correct password

        const token = jwt.sign({ username }, secret, expire)

        // responde with signed token
        return res.status(200).json({
            token,
            username,
            "message": "Logged in successfully"
        })
    } else if (isRegistred && !isMatch) {
        // user registred and typed wrong password
        return res.status(400).json({
            "error": "password incorrect"
        })
    } else {
        // how did you get here?
        return res.status(400).json({
            "error": "something went wrong"
        })
    }
})


// *********************
// RUN
// *********************
app.listen(3000, ()=> {
    console.log("Server started...")
})

