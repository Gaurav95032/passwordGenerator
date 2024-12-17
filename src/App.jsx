import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charactersAllowed, setCharctersAllowed] = useState(false)
  const [password, setPassword] = useState("")

  var generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz"
    if (numberAllowed) {
      str = str + "0123456789"
    } 
    if (charactersAllowed) {
      str = str +"!@#$%^&*"
    }
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length +1)
       pass = pass  +  str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charactersAllowed, setPassword])

  const passwordref = useRef(null)

  let copyPassword = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    generatePassword()
  },[generatePassword,setPassword,numberAllowed,charactersAllowed,length])

  
  return (
    <>
      <div className='relative h-screen w-full bg-black'>
            <div className='relative flex flex-col justify-between p-4 h-[40%] w-[80%] bg-gray-600 rounded-xl left-[10%] top-[40%] '>
              <h1
                className='text-3xl text-w font-bold text-center  '
              >Password Generator</h1>
              <div className='relative'>
                    <input type="text" 
                    className='relative h-10  w-[80%] ml-9 rounded-full pl-3 '
                      value={password}
                      placeholder='password'
                      readOnly
                      ref={passwordref}
                    />
                    <button onClick={copyPassword} className='h-10 w-28 ml-3 bg-black text-white rounded-full '>copy</button>
              </div>
              <div className='relative flex flex-row justify-between'>
                <button
                className='relative bg-gray-400 py-1 px-5 rounded-full'
                  onClick={generatePassword}
                >Generate Next Password</button>
                <div className='relative'>
                  <input type="range"
                    min={8}
                    max={40}
                    value={length}
                    onChange={(e)=>{setLength(e.target.value)}}
                  /><label
                  className='relative text-2xl ml-3 p-2'>length : {length}</label>
                </div>
                <div className='relative'>
                  <input type="checkbox"
                    onChange={()=>{
                      setNumberAllowed((previous)=>!previous)
                    }}
                  /><label className='relative text-2xl ml-3 p-2'>Numbers</label>
                </div>
                <div className='relative'>
                  <input type="checkbox"
                    onChange={()=>{
                      setCharctersAllowed((previous)=>!previous)
                    }}
                  /><label className='relative text-2xl ml-3 p-2'>Characters</label>
                </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default App
