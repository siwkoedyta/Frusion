export default function TransactionList({ clients, fruits, boxes, transactions }) {
    return (
        <div>
        {transactions.length === 0 ? (
          <div className="field transparent-field">
            No transactions available
          </div>
        ) : (
          transactions.map(transaction => (
                <div key={transaction.id} className='field homeField' id={`transaction-${transaction.id}`}>
                    <div className='parameters'>
                    <div className='nameTransactionList'>
                            {clients.find(client => client.id === transaction.clientId)?.firstName} {' '}
                            {clients.find(client => client.id === transaction.clientId)?.lastName}
                        </div>
                        <div className='weightPriceTransaction'>
                            <div className='weightTransaction'>{transaction.weightNet}</div>
                            <div>kg</div>
                            <div className='priceTransaction'>
                                <div className='multiplier'>x</div>
                                <div className='price'>{transaction.price}</div>
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
                            <div className='valueTransaction'>{transaction.amount}</div> zł
                        </div>
                        <div className="nameFruitTransaction">
                            {fruits.find(fruit => fruit.id === transaction.fruitId)?.name}
                        </div>
                    </div>
                </div>
                ))
            )}
        </div>
    );
}