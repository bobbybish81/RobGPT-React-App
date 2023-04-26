import React, { useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiLocationArrow1 } from 'react-icons/ci';
import { BsQuestionSquare } from 'react-icons/bs';
import { SiAnswer } from 'react-icons/si';
import { IChat, IChatHistory } from '../interfaces/IChatHistory';
import IResponse from '../interfaces/IResponse';
import '../styles/Feed.css';

interface FeedProps {
  chatHistory: IChatHistory[],
  message: string,
  setMessage: (message : string) => void,
  response: IResponse | null,
  setResponse: (response : IResponse) => void,
  currentChat: IChat[],
  setCurrentChat: React.Dispatch<React.SetStateAction<IChat[]>>,
  currentTitle: string | null,
  setCurrentTitle: (chatTitle : string) => void,
}

const Feed = ({
  chatHistory,
  message,
  setMessage,
  response,
  setResponse,
  currentChat,
  setCurrentChat,
  currentTitle,
  setCurrentTitle } : FeedProps) => {

  useLayoutEffect(() => {
    window.scrollTo(0,0)
  })

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      setResponse(data.choices[0].message);
      /* eslint-disable no-prototype-builtins */
      if (!currentTitle && !chatHistory.some(obj => obj.hasOwnProperty(message))) {
        setCurrentTitle(message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentTitle && message.length > 0 && response) {
      const newMessage = {
        clientRole: 'user',
        message: message,
        assistantRole: response?.role,
        response: response?.content
      }
      setCurrentChat(prevArray => [...prevArray, newMessage]);
      setMessage('');
    } 
  }, [response, currentTitle]);

  return (
    <section className='feed-section'>
      {!currentTitle && 
      <div className='feed-intro'>
        <h1>RobGPT</h1>
        <p>RobGPT is a language model designed to understand and respond to a wide range of questions and prompts, so feel free to ask anything that comes to mind in the message box below.</p>
        <div>Chat repsonses provded by platform.openai.com</div>
        <div className='bot-image-div'>
          <img
            src={require('../assets/botImage.webp')}
            alt='botimage to appear'
            className='bot-image'/>
        </div>
      </div>
      }
      <ul className='feed'>
      {currentChat?.map((chat, index) =>
        <li key={index}>
          <div className='message'>
            <span className='role'><BsQuestionSquare/></span>
            <p className='content'>{chat.message}</p>
          </div>
          <div className='response'>
            <span className='role'><SiAnswer/></span>
            <p className='content'>{chat.response}</p>
          </div>
        </li>)}
      </ul>
      <section className='form-section'>
        <form
          className='form'
          onSubmit={sendMessage}>
            <input
              type='text'
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