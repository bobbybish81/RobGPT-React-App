import React from 'react';
import IChatHistory from '../interfaces/IChatHistory';
import { BiComment } from 'react-icons/bi';
import '../styles/DropDown.css';

interface DropDownProps {
  chatHistory: IChatHistory[],
  openDropdown: boolean,
  changeCurrentChat: (title : string) => void,
}

const DropDown = ({ chatHistory, openDropdown, changeCurrentChat } : DropDownProps) => {

  const chatTitles = Array.from(new Set(chatHistory.map(chat => chat.chatTitle)));

  const dropdownStyles = {
    Active: {
      height: 'auto',
      padding: '0.75rem 1rem'
    },
    Inactive: {
      height: '0',
      padding: '0'
    }
  }

  return (
    <section
      className='history-dropdown'
      style={openDropdown ? dropdownStyles.Active : dropdownStyles.Inactive}>
      <ul className='history-ul'
        style={{display: openDropdown ? 'block' : 'none'}}>
        {chatTitles?.map((title, index) => (
          <li
          key={index}
          onClick={()=> changeCurrentChat(title)}>
          <BiComment className='dropdown-comment-icon'/>
          {title}
        </li>
        ))}
      </ul>
    </section>
  )
}

export default DropDown