import React from 'react'
import styled from 'styled-components'

import { Player } from '../../components'
import { players } from '../../players'
import contract from '../../contract'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlayersContainer = styled.div`
  display: grid;
`

class Market extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ownedCards: []
    }

    if (window.web3.eth.accounts[0]) {
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
  }
  
  render() {
    console.log(this.state.ownedCards)
    return (
      <Wrapper>
        <PlayersContainer>
          {players.map(({ id, name, club }) => <Player tokenId={id} name={name} club={club} owned={this.state.ownedCards.includes(id)} />)}
        </PlayersContainer>
      </Wrapper>
    )
  }
}

export default Market