export default function SummaryList({ summaryTransactions }) {
    return (
        <div>
            {summaryTransactions.map(transaction => (
                <div key={transaction.fruitId} className='field summaryField' id={`summaryField-${transaction.fruitId}`}>
                    <div className='nameFruit'>{transaction.fruitName}</div>
                    <div className='transaction'>
                        <div className='parametersSummary'>
                            <div className='priceSummary'>
                                Price:
                                <div className='price'>{transaction.averagePrice.toFixed(2)}</div>
                                <div className='nominal'>zł</div>
                            </div>
                            <div className='boxesSummary'>
                                Boxes:
                                    {transaction.boxes.map((box,index) => (
                                        <div key={box.id} className='box'>{box.quantity} {box.name} {index !== transaction.boxes.length - 1 && ', '}</div>
                                    ))}
                            </div>
                        </div>
                        <div className='valueTransaction'>
                            <div className='weight'>{transaction.sumWeight.toFixed(2)}</div> kg
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
