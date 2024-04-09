
export default function ClientsAdd() {

  return (
    <div className='methodPlace'>
      <div className='titleMethod'>Add client</div>
      <div>
        <input
          placeholder="First name"
        />
        <input
          placeholder="Last name"
        />
        <input
          placeholder="Email"
        />
        <input
          placeholder="Password"
        />
      </div>
      <button className='buttonMethod' >Add</button>
    </div>
  );
}