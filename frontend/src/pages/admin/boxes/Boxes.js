
import BoxesList from './BoxesList'
import RemoveBox from './RemoveBox'
import AddBox from './AddBox'


export default function Boxes() {
  return (
    <div className='page'>
      <div className='mainContent' id='mainContentFruitBoxes'>
        <div>
            <div className='featuredField' id='featuredFieldTitleList'>Boxes</div>
            <BoxesList/>
        </div>
        <div>
            <AddBox/>
            <RemoveBox/>
        </div>
      </div>
    </div>
  );
}