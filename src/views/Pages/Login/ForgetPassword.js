import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import React, { Component } from 'react'
import SimpleReactValidator from "simple-react-validator";
import '../../../scss/_custom.scss'
import SnackBar from "../../Snack/Snack";
class ForgetPassword extends Component {
    constructor(props) {
        super(props)

        this.state={
            email:"",
        }
        this.validator = new SimpleReactValidator({
            element: message => <div className="invalid-custom-feedback">{message}</div>,

            messages:{
            email:'لطفا ایمیل را صحیح وارد کنید',
            min:'کلمه عبور حداقل باید ۶ حرف باشد'

          }
        })
    }
    handleChange(input) {
        this.setState({
          [input.target.name]: input.target.value,
        })
        //if(this.validator.fieldValid([input.target.name])) {
        //  input.target.classList.remove("is-invalid");
        //}else {
          this.validator.showMessageFor(input.target.name);
        //  input.target.classList.add("is-invalid")
        //}
      }
    handleClick() {

      var data = {
        email: this.state.email,
        url:"https://panel.billiona.ir/ChangePassword",
      }

      fetch('api/SendForget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((r) => r.json()).then(r => {
          if (r.meta.message == "done"){
            this.props.setTypeSnack("success")
            this.props.setMessageSnack("لینک برای شما ارسال شد")
            this.props.setOpenSnack(true)

          }
          else {
              throw r
          }
        }
      ).catch(r => {
          this.props.setTypeSnack("error")
          this.props.setMessageSnack("لطفا مجدد تلاش کنید")
          this.props.setOpenSnack(true)
      })
    }



    render() {
        return(
        <div>
            <Modal toggle={() => this.props.toggle()} isOpen={this.props.isOpen} o>
                <ModalHeader>ایمیل خود را وارد نمایید</ModalHeader>
                <ModalBody>
                    <div className=" align-items-center ">
                        <Form>
                            <div>
                                <FormGroup className="form-label-group">
                                    <Input type="username" id="email" name="email"
                                           className="form-control" required autoFocus
                                           onChange={(e) => this.handleChange(e)}/>
                                    <Label for="email">ایمیل</Label>
                                    {this.validator.message("email", this.state.email, 'email')}

                                </FormGroup>
                            </div>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" className="btn-block btn-login font-weight-bold mb-2" onClick={() => this.handleClick()}>ارسال لینک</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}
export default ForgetPassword