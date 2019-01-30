import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Text } from '..'

const TitleWrapper = styled(Text)`
  margin-bottom: ${(props) => props.margin}px;
`

const Title = ({ children, color, margin, size }) => (
  <TitleWrapper color={color} margin={margin} size={size} weight={300}>
    {children}
  </TitleWrapper>
)

Title.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  margin: PropTypes.number,
  size: PropTypes.string.isRequired,
}

Title.defaultProps = {
  color: 'gray-5',
  margin: 12,
  size: '20px',
}

export default Title
