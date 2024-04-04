import './Methods.css'

export default function RemoveFruit(){
    return(
        <div className='methodPlace'>
            Remove fruit
            <div>
                <select id="fruit" name="fruit">
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                </select>
            </div>

            <button>Remove</button>
        </div>
    )
}