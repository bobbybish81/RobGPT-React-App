import React, { useState, useEffect } from 'react';
import { IChat, IChatHistory } from './interfaces/IChatHistory';
import IResponse from './interfaces/IResponse';
import Header from './components/Header';
import History from './components/History';
import Feed from './components/Feed';

const App = () => {

  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [currentChat, setCurrentChat] = useState<IChat[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);

  const resetMessages = () => {
    setMessage('');
    setResponse(null);
  }

  const newChat = () => {
    if (currentTitle) {
      const history = chatHistory?.filter(chat => chat.chatTitle !== currentTitle);
      history.push({
        chatTitle: currentTitle!,
        chat: currentChat!,
      })
      setChatHistory(history)
    }
    setCurrentTitle(null);
    setCurrentChat([]);
    resetMessages();
  }

  const deleteChat = (title : string) => {
    const history = chatHistory?.filter(chat => chat.chatTitle !== title);
    setChatHistory(history)
  }

  const deleteChatHistory = () => {
    console.log('jello')
    setChatHistory([]);
  }

  const displayPreviousChat = (title:string) => {
    setCurrentTitle(title);
    const previousChat = chatHistory?.filter(chat => chat.chatTitle === title);
    setCurrentChat(previousChat[0].chat);
  }

  useEffect(() => {
    const historyString = localStorage.getItem('ROBGPT_HISTORY');
    if (historyString) {
      const history = JSON.parse(historyString);
      setChatHistory(history);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ROBGPT_HISTORY', JSON.stringify(chatHistory));
  }, [chatHistory]);

  return (
    <>
      <Header
        chatHistory={chatHistory}
        newChat={newChat}
        displayPreviousChat={displayPreviousChat}
        deleteChat={deleteChat}
        deleteChatHistory={deleteChatHistory}/>
      <main>
        <History
          chatHistory={chatHistory}
          newChat={newChat}
          displayPreviousChat={displayPreviousChat}
          deleteChat={deleteChat}
          deleteChatHistory={deleteChatHistory}/>
        <Feed
          chatHistory={chatHistory}
          message={message}
          setMessage={setMessage}
          response={response}
          setResponse={setResponse}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          currentTitle={currentTitle}
          setCurrentTitle={setCurrentTitle}/>
      </main>
    </>
  );
}

export default App;