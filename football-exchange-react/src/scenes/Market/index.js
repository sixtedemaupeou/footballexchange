import React from 'react'
import { Text } from '../../components'

class Market extends React.Component {
  constructor(props) {
    super(props)
    this.querySecret = this.querySecret.bind(this)
    const MyContract = window.web3.eth.contract([
      {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getSecret",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "you_awesome",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ])

    this.state = {
      ContractInstance: MyContract.at('0x2ff989595603f769356731a0d5c502cdad7c2a30')
    }
  }

  querySecret() {
    const { getSecret } = this.state.ContractInstance

    getSecret((err, secret) => {
      if (err) {
        console.error('An error occurred: ', err)
      }
      console.log(secret)
    })
  }
  
  render() {
    return (
      <div>
        <Text> Market page</Text>
        <button onClick={this.querySecret}>Get secret</button>
      </div>
    )
  }
}

export default Market