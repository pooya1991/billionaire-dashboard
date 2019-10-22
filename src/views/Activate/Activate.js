import React, {Component} from 'react'
import {
    Input,
    Button,
    Dropdown,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Label,
    FormFeedback,
    FormGroup
} from 'reactstrap'
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';
import { Redirect } from 'react-router-dom'
import {getConfig, getStrategies, getSymbols} from "../BackTest/getConfigs";
import SimpleReactValidator from "simple-react-validator";
import UncontrolledNavDropdown from "reactstrap/es/UncontrolledNavDropdown";
import '../../scss/_custom.scss'

class Activate extends Component {


    constructor() {

        super()

        this.validator = new SimpleReactValidator({
          element: message => <div className="invalid-custom-feedback">{message}</div>,
          messages:{
            min:'کلمه عبور حداقل باید ۶ حرف باشد',
            integer:'فقط عدد وارد کنید',
            date:'تاریخ شروع باید زود تر از تاریخ بایان باشد',
            required:"این فیلد را کامل کنید"
          },

          validators: {

              notEmpty: {  // name the rule
                  message: "",
                  rule: (val, params, validator) => {
                      return val!=""
                  },
                  required: true
              },
              date: {  // name the rule
                  message: "",
                  rule: (val, params, validator) => {return true},
                  required: true
              },
          }

        })

        this.state = {
            activated: false,
            maxPosition:'',
            selectedTimeframe: '',
            selectedReEnter: '',
            selectedTicker: '',
            selectedStrategy: '',
            endDate: '',
            selectedOrder: '',
            selectedReEnterValue: '',
            strategyItems: [],
            configs: [],
            stgs: [],
            symbols: [],
            reEnterConfig: [
                {
                  code: 'Percentage_Below',
                  name: 'درصد پایین'
                },
                {
                  code: 'PriceTick_Below',
                  name: 'ریال پایین'
                },
                {
                  code: 'Percentage_Above',
                  name: 'درصد بالا'
                },
                {
                  code: 'PriceTick_Above',
                  name: 'ریال بالا'
                },
              ],
        }


    }
    componentDidMount(){
        var token = localStorage.getItem('token')
        getStrategies(token,"stgs",this)
        getSymbols(token,"symbols",this)
        getConfig(token,"configs",this)
    }


    tickerChanged(value) {
      let item = this.state.symbols.find(v => v.CoName == value)
      let ticker = typeof item !== "undefined"  ? item : ''
      this.setState({
        selectedTicker: ticker,
      })
    }
    submitClicked() {
        if (this.validator.allValid()) {
        //    console.log("valid all")
        //    alert('You submitted the form and stuff!');


          } else {
          //  console.log("not valid all" ,this.validator.getErrorMessages())
          //    for (var key in this.validator.getErrorMessages()) {
          //        if (this.validator.getErrorMessages()[key] != null) {
          //            document.getElementsByName(key)[0].classList.add("is-invalid");
          //        }
          //    }
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
            return;
            return;
          }
        let token = localStorage.getItem('token')

        let data = {
          StgID: this.state.selectedStrategy.StrategyID,
          Share: this.state.selectedTicker.TseSIsinCode,
          Timeframe: this.state.selectedTimeframe.Code,
          EndDate: this.state.endDate,
          Vol: this.state.selectedOrder,
          ReEnterType: this.state.selectedReEnter.code,
          ReEnterAmount: this.state.selectedReEnterValue,
          MaxPos: this.state.maxPosition
        }

        fetch('/api/ActivateStrategy/', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer '.concat(token),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(r => r.json()).then(r => {
              this.setState({
                  activated: true,
              })
          }).catch(r => console.log("err",r))
    }
    handleChange(input,object) {


        if(typeof object === "undefined") {
            this.setState({
                [input.target.name]: input.target.value,
            })
        }
        else {
            this.setState({
                [input.target.name]: object,
            })
        }
        //if(this.validator.fieldValid([input.target.name])) {
        //  input.target.classList.remove("is-invalid");
        //}else {
          this.validator.showMessageFor(input.target.name);
        //  input.target.classList.add("is-invalid")
        //}

    }

    render() {
        let strategyTitle = this.state.selectedStrategy == '' ? 'انتخاب استراتژی' : this.state.selectedStrategy.StrategyName
        let timeFrameTitle = this.state.selectedTimeframe == '' ? 'انتخاب تایم فریم' : this.state.configs.find(v => v == this.state.selectedTimeframe).Name
        let reEnterTitle = this.state.selectedReEnter == '' ? 'درصد/ریال' : this.state.reEnterConfig.find(v => v == this.state.selectedReEnter).name

        let strategyItems = this.state.stgs.map((v, i) =>
            <DropdownItem name="selectedStrategy" key={i} onClick={e => this.handleChange(e,v)}>{v.StrategyName}</DropdownItem>)
        let timeframes = this.state.configs.filter(v => v.Active == '1').map((v, i) =>
            <DropdownItem name="selectedTimeframe" key={i} onClick={e => this.handleChange(e,v)}>{v.Name}</DropdownItem>)
        let reEnters = this.state.reEnterConfig.map(v =>
            <DropdownItem name="selectedReEnter" onClick={e => this.handleChange(e,v)}>{v.name}</DropdownItem>)

        let activated = this.state.activated ? <Redirect to="/" /> : <div></div>
        return (
            <div>
                {activated}
                <div className="container">
                <div className="row backtest-box">
                    <div className="col">
                        <div className="">
                            <label>انتخاب استراتژی</label>
                            <UncontrolledDropdown>
                                <DropdownToggle className="btn btn-info strategy-btn" caret>{strategyTitle}</DropdownToggle>
                                <DropdownMenu>
                                    {strategyItems}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                        <div className="backtest-input-group">
                            <FormGroup>
                                <label>نماد</label>
                                <AutoCompleteInput name="selectedTicker" items={this.state.symbols.map(v => v.CoName)}
                                    textChange={(value) => this.tickerChanged(value)}/>
                            {this.validator.message("selectedTicker",this.state.selectedTicker,'required')}
                            </FormGroup>
                        </div>
                        <div className="backtest-input-group">
                            <FormGroup>
                                <label>حجم هر اردر</label>
                                <Input name="selectedOrder" onChange={(e) => this.handleChange(e)}></Input>
                                {this.validator.message("selectedOrder",this.state.selectedOrder,'integer|required')}
                            </FormGroup>
                        </div>
                        <div className="backtest-input-group">
                            <FormGroup>
                                <label>حداکثر موقعیت</label>
                                <Input name="maxPosition" onChange={e => this.handleChange(e)}></Input>
                                {this.validator.message("maxPosition",this.state.maxPosition,'integer|required')}
                            </FormGroup>
                        </div>
                    </div>
                    <div className="col">
                        <div className="backtest-input-group">
                            <label>تایم فرم</label>
                            <UncontrolledDropdown className="d-inline-block ml-3">
                                <DropdownToggle className="btn btn-info strategy-btn" caret>{timeFrameTitle}</DropdownToggle>
                                <DropdownMenu>
                                    {timeframes}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                        <div className="backtest-input-group">
                            <FormGroup>
                                <label>طول عمر استراتژي</label>
                                <Input type="date" name="endDate" id="endDate" onChange={(e) => this.handleChange(e)}></Input>
                                {this.validator.message("endDate",this.state.endDate,'date')}
                            </FormGroup>
                        </div>

                        <div className="backtest-input-group">
                            <FormGroup>
                                <Input type="checkbox" className="backtest-checkbox-topmargin"></Input>
                                <label className="pl-3">ورود مجدد هر</label>
                                <UncontrolledDropdown  className="d-inline-block ml-3">
                                    <DropdownToggle className="btn btn-info strategy-btn" caret>{reEnterTitle}</DropdownToggle>
                                    <DropdownMenu>
                                        {reEnters}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <Input className="d-inline-block backtest-input" name="selectedReEnterValue" onChange={(e) => this.handleChange(e)}></Input>
                                {this.validator.message("selectedReEnterValue",this.state.selectedReEnterValue,"notEmpty")}
                            </FormGroup>
                        </div>
                        <div className="backtest-input-group">
                            <Button color="success" className="strategy-table-btn d-block mx-auto center" onClick={() => this.submitClicked()}>فعال سازی</Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Activate