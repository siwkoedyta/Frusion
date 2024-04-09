export default function TransactionList() {
    return (
        <div className='field' id='homeField'>
            <div className='parameters'>
                <div className='nameTransactionList'>Edyta Siwko</div>
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
                <div className='featuredField' id='featuredFieldValueTransaction'>
                    <div className='valueTransaction'>1024,50</div> zł
                </div>
        </div>
    )
}