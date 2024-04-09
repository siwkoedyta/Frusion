export default function AddFruit() {

  return (
    <div className='methodPlace'>
      <div className='titleMethod'>Add box</div>
      <div>
        <input id='nameBoxInput'
          placeholder="Name of the box"
        />
        <input
          placeholder="Weight of the box"
        />
      </div>
      <button className='buttonMethod' >Add</button>
    </div>
  );
}