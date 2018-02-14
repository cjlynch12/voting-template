import React from 'react';
import Navbar from '../components/Navbar'
import PollList from '../components/PollList'

export default class Home extends React.Component {
  constructor() {
    super()
    
  }
  
  render() {
    return (
        <div>
          <PollList />
        </div>
      )
  }
}