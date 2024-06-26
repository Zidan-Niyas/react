import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  // ref hook
  const passRef = useRef(null);

  // useCallback() method is used for optimization, caching of values take place. passGenerator() can be made without useCallback as well.
  const passGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_+{}[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPass(password);

  }, [length, numAllowed, charAllowed, setPass]);
  

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(pass)
   },[pass])

  // useEffect changes the password if any of the given dependencies changes
  useEffect(() => {
    passGenerator();
   }, [length, numAllowed, charAllowed, passGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md px-4 my-8 py-3 bg-gray-800 rounded-lg'>
          <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            readOnly
            type="text"
            value={pass}
            placeholder='Password'
            className='outline-none w-full px-3 py-1'
            ref={passRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2 text-orange-500'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: { length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              className='cursor-pointer'
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              className='cursor-pointer'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
