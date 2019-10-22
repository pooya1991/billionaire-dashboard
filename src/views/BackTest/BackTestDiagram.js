import React from 'react'
import {Label, Table } from 'reactstrap'
class BackTestDiagram extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let overal_result = this.props.overal_result
        let tableItems = this.props.details.map(v =>
            <tr className="backtest-table-col">
            <td>{v.RowNumber}</td>
            <td>{v.DateTime}</td>
            <td>{v.Side == 'B' ? 'خرید' : 'فروش'}</td>
            <td>{v.Price}</td>
            <td>{v.OrderVolume}</td>
            <td>{v.OrderValue}</td>
            <td>{v.ProfitOrLoss ? v.ProfitOrLoss : "-"}</td>
            <td>{v.PreservePeriods ? v.PreservePeriods : "-"}</td>
            <td>{v.BuyRowNumber}</td>
            <td>{v.Return ? v.Return * 100 : 0}</td>
        </tr>)

        return (
            <div className="row backtest-box backtest-label-group mt-4 mb-3">
                <div className="col-auto">
                    <div className="">
                        <label>حداکثر معاملات باز همزمان</label>
                        <Label className="backtest-label">{overal_result.MaxOpenPosition}</Label>
                    </div>
                    <div className="">
                        <label>درصد موفقیت</label>
                        <Label className="backtest-label">{overal_result.SuccessRate * 100}</Label>
                    </div>
                    <div className="">
                        <label>کل گردش مالی</label>
                        <Label className="backtest-label">{overal_result.TurnOver}</Label>
                    </div>
                </div>
                <div className="col-auto backtest-info-col2">
                    <div className="">
                        <label>بیشترین افت قیمت پیاپی</label>
                        <Label className="backtest-label">{overal_result.MaxConsecutiveDecline}</Label>
                    </div>
                    <div className="">
                        <label>متوسط بازده کل معاملات سودزا</label>
                        <Label className="backtest-label">تست</Label>
                    </div>
                    <div className="">
                        <label>متوسط بازده معاملات بسته شده با زیان</label>
                        <Label className="backtest-label">{overal_result.ActiveToDeactiveDaysRatio}</Label>
                    </div>
                </div>
                <div className="col-auto backtest-info-col1">
                    <div className="">
                        <label>نسبت تعداد روزهای در معامله به تعداد روز های انتظار</label>
                        <Label className="backtest-label">{}</Label>
                    </div>
                    <div className="">
                        <label>بازدهی کل</label>
                        <Label className="backtest-label">{overal_result.TurnOver}</Label>
                    </div>
                    <div className="">
                        <label>حجم کل معاملات</label>
                        <Label className="backtest-label">{overal_result.TotalVolume}</Label>
                    </div>
                </div>
                <Table responsive className="mt-2">
                    <thead className="backtest-table-thead">
                    <tr className="backtest-table-col backtest-table-head">
                        <th>ردیف</th>
                        <th>تاریخ</th>
                        <th>نوع معامله</th>
                        <th>قیمت</th>
                        <th>حجم معامله</th>
                        <th>ارزش</th>
                        <th>سود یا زیان</th>
                        <th>دوره نگهداری</th>
                        <th>شماره ردیف خرید</th>
                        <th>بازده</th>
                    </tr>
                    </thead>
                    <tbody className="backtest-table-body">
                    {tableItems}
                    </tbody>
                </Table>
            </div>

        )


    }
}
export default BackTestDiagram