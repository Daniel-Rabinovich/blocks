import Markdown from 'marked-react'

const Explain = () => {

    const codeBlock = `
     \`\`\`
     const sum = (a, b) => a + b
     \`\`\`
    `

    const listBlock =`
    * item
      * nested item
    * item
    `

    const linkBlock = `
    [This is a link to google.com](https://google.com)
    `

    const imageBlock = `
    ![image](https://mcdn.wallpapersafari.com/medium/76/40/y8cICe.jpg)
    `

    const tableBlock = `
    | First name | Last name | age |
    | ---------  | --------- | --- |
    | John       | Doe       | 35  |

    `

    const textBlock = `
    # Header h1
    ## Header h2
    ### Header h3
    **Bold text**
    `

    const quoteBlock =`
    > This is a quote
    `
    return (
        <>
            <div className='block'>
                <h1>Create blocks using markdown</h1>
                <p>Use <b>GitHub Flavored Markdown</b> to create blocks of encrypted data</p>
                <h2>Code blocks</h2>
                <Markdown gfm='true'>{codeBlock}</Markdown>
                <h2>Lists</h2>
                <Markdown gfm='true'>{listBlock}</Markdown>
                <h2>Links</h2>
                <Markdown gfm='true'>{linkBlock}</Markdown>
                <h2>Images</h2>
                <Markdown gfm='true'>{imageBlock}</Markdown>
                <h2>Tables</h2>
                <Markdown gfm='true'>{tableBlock}</Markdown>
                <h2>Text</h2>
                <Markdown gfm='true'>{textBlock}</Markdown>
                <h2>Quotes</h2>
                <Markdown gfm='true'>{quoteBlock}</Markdown>
            </div>
        </>
    )
}

export default Explain
