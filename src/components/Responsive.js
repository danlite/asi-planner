import React from 'react'
import Responsive from 'react-responsive'

export const MobileViewport = props => <Responsive {...props} maxWidth={767} />
export const DefaultViewport = props => <Responsive {...props} minWidth={768} />
