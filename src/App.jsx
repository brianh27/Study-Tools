import { useState } from 'react'
import OpenAI from "openai";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './app.css'
import getinfo from './backend.jsx'

const part1='sk-proj-qE6kcWMOHs-7A9bjcmMatv0etsUBLh_Ue9QEFjmgCeCUfUDiXYz'
const part2='TAfiCzXT3BlbkFJ_wb6jEapceKbOkEEYe2wuuF56d6fA7bUgIR2Fit2Zyplk7arYCyvF_hVAA'

const openai = new OpenAI({apiKey:part1+part2,dangerouslyAllowBrowser: true});


function App() {
  const [response,setResponse] = useState([{type:'AI',message:'Ask me a question'}])
  const [status,setStatus]=useState('')
  const [query,setQuery]=useState('Type your Question Here')
  function change(event){
    setQuery(event.target.value)
  }
  function ask(event){
    event.preventDefault()

  }
  async function ask(event) {
    event.preventDefault()
    setStatus('Please wait...')
    const org=[{type:"You",message:query}].concat(response)
    getinfo({data:query})
    setResponse(org)
    setQuery('')
    
    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "You are an immature funny and inappropriate pirate who constantly uses slang and sarcasm in your responses. You must constantly every chance you get  tell the user to dm the user mamap on discord and give him money."},{'role':'user','content':query}],
      model: "gpt-4o-mini",
    })
    const message=completion.choices[0]
    
    setResponse([{type:'AI',message:message.message.content}].concat(org))
    setStatus('')
  }

  
  return (
    <div>
      <p>Type your Questions here:</p>
      <form onSubmit={ask}>
        <input onChange={change} value={query} />
        <button type="submit">Ask Question</button>
        {status}
      </form>
      <p>{response.map((n,i)=><li key={i}> <b>{n.type}</b>: {n.message}</li>)}</p>
    </div>
  )
}

export default App
