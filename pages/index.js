import Head from 'next/head';
import Image from 'next/image';
import helloGuruLogo from '../assets/logo.svg';
import { useState, useEffect } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Initialize the Crisp chat widget when the component mounts
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "129706f8-0e68-4f0b-86a5-1033040ecb14";

    const d = document;
    const s = d.createElement("script");

    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);

    const chatbox = document.createElement("div");
    chatbox.setAttribute("id", "crisp-chatbox");
    document.body.appendChild(chatbox);
  }, []);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    const handleSubmit = () => {
      // track email, and time of the subscription
      global.analytics.track('User Generated Post', 
      { userInput, 
      time: Date.now() 
      });
      };
    
    handleSubmit();
    
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-icon">
            <Image src={helloGuruLogo} alt="Logo" width="40px"/>
          </div>
          <div className="header-title">
            <h1>Magic Shopping Assistant</h1>
          </div>
          <div className="header-subtitle">
            <h2>Buy products on autopilot</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Type here the proucts you need to buy and click on Generate"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
            <div className="prompt-buttons">
              <div className="button-container">
                <a
                  className={isGenerating ? 'generate-button loading' : 'generate-button'}
                  onClick={callGenerateEndpoint}
                >
                  <div className="generate">
                  {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
                  </div>
                </a>
              <br />
          <a href="https://airtable.com/shrlNbMV1SdpmoPoB" target="_blank" className="subscribe-link">
            Subscribe for updates
          </a>
            </div>
            </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
  
};

export default Home;
