import Markdown from 'marked-react'
import { useState, useEffect, useRef } from 'react'

const Block = (props) => {

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(props.data)
    const [firstLoad, setFirstLoad] = useState(true)
    const [msg, setMsg] = useState('')
    const blockRef = useRef(null)

    const createDate = () => {
        const hour = String(new Date().getHours()).padStart(2, '0');
        const min = String(new Date().getMinutes()).padStart(2, '0');
        const sec = String(new Date().getSeconds()).padStart(2, '0');
        return `${hour}:${min}:${sec}`
    }

    useEffect(()=> {
        if(firstLoad) {
            setFirstLoad(false)
        } else {
            const timer = setTimeout(()=> {
                props.update(props.id, {data: text})
                setMsg(`Block updated at @${createDate()}`)
            }, 2000)
            return () => clearTimeout(timer)
        }
    },[text])

    return (
        <>
        <div className="block" ref={blockRef}>
            {!edit && <Markdown gfm={true}>{props.data}</Markdown>}

            {edit && <textarea
                defaultValue={props.data}
                onChange={(e) => setText(e.target.value)}
            ></textarea>}
            <div>{edit && msg}</div>
        </div>
        <div className='tooltip'>
            <div
                className='tooltipItem'
                onClick={() => {
                    setEdit(p => !p)
                    blockRef.current.scrollIntoView({behavior: 'smooth'})
                }}>
                <span
                    class="material-symbols-outlined">
                    {edit ? 'close' : 'edit'}
                </span>
                {edit ? 'Exit' : 'Edit'}
            </div>
            <div className='tooltipItem'>
                <span
                    class="material-symbols-outlined">
                    schedule
                </span>
                {props.date}
            </div>
            <div
                className='tooltipItem'
                onClick={() => props.delete(props.id)}>
                <span class="material-symbols-outlined">delete</span>
                Delete
            </div>
        </div>
        </>
    )
}

export default Block
