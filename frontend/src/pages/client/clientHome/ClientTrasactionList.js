
export default function ClientTransactionList( { transactions, fruits, boxes } ) {
    return (
        <div className='field homeField'>
        <div className='parameters'>
            <div className='nameTransactionList'>raspberry</div>
            <div className='weightPriceTransaction'>
                <div className='weightTransaction'>52,60</div>
                <div>kg</div>
                <div className='priceTransaction'>
                    <div className='multiplier'>x</div>
                    <div className='price'>5</div>
                    <div>zł</div>
                </div>
            </div>
            <div className='boxesTransaction'>
                <div className='quantityBox'>3</div>
                <div>SVZ</div>
            </div>
        </div>
            <div className='featuredField featuredFieldValueTransaction'>
                <div className='valueTransaction'>1024,50</div> zł
            </div>
        </div>
    )
}



{/* <div className="inputGap">
{transactions.length === 0 ? (
<div className="field transparent-field">
    No transactions available
</div>
) : (
transactions.map(transaction => (
        <div key={transaction.id} className='field homeField' id={`transaction-${transaction.id}`}>
            <div className='parameters'>
            <div className='nameTransactionList'>
            {fruits.find(fruit => fruit.id === transaction.fruitId)?.name}
                </div>
                <div className='weightPriceTransaction'>
                    <div className='weightTransaction'>{transaction.weightNet.toFixed(2)}</div>
                    <div>kg</div>
                    <div className='priceTransaction'>
                        <div className='multiplier'>x</div>
                        <div className='price'>{transaction.price.toFixed(2)}</div>
                        <div>zł</div>
                    </div>
                </div>
                <div className='boxesTransaction'>
                    <div className='quantityBox'>{transaction.numberOfBoxes}</div>
                    <div>{boxes.find(box => box.id === transaction.boxId)?.name}</div>
                </div>
            </div>
            <div className="nameFruitValueTransaction">
                <div className='featuredField  featuredFieldValueTransaction' id={`featuredField-${transaction.id}`}>
                    <div className='valueTransaction'>{transaction.amount.toFixed(2)}</div> zł
                </div>

            </div>
        </div>
        ))
    )}
</div> */}