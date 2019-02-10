import React from 'react'
import styled from 'styled-components'

import contract from '../../contract'
import { Text } from '..'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #DDDDDD;
  margin-top: 12px;
  border-radius: 5px;
  padding: 12px;
  width: 1200px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Button = styled.button`
  width: 160px;
  height: 40px;
  border-radius: 5px;
  background-color: #AEBEDE;
  cursor: pointer;
`

const Form = styled.div`
  display: flex;
  flex-direction: row;
`

const Input = styled.input`
  margin-right: 12px;
  border-radius: 5px;
  width: 200px;
`



class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      forSale: false,
      price: null
    }

    // Check if player is for sale
    contract.getInstance().isForSale(this.props.tokenId, (err, result) => {
      if (result) {
        this.setState({
          forSale: result
        })
      }
    })

    // Get player price
    contract.getInstance().getPrice(this.props.tokenId, (err, result) => {
      if (result) {
        this.setState({
          price: parseInt(result)
        })
      }
    })

    contract.getInstance().NotForSale({}, (error, result) => {
      if (!error) {
        const tokenId = parseInt(result.args.tokenId);

        if (props.tokenId === tokenId) {
          this.setState({
            forSale: false,
            price: null
          })
        }
      }
    })

    // Subscribe to events
    contract.getInstance().ForSale({}, (error, result) => {
      if (!error) {
        const tokenId = parseInt(result.args.tokenId);
        const price = parseInt(result.args.price);

        if (props.tokenId === tokenId) {
          this.setState({
            forSale: true,
            price: parseInt(price)
          })
        }
      }
    })

    contract.getInstance().Transfer({}, (error, result) => {
      if (!error) {
        const tokenId = parseInt(result.args.tokenId);

        if (props.tokenId === tokenId) {
          this.setState({
            forSale: false,
            price: null
          })
        }
      }
    })

    this.buy.bind(this)
    this.removeFromSale.bind(this)
    this.setNewPrice.bind(this)
  }

  buy(price) {
    contract.getInstance().transfer(this.props.tokenId, {
      gas: 200000,
      from: window.web3.eth.accounts[0],
      value: price
    }, (err, result) => {
      if (result) {
        alert('Your transaction should take a few minutes to process');
      }
    })
  }

  removeFromSale = () => {
    contract.getInstance().removeFromSale(this.props.tokenId, (err, result) => {
      alert(`${this.props.name} will be removed from sale shortly.`)
    })
  }

  setNewPrice = () => {
    const price = parseInt(document.getElementById('price').value)
    contract.getInstance().putForSale(this.props.tokenId, price, (err, result) => {
      alert(`Price for ${this.props.name} will be updated to ${price} shortly.`)
    })
  }

  render() {
    const { name, club, owned } = this.props
    return (
      <Wrapper>
        <Container>
          <Text size="18px">{name}</Text>
          <Text size="16px">{club}</Text>
        </Container> 
        {owned
          ? <Form>
          <Input type="text" id="price" />
          <Button onClick={this.setNewPrice}>
            <Text>Set sale price (WEI)</Text>
          </Button>
          {this.state.forSale && <Button onClick={this.removeFromSale}>
              <Text>Price: {this.state.price * 1e-18}</Text>
              <Text>Remove from sale</Text>
            </Button>}
        </Form>
          : <Button disabled={!this.state.forSale && 'disabled'} onClick={() => this.buy(this.props.tokenId, this.state.price)}>
            <Text>Price: {this.state.price * 1e-18} ETH</Text>
            <Text>Buy</Text>
          </Button>
        }
      </Wrapper>
    )
  }
}

export default Player