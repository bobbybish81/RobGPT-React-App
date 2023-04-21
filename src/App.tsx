import React, { useState } from 'react';
import IChatHistory from './interfaces/IChatHistory';
import IResponse from './interfaces/IResponse';
import Header from './components/Header';
import History from './components/History';
import Feed from './components/Feed';

const App = () => {

  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([]);
  const [message, setMessage] = useState<string>('')
  const [response, setResponse] = useState<IResponse | null>(null)
  const [currentChat, setCurrentChat] = useState<string | null>(null)

  const newChat = () => {
    setMessage('');
    setResponse(null);
    setCurrentChat(null)
  }

  const changeCurrentChat = (title:string) => {
    setCurrentChat(title)
  }

  return (
    <>
      <Header
        chatHistory={chatHistory}
        newChat={newChat}
        changeCurrentChat={changeCurrentChat}/>
      <main>
        <History
          chatHistory={chatHistory}
          newChat={newChat}
          changeCurrentChat={changeCurrentChat}/>
        <Feed
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          message={message}
          setMessage={setMessage}
          response={response}
          setResponse={setResponse}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}/>
      </main>
    </>
  );
}

export default App;