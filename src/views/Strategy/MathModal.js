import React, {Component} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, 
    Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap'

class MathModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            mathCategory: '',
            selectedMath: {},
            mathSignOpen: false,
        }
    }

    mathCategoryToggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    mathCategoryClick(value) {
        this.setState({
            mathCategory: value
        })
    }

    operatorSelected(sign) {
        let candids = this.props.mathSigns.filter(v => v.Sign == sign)
        var math = {}
        if (candids.length > 0) {
            math = candids[0]
        }
        this.setState({
            selectedMath: math
        })
    }

    mathSelected(index) {
        this.props.onMathSelected({
            math: this.state.selectedMath,
            index: index,
        })
    }

    mathSignToggle() {
        this.setState({
            mathSignOpen: !this.state.mathSignOpen
        })
    }

    render() {
        let firstTitle = this.state.mathCategory == '' ? 'دسته بندی' : this.state.mathCategory
        let first = <Dropdown className="d-inline-block" isOpen={this.state.modalOpen} toggle={() => this.mathCategoryToggle()}>
                <DropdownToggle className="btn btn-info strategy-dropdown" caret>{firstTitle}</DropdownToggle>
                <DropdownMenu>{
                    this.props.mathSigns.map(v => v.Category).filter((v,i,a) => a.indexOf(v) === i)
                    .map((v, i, a) => <DropdownItem key={i} onClick={(e) => this.mathCategoryClick(v)}>{v}</DropdownItem>)
                }
                </DropdownMenu>
            </Dropdown>
            let second
            let signTitle = this.state.selectedMath === {} ? 'علامت' :  this.state.selectedMath.Sign
            if (this.state.mathCategory != "") {
                second = this.props.mathSigns.filter(v => v.Category == this.state.mathCategory)
                    .map((v, i, a) => <DropdownItem key={i} onClick={(e) => this.operatorSelected(v.Sign)}>{v.Name}</DropdownItem>)
            }
        return (
            
            <Modal isOpen={this.props.showMathModal} toggle={() => this.props.mathModalToggle(this.props.index)}>
                <ModalHeader>انتخاب پارامترها</ModalHeader>
                <ModalBody>
                    {first}
                    <Dropdown className="d-inline-block" isOpen={this.state.mathSignOpen} toggle={() => this.mathSignToggle()}>
                        <DropdownToggle className="btn btn-info strategy-dropdown ml-2" caret>{signTitle}</DropdownToggle>
                        <DropdownMenu>
                            {second}
                        </DropdownMenu>
                    </Dropdown>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" className="strategy-btn" onClick={(e) => this.mathSelected(this.props.index)}>اعمال</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default MathModal