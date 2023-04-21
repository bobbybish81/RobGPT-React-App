import React, { useState } from 'react';
import IChatHistory from '../interfaces/IChatHistory';
import DropDown from '../components/DropDown';
import '../styles/Header.css';

interface HeaderProps {
  chatHistory: IChatHistory[],
  newChat: () => void,
  changeCurrentChat: (title : string) => void,
}

const Header = ({ chatHistory, newChat, changeCurrentChat } : HeaderProps) => {

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
        changeCurrentChat={changeCurrentChat}/>
    </header>
  )
}

export default Header