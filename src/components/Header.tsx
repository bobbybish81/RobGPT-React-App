import React, { useState } from 'react';
import { IChat, IChatHistory } from '../interfaces/IChatHistory';
import DropDown from '../components/DropDown';
import '../styles/Header.css';

interface HeaderProps {
  chatHistory: IChatHistory[],
  currentChat: IChat[],
  newChat: () => void,
  displayPreviousChat: (title : string) => void,
  deleteChat: (title : string) => void,
  deleteChatHistory: () => void,
}

const Header = ({
  chatHistory,
  currentChat,
  newChat,
  displayPreviousChat,
  deleteChat,
  deleteChatHistory } : HeaderProps) => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const [toggleText, setToggleText] = useState('Show History');

  const toggle = () => {
    setOpenDropdown(!openDropdown);
    toggleText === 'Show History' ? setToggleText('Hide History') : setToggleText('Show History')
  };

  return (
    <header className='header'>
      {currentChat?.length > 0 || chatHistory?.length > 0 ? <nav className='navbar'>
        {chatHistory?.length > 0 ? <button className='history-btn' onClick={toggle}>{toggleText}</button> : <div></div>}
        <button className='new-btn' onClick={newChat}>+ New Chat</button>
      </nav> : <h3>RobGPT</h3>}
      <DropDown
        chatHistory={chatHistory}
        openDropdown={openDropdown}
        displayPreviousChat={displayPreviousChat}
        deleteChat={deleteChat}
        deleteChatHistory={deleteChatHistory}
        toggle={toggle}/>
    </header>
  )
}

export default Header