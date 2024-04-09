export default function SummaryList() {
    return (
        <div className='field' id='summaryField'>
            <div className='nameFruit'>RASPBERRY</div>
            <div className='transaction'>
                <div className='parametersSummary'>
                    <div className='priceSummary'>
                        Price: 
                        <div className='price'>4,50</div> 
                        <div className='nominal'>zł</div>
                    </div>
                    <div className='boxesSummary'>
                        Boxes: 
                        <div className='box'>20</div>
                        <div className='typeBox'>SVZ</div>
                    </div>
                </div>
                <div className='valueTransaction'>
                    <div className='weight'>1024,50</div> kg
                </div>
            </div>
        </div>
    )
}