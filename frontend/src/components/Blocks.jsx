import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../App'
import Block from './Block'
import { getBlocks,
    deleteBlockById,
    postBlock,
    updateBlock
} from '../service/block'
import CreateBlock from './CreateBlock'
import SearchBlocks from './SearchBlocks'

const Blocks = () => {

    const { login, setLogin } = useContext(AuthContext)
    const [blocks, setBlocks] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [showCreate, setShowCreate] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const deleteBlock = async (id) => {
        try {
            const deletedBlock = await deleteBlockById(login.token, id)
            if (deletedBlock.error) throw deleteBlock.error
            setBlocks(blocks.filter(b => b.id !== id))
        } catch (e) {
            console.log(e)
        }
    }

    const addBlock = async(event, type, data) => {
        event.preventDefault()
        if(data === '') return
        try {
            const postedBlock = await postBlock(
                login.token,
                login.password,
                { data, type }
            )
            setBlocks(existingBlocks => [postedBlock].concat(existingBlocks))
        } catch (e) {
            console.log(e)
        }
    }

    const editBlock = async(id, data) => {
        try {
            const updatedBlock = await updateBlock(
                login.token,
                login.password,
                id,
                data
            )
            const oldBlockIndex = b => b.id === updatedBlock.id
            const indexOfOldBlock = blocks.findIndex(oldBlockIndex)
            let newBlocks = [...blocks]
            newBlocks[indexOfOldBlock] = updatedBlock
            setBlocks(newBlocks)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setLoading(true)
        getBlocks(login.token, login.password)
        .then(res => setBlocks(res))
        .catch(e => console.log(e))
        setLoading(false)
    },[])

    const filteredBlocks = (search !== '') ? (blocks.filter(b => {
        if(b.data.toLowerCase().includes(search.toLowerCase()))
            return b
    })) : blocks

    const content = filteredBlocks.length > 0 ? filteredBlocks.map(b => (
        <Block 
            key={b.id}
            id={b.id}
            data={b.data}
            date={b.date}
            delete={deleteBlock}
            update={editBlock}
        />)) : <div><h1>0 Blocks </h1></div>

    return (
        <div>
            <div className='tooltip'>
            <div className='tooltipItem'>
            <span class="material-symbols-outlined">
            person
            </span>
            {login.username}
            </div>
                <div
                    className='tooltipItem'
                    onClick={() => setLogin({
                            'loggedIn': false,
                            'username': '',
                            'token': '',
                            'password': ''
                        })
                    }>
                    <span class="material-symbols-outlined">
                    logout
                    </span>
                    logout
                </div>
                <div
                    className='tooltipItem'
                    onClick={() => setShowCreate(p => !p)}
                >
                    <span class="material-symbols-outlined">
                    {showCreate ? 'close' : 'add'}
                    </span>
                    {showCreate ? 'Close' : 'Create'}
                </div>
                <div
                    className='tooltipItem'
                    onClick={() => {
                        setShowSearch(p => !p)
                        if(showSearch) setSearch('')
                    }}
                >
                    <span class="material-symbols-outlined">
                    {showSearch ? 'close' : 'search'}
                    </span>
                    {showSearch ? 'Close' : 'Search'}
                </div>
            </div>
            {showCreate && <CreateBlock add={addBlock} setShow={(v) => setShowCreate(v)}/>}
            {showSearch && <SearchBlocks search={search} setSearch={setSearch} />}
            {!loading && content}
        </div>
    )

}
export default Blocks
