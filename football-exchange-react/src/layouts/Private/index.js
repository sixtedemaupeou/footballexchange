import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

import Private from './template'

class PrivateContainer extends React.Component {
  static propTypes = {
    component: PropTypes.func,
    path: PropTypes.string.isRequired,
  }

  routeRenderer = (matchProps) => {
    const { component, path } = this.props

    return (
      <Private
        Component={component}
        matchProps={matchProps}
        path={path}
      />
    )
  }

  render() {
    const { path } = this.props

    return <Route path={path} render={this.routeRenderer} />
  }
}


export default PrivateContainer
