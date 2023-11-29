import { Inter } from 'next/font/google'
import { useCallback, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  // Get images from API using the POST method
  async function getImage(prompt: string) {
    let getReq = await fetch("/api/get-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt
      })
    })
    let res = await getReq.json();
    setResponse(res.data);
  }

  const handleSubmitPrompt = useCallback(async () => {
    await getImage(prompt);
  }, [prompt])


  return (
    <>
      <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} />

      <button onClick={() => handleSubmitPrompt()}>Send prompt</button>

      <br/>
      {
        response.map(r => <img src={r} height={500} width={500} />)
      }

      <hr/>
      <input type='text' name='attribute_prompt' />
      <button onClick={() =>{}}>Generate attributes</button>
    </>
  )
}
