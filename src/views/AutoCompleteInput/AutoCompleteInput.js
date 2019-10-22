import React, {Fragment} from 'react'
import {Input, DropdownItem, DropdownMenu, Button} from 'reactstrap'

class AutoCompleteInput extends React.Component {

    constructor() {
        super()
        this.state = {
            searchedItems: [],
            text: '',
        }
    }
    keyChange(value) {
        let items = []
        if (value != ''){
            items = this.props.items.filter(v => v.includes(value))
            if (items.length == 1 && value == items[0]){
                items = []
            }
        }
        this.setState({
            searchedItems: items,
            text: value,
        })
        this.props.textChange(value)
    }

    itemClicked(value) {
        this.setState({
            searchedItems: [],
            text: value,
        })
        this.props.textChange(value)
    }

    checkForChanges(value) {

    }
    render() {
        let list = this.state.searchedItems.map((v) => <ul className="auto-input-suggest">
            <li onClick={() => this.itemClicked(v)}>{v}</li>
        </ul>)
        return(
            <Fragment>
                <Input name={this.props.name} className="auto-input" value={this.state.text} plaintext={this.state.text} onChange={(e) => this.keyChange(e.target.value)}></Input>
                <div className="auto-input-div">
                    {list}
                </div>
            </Fragment>
        )
    }
}

export default AutoCompleteInput