import { Inter } from 'next/font/google'
import { useCallback, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("");
  const [dps, setDps] = useState("");
  const [dph, setDph] = useState("");
  const [aps, setAps] = useState("");
  const [dhe, setDhe] = useState("");
  const [response, setResponse] = useState([]);
  // Get images from API using the POST method
  async function getImage(prompt: string, size: string) {
    let getReq = await fetch("/api/get-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        size: size,
      })
    })
    let res = await getReq.json();
    setResponse(res.data);
  }

  async function getAttribute(dps: string, dph:string, aps:string, dhe:string) {
    let getReq = await fetch("/api/get-attributes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dps: dps,
        dph: dph, 
        aps: aps,
        dhe: dhe,
      })
    })
    let res = await getReq.json();
    setResponse(res.data);
  }

  const handleSubmitPrompt = useCallback(async () => {
    await getImage(prompt, size);
  }, [prompt, size])
  
  const handleSubmitAttribute = useCallback(async () => {
    await getAttribute(dps,dph, aps, dhe);
  }, [dps,dph, aps, dhe])

  return (
    <>
      <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <hr/>
      <input type='text' value={size} onChange={(e) => setSize(e.target.value)} />
      <hr/>
      <button onClick={() => handleSubmitPrompt()}>Send Prompt</button>

      <br/>
      {
        response.map(r => <img src={r} height={500} width={500} />)
      }

      <hr/>
      <input type='text' value={dps} onChange={(e) => setDps(e.target.value)} />
      <hr/>
      <input type='text' value={dph} onChange={(e) => setDph(e.target.value)} />
      <hr/>
      <input type='text' value={aps} onChange={(e) => setAps(e.target.value)} />
      <hr/>
      <input type='text' value={dhe} onChange={(e) => setDhe(e.target.value)} />
      <hr/>
      <button onClick={() => handleSubmitAttribute()}>Generate Attribute</button>
      <br/>
      {
        response.map(i => <p>i</p>)
      }

    </>
  )
}
