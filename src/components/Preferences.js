import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Form } from 'semantic-ui-react'
import { SET_PREFERENCE } from '../actions'
import { PREF_LEVEL_ONE_FEAT, PREF_FEATS_ALLOWED } from '../constants'

const mapStateToProps = state => {
    return {
        preferences: state.preferences
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPreference: (key, value) => {
            dispatch({
                type: SET_PREFERENCE,
                key,
                value,
            })
        }
    }
}

class Preferences extends Component {
    render() {
        const { preferences, setPreference } = this.props
        return <Form>
            <Form.Field>
                <Checkbox onChange={(event, data) => setPreference(PREF_FEATS_ALLOWED, data.checked)}
                          checked={!!preferences[PREF_FEATS_ALLOWED]}
                          toggle
                          label='DM allows feats' />
            </Form.Field>
            <Form.Field>
                <Checkbox onChange={(event, data) => setPreference(PREF_LEVEL_ONE_FEAT, data.checked)}
                          checked={!!preferences[PREF_LEVEL_ONE_FEAT]}
                          toggle
                          disabled={!preferences[PREF_FEATS_ALLOWED]}
                          label='DM grants all races a feat at 1st level' />
            </Form.Field>
        </Form>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Preferences)
