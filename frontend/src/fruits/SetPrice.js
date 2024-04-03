import './Methods.css'

export default function SetPrice(){
    return(
        <div className='methodPlace'>
            Set the price
            <div>
                <select id="fruit" name="fruit">
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                </select>
            </div>

            <div>
                <input type="text" id="price" name="price" placeholder="Price" />
            </div>

            <button>Set</button>
        </div>
    )
}