import {Button} from "reactstrap";
import React from "react";

class IndicatorAndParam extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title:""
        }
    }
    static getDerivedStateFromProps(props,state){
        return{

            title:props.getIndicatorTitle(props.Indicator)
        }
    }

    render() {
        return(
            <div>

                <div className="createstr-inline mr-3 pb-2">
                    <p>اندیکاتور</p>
                    <Button color="info" className="strategy-btn" onClick={(e) => this.props.openCategoryClick(this.props.i)}>{this.state.title}</Button>
                </div>
                <div className="createstr-inline mr-3 pb-2">
                    <p>پارامترها</p>
                    <Button color="info" className="strategy-btn" onClick={(e) => this.props.paramModalToggle(this.props.i)}>{this.props.paramNames[this.props.i]}</Button>
                </div>
            </div>

        )
    }
}
export default IndicatorAndParam;