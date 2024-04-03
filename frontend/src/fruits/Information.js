import './Information.css'
import RecordList from './RecordList.js'

export default function Information(){
    return(
        <div className='information'>
            <div className='featuredField' id='featuredFieldTitleList'>Fruit</div>
            <RecordList/>
            <RecordList/>
            <RecordList/>
            <RecordList/>
            <RecordList/>
        </div>
    )
}