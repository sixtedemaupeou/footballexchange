import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const NavLink = styled.a`
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-bottom-color: ${(props) =>
    props.active ? 'blue' : 'transparent'};
`

const RouteLink = (props) => {
  const active = props.className && props.className.includes('active')

  return (
    <NavLink
      {...{
        active,
        color: 'blue',
        size: '14px',
        uppercase: true,
        ...props,
      }}
    >
      {props.children}
    </NavLink>
  )
}

RouteLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default RouteLink
