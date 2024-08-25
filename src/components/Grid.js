const Grid = () => {
    return (
        <div className="grid-container">
            {Array.from({length: 16}).map((_, index) => (
                <div key={index} className="grid-cell"></div>
            ))}
        </div>
    );
};

export default Grid;