import { useState } from 'react'


const CreateBlock = (props) => {

    const [text, setText] = useState('')

    const sendUpdatedBlock = (e) => {
        props.add(e,'text',text)
        setText('')
        props.setShow(false)
    }

    return (
        <>
        <div className='block'>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}>
            </textarea>
        </div>
        <div className='tooltip'>
            <div
                className='tooltipItem'
                onClick={(e) => sendUpdatedBlock(e) }>
                <span
                    class="material-symbols-outlined">
                    add
                </span>
                Create
            </div>
        </div>
        </>
    )
}

export default CreateBlock
