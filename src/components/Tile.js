const Tile = ({value, row, col}) => {
    if (value === 0) {
        return null;
    }
    return (
        <div className={`tile tile-${value} tile-position-${row}-${col}`}>
            {value}
        </div>
    );
}

export default Tile;