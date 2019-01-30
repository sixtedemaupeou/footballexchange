import React from 'react'
import styled from 'styled-components'

import { Text } from '../../../components'

const Navbar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  justify-content: center;
  background-color: #DDDDDD;
  border-bottom: 1px solid white;
  margin: 0 auto;
  height: 60px;
  width: 100%;
`

const Header = () => {
  return (
    <Navbar>
      <Text size='20px'>
        ERC721: Football players marketplace
      </Text>
    </Navbar>
  )
}

export default Header
