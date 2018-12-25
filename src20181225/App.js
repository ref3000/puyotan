import React from 'react'
import ChatList from './containers/ChatList'
import ChatBox from './containers/ChatBox'
import AppBack from './components/AppBack'

const App = () => (
  <div>
    <ChatList />
    <ChatBox />
    <AppBack />
  </div>
)

export default App