import React from 'react'
import styled from 'styled-components'

import { Player, Text } from '../../components'
import contract from '../../contract'
import { players } from '../../players'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BalanceCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #DDDDDD;
  width: 1200px;
  height: 50px;
  margin-bottom: 12px;
  margin-top: 12px;
  border-radius: 5px;
  padding-left: 12px;
  padding-right: 12px;
`

const Button = styled.button`
  width: 160px;
  height: 40px;
  border-radius: 5px;
  background-color: #AEBEDE;
  cursor: pointer;
`

class Squad extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      ownedCards: [],
      balance: 0
    }

    this.getOwnCards.bind(this)
    this.withdraw.bind(this)
    this.getBalance(this)

    // Fetch owners cards
    this.getOwnCards()

    // Get account balance
    this.getBalance()

    // Subscribe to Transfer event callbacks
    contract.getInstance().Transfer({}, (error, result) => {
      if (!error) {
        const newOwner = result.args.to
        const oldOwner = result.args.from

        if (newOwner === window.web3.eth.accounts[0] || oldOwner === window.web3.eth.accounts[0]) {
          // Fetch owners cards if his address is included in the transfer
          this.getOwnCards()

          // Update balance
          this.getBalance()
        }
      }
    })

    // Subscribe to Withdraw event callbacks
    contract.getInstance().Withdraw({}, (error, result) => {
      if (!error) {
        const withdrawAddress = result.args.from

        if (withdrawAddress === window.web3.eth.accounts[0]) {
          this.setState({
            balance: 0
          })
        }
      }
    })
  }

  getOwnCards() {
    contract.getInstance().getOwnPlayers({
      from: window.web3.eth.accounts[0]
    }, (err, result) => {
      if (result) {
        this.setState({
          ownedCards: result.map((tokenId) => parseInt(tokenId))
        })
      }
    })
  }

  getBalance() {
    contract.getInstance().getBalance({
      from: window.web3.eth.accounts[0]
    }, (err, result) => {
      if (result) {
        this.setState({
          balance: parseInt(result)
        })
      }
    })
  }

  withdraw() {
    contract.getInstance().withdraw({
      gas: 200000,
      from: window.web3.eth.accounts[0]
    }, (err, result) => {
      if (result) {
        alert('Withdrawing funds')
      }
    })
  }

  render () {
    return (
      <Wrapper>
        <BalanceCard>
          <Text>Your balance: {this.state.balance / 1e-18} ETH</Text>
          <Button onClick={this.withdraw}>Withdraw funds</Button>
        </BalanceCard>
        {this.state.ownedCards.map(index => <Player index={index} name={players[index].name} club={players[index].club} owned tokenId={players[index].id} />)}
      </Wrapper>
    )
  }

}

export default Squad