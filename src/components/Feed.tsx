import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiLocationArrow1 } from 'react-icons/ci';
import { BsQuestionSquare } from 'react-icons/bs';
import { SiAnswer } from 'react-icons/si';
import IChatHistory from '../interfaces/IChatHistory';
import IResponse from '../interfaces/IResponse';
import '../styles/Feed.css';

interface FeedProps {
  chatHistory: IChatHistory[],
  setChatHistory: React.Dispatch<React.SetStateAction<IChatHistory[]>>,
  message: string,
  setMessage: (message : string) => void,
  response: IResponse | null,
  setResponse: (response : IResponse) => void,
  currentChat: string | null,
  setCurrentChat: (chatTitle : string) => void,
}

const Feed = ({
  chatHistory,
  setChatHistory,
  message,
  setMessage,
  response,
  setResponse,
  currentChat,
  setCurrentChat } : FeedProps) => {

  const current = chatHistory.filter(chat => chat.chatTitle === currentChat);

  const sendMessage = async (event:any) => {
    event.preventDefault();
    console.log(message)
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_APIKEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 100,
      })
    }
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', options);
      const data = await response.json();
      console.log(data)
      setResponse(data.choices[0].message);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    if (!currentChat && message && response) {
      setCurrentChat(message)
    }
    if (currentChat && message && response) {
      setChatHistory(
          [...chatHistory,
          {chatTitle: currentChat, role: 'user', content: message},
          {chatTitle: currentChat, role: response.role, content: response.content},
        ]
      )
    }
  }, [response, currentChat])

  return (
    <section className='feed-section'>
      {!currentChat && 
      <div className='feed-header'>
        <h1>RobGPT</h1>
        <p>To use RobGPT, you can simply start by asking a question or giving a prompt. RobGPT is a language model designed to understand and respond to a wide range of questions and prompts, so feel free to ask anything that comes to mind.</p>
        <div>Chat repsonses provded by platform.openai.com</div>
      </div>
      }
      <ul className='feed'>
        {chatHistory.map((chat, index) => 
          <li key={index}>
            {chat.role === 'user' ? 
            <span className='role'><BsQuestionSquare/></span> :
            <span className='role'><SiAnswer/></span>}
            <p className='content'>{chat.content}</p>
          </li>
        )}
      </ul>
      <section className='form-section'>
        <form
          className='form'
          onSubmit={sendMessage}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Send a message...'/>
            <button
              className='submit-btn'
              type='submit'>
                <CiLocationArrow1 className='arrow-icon'/>
            </button>
        </form>
        <footer className='footer'>
          <p className='footer-text'>ChatGPT Mar 23 Version. Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts.</p>
          <p className='footer-link'>Website developed by <Link
              to='https://robertbishwebdeveloper.com'
              target='_blank'
              rel='noreferrer'>
              <b style={{color: '#9fa0a3', fontWeight: '800'}}>Robert Bish</b>
            </Link>
          </p>
        </footer>
      </section>
    </section>
  )
}

export default Feed