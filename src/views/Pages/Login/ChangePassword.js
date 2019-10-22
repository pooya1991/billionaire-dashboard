import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Button, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import SimpleReactValidator from "simple-react-validator";
import '../../../scss/login.scss'
import '../../../scss/_custom.scss'
import SnackBar from "../../Snack/Snack";
class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    var url = window.location.href.split("/ChangePassword/")
    this.user_id = url[url.length-1]
    this.validator = new SimpleReactValidator({
    element: message => <div className="invalid-custom-feedback">{message}</div>,
    messages:{
       min:'کلمه عبور حداقل باید ۶ حرف باشد'

    },
   validators: {
       equalPass: {  // name the rule
           message: "",
           rule: (val, params, validator) => {
               return this.state.password == this.state.repassword
           },
           required: true
       },
   }

    })
    this.state = {
      password: '',
      repassword: '',
      openSnack:false,
      typeSnack:'',
      messageSnack:''
    }
    this.setOpenSnack = this.setOpenSnack.bind(this)
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
    if(!this.validator.allValid()){
        return
    }

    var data = {
      user_id: this.user_id,
      password: this.state.password,
    }

    fetch('/api/ValidateForget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((r) => r.json()).then(r => {
        if(r.meta.message=="success") {
            this.setMessageSnack("رمز شما با موفقیت تغییر کرد")
            this.setOpenSnack(true)
            this.setTypeSnack("success")
        }
        else {
            throw r;
        }
      }
    ).catch(r => {
            this.setMessageSnack("مشکلی به وجود آمده است")
            this.setOpenSnack(true)
            this.setTypeSnack("success")
      })
  }
  setOpenSnack(openSnack){
      this.setState({
          openSnack:openSnack
      })
  }
  setMessageSnack(messageSnack){
      this.setState({
          messageSnack:messageSnack
      })
  }
  setTypeSnack(typeSnack){
      this.setState({
          typeSnack:typeSnack
      })

  }
  render() {
    return (
      <div className="container-fluid">
          <SnackBar
              type={this.state.typeSnack}
              message={this.state.messageSnack}
              open={this.state.openSnack}
              setOpen={this.setOpenSnack}
          />
        <div className="row no-gutter">
          <div className="col-12">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-5 text-center">فراموشی رمز عبور</h3>
                    <Form>
                      <div>
                        <FormGroup className="form-label-group">
                          <Input id="password" name="password" value={this.state.password} className="form-control" required autoFocus onChange={(e) => this.handleChange(e)}/>
                          <Label for="password">رمز عبور</Label>
                          {this.validator.message("password",this.state.password,'min:6')}
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup className="form-label-group">
                          <Input id="repassword" name="repassword" value={this.state.repassword} className="form-control" required onChange={(e) => this.handleChange(e)}/>
                          <Label for="repassword">تکرار رمز عبور</Label>
                          {this.validator.message("repassword",this.state.repassword,'min:6|equalPass')}
                        </FormGroup>
                      </div>
                      <Button color="success" className="btn-block btn-login font-weight-bold mb-2" onClick={this.handleClick}>ثبت</Button>
                      <div className="text-center mt-4">
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
