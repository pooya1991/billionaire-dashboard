import React from 'react'

class IfNotComponent extends React.Component {

    constructor() {
        super()
        console.log('if not')
    }

    render() {
        let ifNot = false

        if (this.props.condition != null) {
            ifNot = this.props.condition
        }
        console.log('if not', ifNot)

        let result = ifNot ? this.props.done : this.props.failed

        return result
    }
}

export default IfNotComponent