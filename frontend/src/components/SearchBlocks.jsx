

const SearchBlocks = ({ search, setSearch }) => {

    return (
        <div className="block">
            <input
                type='text'
                placeholder='Search'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
        </div>
    )
}

export default SearchBlocks
