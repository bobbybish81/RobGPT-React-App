import React, { useState } from 'react';
import { IChatHistory } from '../interfaces/IChatHistory';
import DropDown from '../components/DropDown';
import '../styles/Header.css';

interface HeaderProps {
  chatHistory: IChatHistory[],
  newChat: () => void,
  displayPreviousChat: (title : string) => void,
  deleteChat: (title : string) => void,
  deleteChatHistory: () => void,
}

const Header = ({ chatHistory, newChat, displayPreviousChat, deleteChat, deleteChatHistory } : HeaderProps) => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const [toggleText, setToggleText] = useState('Show History');

  const toggle = () => {
    setOpenDropdown(!openDropdown);
    toggleText === 'Show History' ? setToggleText('Hide History') : setToggleText('Show History')
  };

  return (
    <header className='header'>
      <nav className='navbar'>
        <button className='history-btn' onClick={toggle}>{toggleText}</button>
        <button className='new-btn' onClick={newChat}>+ New Chat</button>
      </nav>
      <DropDown
        chatHistory={chatHistory}
        openDropdown={openDropdown}
        displayPreviousChat={displayPreviousChat}
        deleteChat={deleteChat}
        deleteChatHistory={deleteChatHistory}/>
    </header>
  )
}

export default Header