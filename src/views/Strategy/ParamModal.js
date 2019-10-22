import React, {Component} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Label } from 'reactstrap'

class ParamModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            p: props.params.p ? props.params.p : '',
            m: props.params.m ? props.params.m : '',
            n: props.params.n ? props.params.n : '',
            q: props.params.q ? props.params.q : '',
            lag: props.params.lag ? props.params.lag : '',
        }
    }

    

    paramChange(paramName, value) {
        switch(paramName) {
            case 'm':
                    this.setState({
                        m: value,
                    })
                    break
            case 'n':
                    this.setState({
                        n: value,
                    })
                    break
            case 'p':
                    this.setState({
                        p: value,
                    })
                    break
            case 'q':
                    this.setState({
                        q: value,
                    })
                    break
        }   
    }

    lagChange(value) {
        this.setState({
            lag: value,
        })
    }

    addParams(index) {
        this.props.addParams(index, {
            m: this.state.m,
            n: this.state.n,
            p: this.state.p,
            q: this.state.q,
            lag: this.state.lag,
        })
    }

    render() {
        let items = this.props.items.filter(v => v.IndicatorNameFa == this.props.indicatorSelected)
        let m
        let n
        let p
        let q
        let lag

            if (items.length > 0) {
                let item = items[0]
                if (item.m != "") {
                    m = <div>
                        <Label className="my-2">{item.mName}</Label>
                        <Input className="strategy-input" placeholder={item.mEx} onChange={(e) => this.paramChange('m', e.target.value)} value={this.state.m}/>
                    </div>
                }
                if (item.n != "") {
                    n = <div>
                        <Label className="my-2">{item.nName}</Label>
                        <Input className="strategy-input" placeholder={item.nEx} onChange={(e) => this.paramChange('n', e.target.value)} value={this.state.n}/>
                    </div>
                }
                if (item.p != "") {
                    p = <div>
                        <Label className="my-2">{item.pName}</Label>
                        <Input className="strategy-input" placeholder={item.pEx} onChange={(e) => this.paramChange('p', e.target.value)} value={this.state.p}/>
                    </div>
                }
                if (item.q != "") {
                    q = <div>
                        <Label className="my-2">{item.qName}</Label>
                        <Input className="strategy-input" placeholder={item.qEx} onChange={(e) => this.paramChange('q', e.target.value)} value={this.state.q}/>
                    </div>
                }

                if (item.Lag == 1) {
                    lag = <div>
                        <Label className="my-2">لگ</Label>
                        <Input className="strategy-input" placeholder="0" onChange={(e) => this.lagChange(e.target.value)} value={this.state.lag}/>
                    </div>
                }
                
            }

            return (
                <Modal toggle={() => this.props.paramModalToggle(this.props.index)} isOpen={this.props.showParamModal}>
                    <ModalHeader>انتخاب پارامتر ها</ModalHeader>
                        <ModalBody>
                            <div>
                                {m}
                                {n}
                                {p}
                                {q}
                                {lag}
                                <Button color="info" className="strategy-btn mt-3" 
                                onClick={(e) => this.addParams(this.props.index)}>اضافه کردن پارامتر ها</Button>
                            </div>
                    </ModalBody>
                </Modal>
            )
    }
}

export default ParamModal