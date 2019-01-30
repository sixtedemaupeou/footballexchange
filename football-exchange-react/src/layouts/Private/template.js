import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import MenuLeft from './MenuLeft'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`
const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`
const HeaderContainer = styled(Header)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`
const MenuLeftContainer = styled(MenuLeft)`
  position: fixed;
  width: 20%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
`
const PageWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  width: 100%;
`

const Private = ({ Component, matchProps, path }) => (
  <Wrapper>
    <HeaderContainer path={path} />
    <Container>
      <MenuLeftContainer path={path}/>
      <PageWrapper>
        <Component {...matchProps} />
      </PageWrapper>
    </Container>
  </Wrapper>
)

Private.propTypes = {
  Component: PropTypes.func.isRequired,
  matchProps: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
}

export default Private
