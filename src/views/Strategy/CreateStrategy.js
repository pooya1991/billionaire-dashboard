import React, {Component} from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, 
    Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Input, Label } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import StrategyComponent from './StrategyComponent'

class CreateStrategy extends Component {

    constructor() {
        super()
        this.state = {
            enters: [],
            exits: [],
            items: [],
            maths: [],
            enterRels: [],
            exitRels: [],
            showStopLossModal: false,
            showtakeProfitModal: false,
            stopLossDropToggle: false,
            takeProfitDropToggle: false,
            stopLossType: '',
            takeProfitType: '',
            stopLossValue: 0,
            takeProfitValue: 0,
            responseReceived: false,
            name: '',
            description: '',
            enterStrategyStyle: '',
            exitStrategyStyle: '',
        }
        this.saveChanges = this.saveChanges.bind(this)
    }

    saveChanges() {
        const token = localStorage.getItem('token')
        let info ={
            BUY: {
                Enter: {
                    Rules: {
                        
                    },
                    Rels: { }
                },
                Exit: {
                    Rules: {
                        
                    },
                    Rels: { },
                    StopLost: {},
                    TakeProfit: {}
                },
                Status:["Set"]
            }
        }

        for (const [enterIndex, enter] of this.state.enters.entries()) {
            info.BUY.Enter.Rules[`Rule_${enterIndex + 1}`] = {
                Indicators: {}, 
                Math: {}
            }
            for (const [index, value] of enter.indicators.entries()) {
                    let selectedEnter = this.state.items.filter(v => v.IndicatorNameFa == value.indicatorSelected)
                    if (selectedEnter.length > 0) {
                        let enter = selectedEnter[0]
                        info.BUY.Enter.Rules[`Rule_${enterIndex + 1}`].Indicators[`Ind_${index + 1}`] = {
                            Indicator: [enter.IndicatorName],
                            Parameters: {}
                        }

                        let pIndex = 0
                        let params = value.params
                        if (params.hasOwnProperty("p") && params.p != '') {
                            info.BUY.Enter.Rules[[`Rule_${enterIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Parameters[`InPar_${pIndex}`] = [
                                {
                                    Name: enter.p,
                                    Example: params.p
                                }
                            ]
                            pIndex = pIndex + 1
                        }

                        if (params.hasOwnProperty("q") && params.q != '') {
                            info.BUY.Enter.Rules[[`Rule_${enterIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Parameters[`InPar_${pIndex}`] = [
                                {
                                    Name: enter.q,
                                    Example: params.q
                                }
                            ]
                            pIndex = pIndex + 1
                        }

                        if (params.hasOwnProperty("m") && params.m != '') {
                            info.BUY.Enter.Rules[[`Rule_${enterIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Parameters[`InPar_${pIndex}`] = [
                                {
                                    Name: enter.m,
                                    Example: params.m
                                }
                            ]
                            pIndex = pIndex + 1
                        }

                        if (params.hasOwnProperty("n") && params.n != '') {
                            info.BUY.Enter.Rules[[`Rule_${enterIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Parameters[`InPar_${pIndex}`] = [
                                {
                                    Name: enter.n,
                                    Example: params.n
                                }
                            ]
                            pIndex = pIndex + 1
                        }

                    }

                    console.log('value lag', value, value.lag)
                    if (value.params.lag != '') {
                        info.BUY.Enter.Rules[[`Rule_${enterIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Lag = [
                            value.params.lag
                        ]
                    }
            }

            for (const [mathIndex, value] of enter.maths.entries()) {
                console.log('maths', value)
                info.BUY.Enter.Rules[`Rule_${enterIndex + 1}`].Math[`Math_${mathIndex + 1}`] = [ value.Sign ]
            }
            
        }

        for (const [exitIndex, exit] of this.state.exits.entries()) {
            info.BUY.Exit.Rules[`Rule_${exitIndex + 1}`] = {
                Indicators: {}, 
                Math: {}
            }
            for (const [index, value] of exit.indicators.entries()) {
                    let selectedExit = this.state.items.filter(v => v.IndicatorNameFa == value.indicatorSelected)
                    if (selectedExit.length > 0) {
                        let exit = selectedExit[0]
                        info.BUY.Exit.Rules[`Rule_${exitIndex + 1}`].Indicators[`Ind_${index + 1}`] = {
                            Indicator: [exit.IndicatorName],
                            Parameters: {}
                        }

                        let pIndex = 0
                        let params = value.params
                        if (params.hasOwnProperty("p") && params.p != '') {
                            info.BUY.Exit.Rules[[`Rule_${exitIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Parameters[`InPar_${pIndex}`] = [
                                {
                                    Name: exit.p,
                                    Example: params.p
                                }
                            ]
                            pIndex = pIndex + 1
                        }

                        if (params.hasOwnProperty("q") && params.q != '') {
                            info.BUY.Exit.Rules[[`Rule_${exitIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Parameters[`InPar_${pIndex}`] = [
                                {
                                    Name: exit.q,
                                    Example: params.q
                                }
                            ]
                            pIndex = pIndex + 1
                        }

                        if (params.hasOwnProperty("m") && params.m != '') {
                            info.BUY.Exit.Rules[[`Rule_${exitIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Parameters[`InPar_${pIndex}`] = [
                                {
                                    Name: exit.m,
                                    Example: params.m
                                }
                            ]
                            pIndex = pIndex + 1
                        }

                        if (params.hasOwnProperty("n") && params.n != '') {
                            info.BUY.Exit.Rules[[`Rule_${exitIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Parameters[`InPar_${pIndex}`] = [
                                {
                                    Name: exit.n,
                                    Example: params.n
                                }
                            ]
                            pIndex = pIndex + 1
                        }

                    }

                    if (value.params.lag != '') {
                        info.BUY.Exit.Rules[[`Rule_${exitIndex + 1}`]].Indicators[[`Ind_${index + 1}`]].Lag = [
                            value.params.lag
                        ]
                    }
            }

            for (const [mathIndex, value] of exit.maths.entries()) {
                info.BUY.Exit.Rules[`Rule_${exitIndex + 1}`].Math[`Math_${mathIndex + 1}`] = [ value.Sign ]
            }
            
        }

        if (this.state.enterRels.length > 0) {
            for (const [index, value] of this.state.enterRels.entries()) {
                info.BUY.Enter.Rels[`Rel_${index + 1}`] = [value.value]
            }
        }
        
        if (this.state.exitRels.length > 0) {
            for (const [index, value] of this.state.exitRels.entries()) {
                info.BUY.Exit.Rels[`Rel_${index + 1}`] = [value.value]
            }
        }

        if (this.state.stopLossValue > 0) {
            info.BUY.Exit.StopLost = [
                {
                    Type: this.state.stopLossType == 'percent' ? 'Percent' : 'Price',
                    Number: this.state.stopLossValue
                }
            ]
        }

        if (this.state.takeProfitValue > 0) {
            info.BUY.Exit.TakeProfit = [
                {
                    Type: this.state.takeProfitType == 'percent' ? 'Percent' : 'Price',
                    Number: this.state.takeProfitValue
                }
            ]
        }

        let data = []

        data.push('Strategy='.concat(encodeURIComponent(JSON.stringify(info))))
        data.push('StrategyName='.concat(encodeURIComponent(this.state.name)))
        data.push('Description='.concat(encodeURIComponent(this.state.description)))
        fetch('/api/SaveStrategy/', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': "Bearer ".concat(token)
            },
            method: 'POST',
            body: data.join('&'),
        }).then(r => {
            this.setState({
                responseReceived: true
            })
        }).catch(r => console.log(r))
    }


    enterChanges(changes, index) {
        console.log('enter changes', index, changes)
        let enters = this.state.enters
        enters[index] = changes
        this.setState({
            enters: enters,
        })
    }

    exitChanges(changes, index) {
        console.log('exit changes', index, changes)
        let exits = this.state.exits
        exits[index] = changes
        this.setState({
            exits: exits,
        })
    }

    isButtonDisable() {
       
        if (this.state.enters.length == 0) {
            return this.state.exits.length == 0 && (this.state.stopLossValue == '' && this.state.takeProfitValue == '')
        }

        return false
    }

    itemsReceived(items) {
        this.setState({
            items: items
        })
    }

    mathsReceived(maths) {
        this.setState({
            maths: maths
        })
    }

    stopLossModalToggle() {
        this.setState({
            showStopLossModal: !this.state.showStopLossModal
        })
    }

    stopLossDropToggle() {
        this.setState({
            stopLossDropToggle: !this.state.stopLossDropToggle
        })
    }

    stopLossTypeChange(type) {
        this.state.stopLossType = type
    }

    stopLossValueChange(value) {
        this.setState({
            stopLossValue: value
        })
    }

    takeProfitModalToggle() {
        this.setState({
            showtakeProfitModal: !this.state.showtakeProfitModal
        })
    }

    takeProfitDropToggle() {
        this.setState({
            takeProfitDropToggle: !this.state.takeProfitDropToggle
        })
    }

    takeProfitTypeChange(type) {
        this.state.takeProfitType = type
    }

    takeProfitValueChange(value) {
        this.setState({
            takeProfitValue: value
        })
    }

    nameChanged(value) {
        this.setState({
            name: value
        })
    }

    descriptionChanged(value) {
        this.setState({
            description: value
        })
    }

    addEnterStrategy() {
        let enters = this.state.enters
        let enterRels = this.state.enterRels
        enters.push({})
        enterRels.push({
            isOpen: false,
            value: '',
        })
        this.setState({
            enters: enters,
            enterRels: enterRels,
            enterStrategyStyle: '10px'
        })

    }

    addExitStrategy() {
        let exits = this.state.exits
        let exitRels = this.state.exitRels
        exits.push({})
        exitRels.push({
            isOpen: false,
            value: '',
        })
        this.setState({
            exits: exits,
            exitRels: exitRels,
            exitStrategyStyle: '10px'
        })
    }

    enterRelToggle(index) {
        let items = this.state.enterRels    
        let item = this.state.enterRels[index]
        item.isOpen = !item.isOpen
        items[index] = item
        this.setState({
            enterRels: items,
        })
    }

    enterRelDropSelected(index, value) {
        let items = this.state.enterRels
        items[index].value = value
        this.setState({
            enterRels: items,
        })
    }


    exitRelToggle(index) {
        let items = this.state.exitRels    
        let item = this.state.exitRels[index]
        item.isOpen = !item.isOpen
        items[index] = item
        this.setState({
            exitRels: items,
        })
    }

    exitRelDropSelected(index, value) {
        let items = this.state.exitRels
        items[index].value = value
        this.setState({
            exitRels: items,
        })
    }

    
    render() {

        let stopLossModal
        let caretTitle = ''
        switch(this.state.stopLossType) {
            case 'percent':
                    caretTitle = 'درصد'
                    break
            case 'value':
                caretTitle = 'مقدار'
                break
                default:
                    caretTitle = ''
        }
        if(this.state.showStopLossModal) {
            stopLossModal = <Modal toggle={() => this.stopLossModalToggle()} isOpen={this.state.showStopLossModal}>
                <ModalHeader>حد ضرر</ModalHeader>
                <ModalBody>
                    <Dropdown className="d-inline-block" toggle={() => this.stopLossDropToggle()} isOpen={this.state.stopLossDropToggle}>
                        <DropdownToggle className="btn btn-info strategy-dropdown" caret>{caretTitle}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={(e) => this.stopLossTypeChange('percent')}>درصد</DropdownItem>
                            <DropdownItem onClick={(e) => this.stopLossTypeChange('value')}>مقدار</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Input className="d-inline-block w-25 ml-2 strategy-input" placeholder={this.state.stopLossType == 'percent' ? '0%' : '0'}
                            onChange={(e) => this.stopLossValueChange(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                        <Button color="info" className="strategy-btn" onClick={() => this.stopLossModalToggle()} >اعمال</Button>
                    </ModalFooter>
            </Modal>
        }

        let takeProfitModal
        let takeProfitCaretTitle
        switch(this.state.takeProfitType) {
            case 'percent':
                    takeProfitCaretTitle = 'درصد'
                    break
            case 'value':
                takeProfitCaretTitle = 'مقدار'
                break
                default:
                    takeProfitCaretTitle = ''
        }
        if(this.state.showtakeProfitModal) {
            takeProfitModal = <Modal toggle={() => this.takeProfitModalToggle()} isOpen={this.state.showtakeProfitModal}>
                <ModalHeader>حد سود</ModalHeader>
                <ModalBody>
                    <Dropdown className="d-inline-block" toggle={() => this.takeProfitDropToggle()} isOpen={this.state.takeProfitDropToggle}>
                        <DropdownToggle className="btn btn-info strategy-dropdown" caret>{takeProfitCaretTitle}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={(e) => this.takeProfitTypeChange('percent')}>درصد</DropdownItem>
                            <DropdownItem onClick={(e) => this.takeProfitTypeChange('value')}>مقدار</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Input className="d-inline-block w-25 ml-2 strategy-input" placeholder={this.state.takeProfitType == 'percent' ? '0%' : '0'}
                            onChange={(e) => this.takeProfitValueChange(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" className="strategy-btn" onClick={() => this.takeProfitModalToggle()}>اعمال</Button>
                </ModalFooter>
            </Modal>
        }

        let takeProfitButtonTitle = 'حد سود'
        if (this.state.takeProfitValue > 0) {
            takeProfitButtonTitle = this.state.takeProfitValue
        }

        let stopLossButtonTitle = 'حد ضرر'
        if (this.state.stopLossValue > 0) {
            stopLossButtonTitle = this.state.stopLossValue
        }

        let redirect
        if(this.state.responseReceived) {
            redirect = <Redirect to='/strategies'/>
        }

        return (
            <div>
                {redirect}
                <div className="strategy-box px-3">
                    <Label>نام استراتژی:</Label>
                    <Input className="w-25"
                         onChange={(e) => this.nameChanged(e.target.value)} value={this.state.name}></Input>
                    <Label className="mt-2">توضیحات:</Label>
                    <Input className="w-50 strategy-textarea" type="textarea" 
                        onChange={(e) => this.descriptionChanged(e.target.value)} value={this.state.description}></Input>
                </div>
                <h3 className="my-3">ورود</h3>
                <div>
                    {this.state.enters.map((v, i) => <div>
                        <StrategyComponent onChange={(changes, index) => this.enterChanges(changes, index)} 
                                onItemsReceived={(items) => this.itemsReceived(items)}
                                onMathsReceived={(maths) => this.mathsReceived(maths)} index={i} />
                        {i < this.state.enters.length -1 ? 
                        <Dropdown direction="left" className="strategy-hidden-dropdown" isOpen={this.state.enterRels[i].isOpen} toggle={() => this.enterRelToggle(i)}>
                            <DropdownToggle className="btn btn-info strategy-btn" caret>{this.state.enterRels[i].value == '' ? 'رابطه' : this.state.enterRels[i].value}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={(e) => this.enterRelDropSelected(i, 'ADD')}>AND</DropdownItem>
                                <DropdownItem onClick={(e) => this.enterRelDropSelected(i, 'OR')}>OR</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> : <div></div>}
                    </div>)}
                        
                    <Button color="info" style={{marginTop: this.state.enterStrategyStyle}} className="strategy-btn" onClick={() => this.addEnterStrategy()}>اضافه کردن استراتژی ورود</Button>
                </div>
                <h3 className="my-3">خروج</h3>
                <div>
                    {this.state.exits.map((v, i) => <div>
                        <StrategyComponent onChange={(changes, index) => this.exitChanges(changes, index)}
                            onItemsReceived={(items) => console.log(items)}
                            onMathsReceived={(maths) => console.log(maths)} index={i}/>
                            {i < this.state.exits.length -1 ? 
                                <Dropdown direction="left" className="strategy-hidden-dropdown" isOpen={this.state.exitRels[i].isOpen} toggle={() => this.exitRelToggle(i)}>
                                    <DropdownToggle className="btn btn-info strategy-btn" caret>{this.state.exitRels[i].value == '' ? 'رابطه' : this.state.exitRels[i].value}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={(e) => this.exitRelDropSelected(i, 'ADD')}>AND</DropdownItem>
                                        <DropdownItem onClick={(e) => this.exitRelDropSelected(i, 'OR')}>OR</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown> : <div></div>}
                        </div>)}
                    <Button color="info" className="strategy-btn" style={{marginTop: this.state.exitStrategyStyle}} onClick={() => this.addExitStrategy()}>اضافه کردن استراتژی خروج</Button>
                </div>
                <div>
                    <div className="strategy-box pl-3 mt-3">
                        <div className="">
                            <p>حد ضرر</p>
                            <Button color="info" className="strategy-btn" onClick={(e) => this.stopLossModalToggle()}>{stopLossButtonTitle}</Button>
                        </div>
                    </div>
                    <div className="strategy-box pl-3 mt-3">
                        <div className=""> 
                            <p>حد سود</p>
                            <Button color="info" className="strategy-btn" onClick={(e) => this.takeProfitModalToggle()}>{takeProfitButtonTitle}</Button>
                        </div>
                    </div>
                        {stopLossModal}
                        {takeProfitModal}
                </div>
                <Button color="info" className="strategy-btn my-3" onClick={this.saveChanges} disabled={this.isButtonDisable()}>ذخیره</Button>
            </div>
        )
    }
}
export default CreateStrategy