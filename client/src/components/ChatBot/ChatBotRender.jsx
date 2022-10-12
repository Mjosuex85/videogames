import React from 'react'
import Chatbot from 'react-chatbot-kit'
import config from './config.js'
import ActionProvider from "./ActionProvider.js";
import MessageParser from "./MessageParser";

export default function ChatBotRender() {
  return (
    <div>
      <div style={{maxWidth: '300px'}}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  )
}
