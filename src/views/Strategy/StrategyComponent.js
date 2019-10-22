import React, {Component} from 'react'
import { Button } from 'reactstrap'
import ParamModal from './ParamModal'
import CategoryModal from './CategoryModal'
import MathModal from './MathModal'


class StrategyComponent extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            mathSigns: [],
            indicators: [
                {
                    subModalToggle: false,
                    indicatorSelected: '',
                    params: {},
                    showParamModal: false,
                }, 
                {
                    subModalToggle: false,
                    indicatorSelected: '',
                    params: {},
                    showParamModal: false,
                }
            ],
            maths: [
                {
                    info: {
                        Name: '',
                        Sign: '',
                    },
                    showMathModal: false,
                }
            ],
            mathCategory: "",
            mathCategoryOpen: false,
            mathSignOpen: false,
        }
        
        this.getItems(localStorage.getItem('token'))
    }


    getItems(token) {
        var data = []
        data.push('DataItems=Indicators')
        fetch('/api/DataItems/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '.concat(token),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        }).then(r => r.json())
        .then(r => {
            this.setState({
                items: r.data
            })
            this.props.onItemsReceived(this.state.items)
        }).catch(err => console.log(err))


        var mathData = []
        mathData.push('DataItems=MathSigns')
        fetch('/api/DataItems/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '.concat(token),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: mathData
        }).then(r => r.json())
        .then(r => {
            this.setState({
                mathSigns: r.data
            })
            this.props.onMathsReceived(this.state.mathSigns)
        }).catch(err => console.log(err))
    }
   

    dropDownToggle(type) {
        switch(type) {
            case 'first':
            let first = {...this.state.firstIndicator}
            first.dropDownOpen = !first.dropDownOpen
            this.setState({
                firstIndicator: first
            })
            break
            case 'second':
            let second = {...this.state.secondIndicator}
            second.dropDownOpen = !second.dropDownOpen
            this.setState({
                secondIndicator: second
            })
            break
        }

    }

    subCategoryClicked(type, v) {
        switch(type) {
            case 'first':
            this.state.firstIndicator.subCategorySelected = v
            break
            case 'second':
            this.state.secondIndicator.subCategorySelected = v
            break
        }
    }

    indicatorClicked(type, indicatorNameFa) {
        switch(type) {
            case 'first':
            this.state.firstIndicator.indicatorSelected = indicatorNameFa
            break
            case 'second':
            this.state.secondIndicator.indicatorSelected = indicatorNameFa
            break
        }
    }

    openCategoryClick(index) {
        let indicators = this.state.indicators
        let item = indicators[index]
        item.subModalToggle = true
        indicators[index] = item
        this.setState({
            indicators: indicators
        })
        
    }

    // addClicked(type) {
    //     switch(type) {
    //         case 'first':
    //         this.setState({
    //             ...this.state,
    //             firstIndicator: {
    //                 ...this.state.firstIndicator,
    //                 showSubModal: false
    //             }
    //         })
    //         // this.state.firstIndicator.showSubModal = false
    //         break
    //         case 'second':
    //         this.setState({
    //             ...this.state,
    //             secondIndicator: {
    //                 ...this.state.secondIndicator,
    //                 showSubModal: false
    //             }
    //         })
    //         break
    //     }
    // }

    paramClicked(whichOne) {
        switch(whichOne) {
            case 'first':
                let first = {...this.state.firstIndicator}
                first.showParamModal = true
                this.setState({
                    firstIndicator: first
                })
                break
            case 'second':
            let second = {...this.state.secondIndicator}
            second.showParamModal = true
            this.setState({
                secondIndicator: second
            })
            break
        }
    }

    paramModalToggle(index) {
        let indicator = this.state.indicators[index]
        indicator.showParamModal = !indicator.showParamModal
        let indicators = this.state.indicators
        indicators[index] = indicator
        this.setState({
            indicators: indicators
        })
    }

    mathModalToggle(index) {
        let maths = this.state.maths
        let item = maths[index]
        item.showMathModal = !item.showMathModal
        maths[index] = item
        this.setState({
            maths: maths
        })
    }

    


    // -----------

    subModalToggle(index) {
        let indicators = this.state.indicators
        let item = indicators[index]
        item.subModalToggle = !item.subModalToggle
        indicators[index] = item
        this.setState({
            indicators: indicators
        })
    }

    changeParams(index, params) {
        let indicators = this.state.indicators
        let item = indicators[index]
        item.params = {
            m: params.m,
            n: params.n,
            p: params.p,
            q: params.q,
            lag: params.lag,
        }
        item.showParamModal = !item.showParamModal
        indicators[index] = item
        this.setState({
            indicators: indicators,
        })

        this.checkChanges()
    }

    mathSelected(math, index) {
        let maths = this.state.maths
        maths[index].info = math
        maths[index].showMathModal = !maths[index].showMathModal
        if (index == this.state.maths.length - 1 && math.Category != 'عملگر مقایسه') {
            this.addNewItems()
        } else {
            console.log(maths, this.state.indicators)
            if (index < maths.length - 1) {
                let maths = this.state.maths
                let indicators = this.state.indicators
                indicators.splice(index + 1, 1)
                maths.splice(index + 1, 1)
                console.log(maths, indicators)
                this.setState({
                    indicators: indicators,
                    maths: maths,
                })
            }
        }
        this.setState({
            maths: maths
        })
        this.checkChanges()
    }

    addNewItems() {
        let indicators = this.state.indicators
        indicators.push({
            subModalToggle: false,
            indicatorSelected: '',
            params: {},
            showParamModal: false,
        })
        let maths = this.state.maths
        maths.push({
            info: {
                Name: '',
                Sign: '',
            },
            showMathModal: false,
        })
        this.setState({
            maths: maths,
            indicators: indicators,
        })
    }

    indicatorForModal(tag, indicator) {
        let indcs = this.state.indicators
        let item = indcs[tag]
        item.indicatorSelected = indicator
        item.params = {}
        item.subModalToggle = false
        this.setState({
            indicators: indcs,
        })
        this.checkChanges()
    }

    // mathClicked(index) {
    //     let indcs = this.state.indicators
    //     let item = indcs[index]
    //     item.indicatorSelected = indicators
    //     item.subModalToggle = false
    //     this.setState({
    //         indicators: indcs,
    //     })
    // }
    // -----------

    checkChanges() {
        if (this.state.indicators.filter(v => v.indicatorSelected != '').length > 0 &&
            this.state.maths.filter(v => v.info.Name != '').length > 0) {
                this.props.onChange({
                    indicators: this.state.indicators,
                    maths: this.state.maths.map(v => v.info),
                }, this.props.index)
        }
    }

    getIndicatorTitle(indicator) {
        let indicatorTitle = indicator.indicatorSelected != '' ? indicator.indicatorSelected : 'اندیکاتور'
        return indicatorTitle
    }

    render() {
        console.log(this.state.indicators)
        let paramModals = this.state.indicators.map((v, i) => <ParamModal paramModalToggle={(index) => this.paramModalToggle(index)} 
                index={i} addParams={(i,params) => this.changeParams(i, params)} items={this.state.items}
                showParamModal={v.showParamModal} indicatorSelected={v.indicatorSelected} params={v.params}/>)

        let paramNames = this.state.indicators.map((v, i) => 
            Object.entries(v.params).length === 0 ? 'پارامترها' : [
                v.params.m ? v.params.m : "", v.params.n ? v.params.n : "",
                v.params.p ? v.params.p : "", v.params.q ? v.params.q : "", v.params.lag ? v.params.lag : ""
            ].filter(v => v != "").join(', '))

        let mathModals = this.state.maths.map((v, i) => <MathModal  mathSigns={this.state.mathSigns}
            mathModalToggle={() => this.mathModalToggle(i)} showMathModal={this.state.maths[i].showMathModal}
            onMathSelected={(result) => this.mathSelected(result.math, result.index)} index={i} />)
        let indicatorModals = this.state.indicators.map((v, i) => 
            <CategoryModal onCategoryInfo={(tag, indicator) => this.indicatorForModal(tag, indicator)} 
                subModalToggle={(index) => this.subModalToggle(index)} modalToggle={this.state.indicators[i].subModalToggle} 
                items={this.state.items} selectedIndicator={v} tag={i} />)
        
        let boxitems = this.state.indicators.map((v, i) =>
             <div>
                    <div className="createstr-inline mr-3 pb-2">
                        <p>اندیکاتور</p>
                        <Button color="info" className="strategy-btn" onClick={(e) => this.openCategoryClick(i)}>{this.getIndicatorTitle(v)}</Button>
                    </div> 
                    <div className="createstr-inline mr-3 pb-2">
                        <p>پارامترها</p>
                        <Button color="info" className="strategy-btn" onClick={(e) => this.paramModalToggle(i)}>{paramNames[i]}</Button>
                    </div>
                    {i < this.state.maths.length ? <div className="createstr-inline mr-3 pb-2">
                        <p>مقایسه/عملگر</p>
                        <Button color="info" className="strategy-btn" onClick={() => this.mathModalToggle(i)}>{
                                this.state.maths[i].info.Name == '' ? "اپراتور" : this.state.maths[i].info.Name 
                            }</Button>
                    </div> : <div></div>}
            </div>
        )

        return (
            <div>
                <div className="strategy-box px-2">
                    <div>
                        <div>
                            {boxitems}
                            {paramModals}
                            {mathModals}
                            {indicatorModals}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StrategyComponent