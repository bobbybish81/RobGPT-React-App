import React from 'react';
import { BiComment } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import IChatHistory from '../interfaces/IChatHistory';
import '../styles/History.css';

interface HistoryProps {
  chatHistory: IChatHistory[],
  newChat: () => void,
  changeCurrentChat: (title : string) => void,
}

const History = ({ chatHistory, newChat, changeCurrentChat } : HistoryProps) => {

  const chatTitles = Array.from(new Set(chatHistory.map(chat => chat.chatTitle)));

  return (
    <section className='history-section'>
      <article className='history-article'>
        <button onClick={newChat}>+ New Chat</button>
        <h4>History</h4>
        <ul className='history-list'>
          {chatTitles?.map((title, index) => (
            <li
              key={index}
              onClick={()=> changeCurrentChat(title)}>
              <BiComment className='comment-icon'/>
              {title}
            </li>
          ))}
        </ul>
      </article>
      <footer className='history-footer'>
        <p>Website developed by Robert Bish</p>
        <Link
          className='portfolio-link'
          to='https://robertbishwebdeveloper.com'
          target='_blank'
          rel='noreferrer'>
          <b>robertbishwebdeveloper.com</b>
        </Link>
      </footer>
    </section>
  )
}

export default History