import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { startsWith } from 'ramda'

import { Text } from '../../../components'

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-top: 20px;
  width: 15%;
  height: 100%;
`
const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
`
const MenuItemsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15%;
`
const MenuLink = styled(NavLink) `
  text-decoration: none;
`
const Selection = styled.div`
  background-color: navy;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  left: 0;
  height: 36px;
  position: fixed;
  width: 6px;
`

const MenuLeft = ({ path }) => {
  const isSelected = (pathStart) => startsWith(pathStart, path)
  const getColor = (path) => (isSelected(path) ? 'brand-primary' : 'gray-4')
  return (
    <MenuWrapper>
      <MenuItemsList>
        <MenuItem>
          {isSelected('/squad') && <Selection />}
          <MenuLink to="/squad">
            <Text color={getColor('/squad')} size="18px" weight={300}>
              Squad
            </Text>
          </MenuLink>
        </MenuItem>
        <MenuItem>
          {isSelected('/market') && <Selection />}
          <MenuLink to="/market">
            <Text color={getColor('/market')} size="18px" weight={300}>
              Market
            </Text>
          </MenuLink>
        </MenuItem>
      </MenuItemsList>
    </MenuWrapper>
  )
}

MenuLeft.propTypes = {
  path: PropTypes.string.isRequired,
}

export default MenuLeft
