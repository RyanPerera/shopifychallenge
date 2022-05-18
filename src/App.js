import './App.css';
import { useState } from 'react';
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';

function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState('');
  const [data, setData] = useState({
    prompt: "Say something funny!",
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  const fetchData = () => {
    setLoading(true);
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAnswers(data)
        console.log(answers)
      })
      setLoading(false);
  }

  return (
    <div className="App">
      <div className='page'>
        <h1>Shopify Challenge</h1>
        <TextField id="outlined-basic" label="Enter Prompt" variant="outlined" multiline rows={4} fullWidth value={input} onChange={(e) => {
          setInput(e.target.value);
          setData({ ...data, prompt: e.target.value })
        }} />
        <LoadingButton onClick={fetchData} endIcon={<SendIcon />} loading={loading} loadingPosition="end" variant="contained" color="success" disableElevation>
          Send
        </LoadingButton>
        <h2>{JSON.stringify(data)}</h2>

      </div>
      <div className='responses'>
        {answers ? answers.choices.map(choice => (
          <li key={choice}>{choice.text}</li>
        )) : ""}
      </div>
    </div>
  );
}

export default App;
