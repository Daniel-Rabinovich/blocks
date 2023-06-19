import { encrypt, decrypt } from './encryption'

//
// Block fetching logic here
//

const server = 'http://localhost:3000'

export const getBlocks = async (token, password) => {

    const result = await fetch(`${server}/api/blocks`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    const resultJson = await result.json()

    // decrypt data
    const decrypted = resultJson.blocks.reduce((l,b) => {
        l.push({...b, data: decrypt(b.data,password)})
        return l
    }, [])
    return decrypted

}

export const getBlockById =  async(token, password, id) => {

    const result = await fetch(`${server}/api/blocks/${id}`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    const resultJson = await result.json()
    const decResultJson = {
        ...resultJson,
        data: decrypt(resultJson.data, password)
    }
    return decResultJson

}

export const postBlock = async(token,password, block) => {

    block.data = encrypt(block.data, password)
    const result = await fetch(`${server}/api/blocks`, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(block)

    })
    const resultJson = await result.json()
    const decryptedBlock = {
        ...resultJson.block,
        data: decrypt(resultJson.block.data, password)
    }
    return decryptedBlock
}


export const deleteBlockById = async(token, id) => {

    const result = await fetch(`${server}/api/blocks/${id}`,{
        method: 'delete',
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    const resultJson = await result.json()
    return resultJson
}

export const updateBlock = async(token, password, id, block) => {

    block.data = encrypt(block.data, password)

    const result = await fetch(`${server}/api/blocks/${id}`, {
        method: 'put',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(block)
    })
    const resultJson = await result.json()
    const decryptedBlock = {
        ...resultJson.block,
        data: decrypt(resultJson.block.data, password)
    }
    return decryptedBlock
}
