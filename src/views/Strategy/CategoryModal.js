import React, {Component} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, 
    Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'

class CategoryModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mainCategoryOpen: false,
            selectedCategory: '',
            subCategorySelected: '',
            indicatorSelected: '',
            subCategoryOpen: false,
            dropDownOpen: false,
        }
        let selecteds = this.props.items.filter(v => this.props.selectedIndicator.IndicatorNameFa == v.IndicatorNameFa)
        if (selecteds.length > 0) {
            let item = selecteds[0]
            this.setState({
                selectedCategory: item.MainCategoryFa,
                subCategorySelected: item.SubCategoryFa,
                indicatorSelected: item.IndicatorNameFa
            })
        }
    }
    
    mainCategoryToggle() {
        this.setState({
            mainCategoryOpen: !this.state.mainCategoryOpen
        })
    }

    mainCategoryClicked(value) {
        this.setState({
            selectedCategory: value,
            subCategorySelected: '',
            indicatorSelected: '',
        })
        
            
            
    }

    subDropToggle() {
        this.setState({
            subCategoryOpen: !this.state.subCategoryOpen
        })
    }

    indicatorClicked(value) {
        this.setState({
            indicatorSelected: value
        })
    }

    addClicked() {
        this.props.onCategoryInfo(
            this.props.tag,
            this.state.indicatorSelected
        )
    }

    cancelModal() {
        this.props.subModalToggle(this.props.tag)
    }

    dropDownToggle() {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen
        })
    }

    subCategoryClicked(value) {
        this.setState({
            subCategorySelected: value
        })
    }

    render() {
        let mainDropTitle
        if (this.state.selectedCategory == '') {
            mainDropTitle = 'موضوع اصلی'
        } else {
            mainDropTitle = this.state.selectedCategory
        }

        var thirdItems = []
        if (this.state.subCategorySelected != "") {
            thirdItems = this.props.items.filter(v => v.SubCategoryFa == this.state.subCategorySelected)
                .map((v, i, a) => <DropdownItem key={i} onClick={(e) => this.indicatorClicked(v.IndicatorNameFa)}>{v.IndicatorNameFa}</DropdownItem>)
        } else if (this.state.selectedCategory != '') {
            thirdItems = this.props.items.filter(v => v.MainCategoryFa == this.state.selectedCategory)
                .map((v, i, a) => <DropdownItem key={i} onClick={(e) => this.indicatorClicked(v.IndicatorNameFa)}>{v.IndicatorNameFa}</DropdownItem>)
        }

        var subDropTitle
        if (this.state.subCategorySelected == '') {
            subDropTitle = 'اندیکاتور ها'
        } else {
            subDropTitle = this.state.subCategorySelected
        }

        let secondDropDown
        if (this.state.selectedCategory != '') {
            let filteredItems = this.props.items.filter(v => v.MainCategoryFa == this.state.selectedCategory)
            if (filteredItems.length > 0) {
                let item = filteredItems[0]
                if (item.SubCategoryFa != '') {
                    secondDropDown = <Dropdown className="d-inline-block modal-dropdown" isOpen={this.state.dropDownOpen}
                     toggle={() => this.dropDownToggle()}>
                        <DropdownToggle className="btn btn-info strategy-dropdown" caret>{subDropTitle}</DropdownToggle>
                        <DropdownMenu>
                            {this.props.items.filter(v => v.MainCategoryFa == this.state.selectedCategory)
                                .map(v => v.SubCategoryFa)
                                .filter((v,i,a) => a.indexOf(v) === i)
                                .map((v, i, a) => <DropdownItem key={i} onClick={(e) => this.subCategoryClicked(v)}>{v}</DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>
                }
            }
        }
        return(
            <Modal toggle={() => this.props.subModalToggle(this.props.tag)} isOpen={this.props.modalToggle}>
                <ModalHeader>انتخاب زیرشاخه</ModalHeader>
                    <ModalBody>
                        <Dropdown className="d-inline-block modal-dropdown" toggle={() => this.mainCategoryToggle()} 
                            isOpen={this.state.mainCategoryOpen}>
                            <DropdownToggle className="btn btn-info strategy-dropdown" caret>{mainDropTitle}</DropdownToggle>
                                <DropdownMenu>
                                    {this.props.items.map(v => v.MainCategoryFa).filter((v, i, a) => a.indexOf(v) === i)
                                        .map((v,i,a) => <DropdownItem key={i} onClick={(e) => this.mainCategoryClicked(v)}>{v}</DropdownItem>)}
                                </DropdownMenu>
                        </Dropdown>
                        {secondDropDown}
                        <Dropdown className="d-inline-block pt-2 modal-dropdown" isOpen={this.state.subCategoryOpen} toggle={() => this.subDropToggle()}>
                            <DropdownToggle className="btn btn-info strategy-dropdown" caret>{this.state.indicatorSelected == '' ? 
                                'اندیکاتور' : this.state.indicatorSelected}</DropdownToggle>
                            <DropdownMenu modifiers={{
                                setMaxHeight: {
                                    enabled: true,
                                    order: 890,
                                    fn: (data) => {
                                    return {
                                        ...data,
                                        styles: {
                                        ...data.styles,
                                        overflow: 'auto',
                                        maxHeight: 350,
                                        },
                                    };
                                    },
                                },
                            }}>
                                {thirdItems}
                            </DropdownMenu>
                        </Dropdown>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" className="mr-2 strategy-btn" onClick={(e) => this.addClicked()} disabled={
                            this.state.selectedCategory == '' &&
                            this.state.subCategorySelected == '' &&
                            this.state.indicatorSelected == ''}>اضافه کردن</Button>
                        <Button color="info" className="strategy-btn" onClick={(e) => this.cancelModal()}>لغو</Button>
                    </ModalFooter>
            </Modal>
        )
    }
}

export default CategoryModal