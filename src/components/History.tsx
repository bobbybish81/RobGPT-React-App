import React from 'react';
import { BiComment, BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { IChatHistory } from '../interfaces/IChatHistory';
import '../styles/History.css';

interface HistoryProps {
  chatHistory: IChatHistory[],
  newChat: () => void,
  displayPreviousChat: (title : string) => void,
  deleteChat: (title : string) => void,
  deleteChatHistory: () => void,
}

const History = ({ chatHistory, newChat, displayPreviousChat, deleteChat, deleteChatHistory } : HistoryProps) => {

  const chatTitles = Array.from(new Set(chatHistory.map(chat => chat.chatTitle)));

  return (
    <section className='history-section'>
      <article className='history-article'>
        <button onClick={newChat}>+ New Chat</button>
        <div className='history-header'>
          <h4>History</h4>
          {chatHistory?.length > 0 ?
            <div onClick={deleteChatHistory}>
              <h6>Delete History</h6><BiTrash/>
            </div> :
          null}
        </div>
        <ul className='history-list'>
          {chatTitles.length > 0 ? chatTitles?.map((title, index) => (
            <li key={index}>
              <BiComment className='dropdown-comment-icon'/>
              <p
                className='dropdown-history-text'
                onClick={()=> displayPreviousChat(title)}>{title}</p>
              <BiTrash
                className='dropdown-trash-icon'
                onClick={()=> deleteChat(title)}/>
            </li>
          )) : null}
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