import './Methods.css'

export default function AddFruit(){
    return(
        <div className='methodPlace'>
            Add fruit
            <div>
                <input type="text" id="price" name="price" placeholder="Name of the fruit" />
            </div>

            <button>Add</button>
        </div>
    )
}