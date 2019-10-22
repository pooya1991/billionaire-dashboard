import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Button} from 'reactstrap'

class Strategy extends Component {
    constructor() {
        super()
        this.state = {
            stgs: [],
            createStrategyClicked: false,
        }

        this.getItems(localStorage.getItem('token'))
        this.createStrategyClicked = this.createStrategyClicked.bind(this)
    }

    getItems(token) {
        fetch("/api/UserStrategies/", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '.concat(token) 
            }
        }).then(r => r.json())
        .then(r => {
            this.setState({
                stgs: r.data
            })
        }).catch(err => console.log(err))
    }

    createStrategyClicked() {
        this.setState({
            createStrategyClicked: true
        })
    }

    render() {
        let createStrategyElement
        if (this.state.createStrategyClicked) {
            createStrategyElement = <Redirect to="/strategies/new"></Redirect>
        }
        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {createStrategyElement}
                    <Button color="info" className="strategy-btn" onClick={this.createStrategyClicked}>ساخت استراتژی جدید</Button>
                    <div className="str-table">
                        <div className="str-table-head">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="str-table-col1">نام استراتژی</th>
                                        <th className="str-table-col2">ویرایش</th>
                                        <th className="str-table-col2">حذف</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="str-table-body">
                            <table>
                                <tbody>
                                    {this.state.stgs.map (r => <tr>
                                        <td className="str-table-col1">{r.StrategyName}</td>
                                        <td align="center" className="str-table-col2"><Button color="success" className="strategy-table-btn" onClick="">ویرایش</Button></td>
                                        <td align="center" className="str-table-col2"><Button color="danger" className="strategy-table-btn-del" onClick="">حذف</Button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Strategy