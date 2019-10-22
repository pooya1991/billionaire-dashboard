import React, { Component } from 'react'
import { Button, Card, CardBody, CardFooter,Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormGroup,FormFeedback } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import '../../../scss/register.scss'
import '../../../scss/_custom.scss'
import SimpleReactValidator from "simple-react-validator";
import SnackBar from "../../Snack/Snack";
class Register extends Component {

  constructor() {
    super()
    this.validator=new SimpleReactValidator({
        element: message => <div className="invalid-custom-feedback">{message}</div>,
        messages:{
          required:'این فیلد اجباری است.',
          email:'لطفا ایمیل را صحیح وارد کنید',
          min:'کلمه عبور حداقل باید ۶ حرف باشد',
          equalPass:'کلمه عبور با تکرار کلمه عبود تطابق ندارد.',
          default:'این فیلد صحیح نیست.',

        },
        validators: {
        equalPass: {  // name the rule
          message:"",
          rule: (val, params, validator) => {
            return this.state.password == this.state.repassword
          },
          required: true
        },
        optional: {  // name the rule
          message:"",
          rule: (val, params, validator) => {
            return true
          },
          required: true
        }
      }
      }
    );
    this.state = {
      messageSnack:"",
      openSnack:false,
      typeSnack:'',
      name: "",
      lastname: "",
      email: "",
      phone: "",
      brokername: "",
      brokercode: "",
      password: "",
      repassword: "",
      signupComplete: false,
      loading:false
    }
    this.setOpenSnack = this.setOpenSnack.bind(this)
  }

  handleChange(input) {

    this.setState({
      [input.target.name]: input.target.value
    })
    //if(this.validator.fieldValid([input.target.name])) {
    //  input.target.classList.remove("is-invalid");
    //}else {
      this.validator.showMessageFor(input.target.name);
    //  input.target.classList.add("is-invalid")
    //}

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
  submitClicked() {

    if(!this.validator.allValid()){
      return
    }
    this.setState({loading:true})
    let data = {
      first_name: this.state.name,
      last_name: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      broker: this.state.brokername,
      broker_code: this.state.brokercode,
    };
    fetch('/api/SignUp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(r => r.json())
      .then(r => {
      this.setState({loading:false})
      r = r.meta;
      if(r.StatusCode == 200){
        this.setState({
          signupComplete: true,
        })
      } else {
        throw r
      }
    })
    .catch(r => {
      this.setTypeSnack("error")

      this.setMessageSnack(r.messageFa)
      this.setOpenSnack(true)

      })
  }


  render() {

    let redirect
    if (this.state.signupComplete) {
      redirect = <Redirect to='/login'/>
    }

    return (
        <div className="page-wrap">
        {redirect}
        <SnackBar open={this.state.openSnack} message={this.state.messageSnack}
                  type={this.state.typeSnack} setOpen={this.setOpenSnack}/>
          <div className="wrap">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">ثبت نام</h2>
                <Form>
                  <div className="reg-row">
                    <div className="reg-col">
                      <div className="reg-input-group">
                        <FormGroup>
                          <label className="reg-label">نام</label>
                          <Input className="reg-input reg-input-style" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} ></Input>
                          {this.validator.message("name",this.state.name,'required')}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="reg-col">
                      <div className="reg-input-group">
                        <FormGroup>
                          <label className="reg-label">نام خانوادگی</label>
                          <Input className="reg-input reg-input-style" name="lastname" value={this.state.lastname} onChange={(e) => this.handleChange(e)}></Input>
                          {this.validator.message("lastname",this.state.lastname,'required')}
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  <div className="reg-row">
                    <div className="reg-col">
                      <div className="reg-input-group">
                        <FormGroup>
                          <label className="reg-label">ایمیل</label>
                          <Input className="reg-input reg-input-style" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)}></Input>
                          {this.validator.message("email",this.state.email,'email')}
                        </FormGroup>

                      </div>
                    </div>
                    <div className="reg-col">
                      <div className="reg-input-group">
                        <label className="reg-label">شماره تلفن همراه</label>
                        <Input className="reg-input reg-input-style" name="phone" value={this.state.phone} onChange={(e) => this.handleChange(e)} ></Input>
                        {this.validator.message("phone",this.state.phone,'phone')}
                      </div>
                    </div>
                  </div>
                  <div className="reg-row">
                    <div className="reg-col">
                      <div className="reg-input-group">
                        <FormGroup>
                          <label className="reg-label">نام کارگزاری (اختیاری)</label>
                          <Input className="reg-input reg-input-style" name="brokername" value={this.state.brokername} onChange={(e) => this.handleChange(e)}></Input>
                          {this.validator.message("brokername",this.state.brokername,'optional')}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="reg-col">
                      <div className="reg-input-group">
                        <FormGroup>

                          <label className="reg-label">کد بورسی (اختیاری)</label>
                          <Input className="reg-input reg-input-style" name="brokercode" value={this.state.brokercode} onChange={(e) => this.handleChange(e)}></Input>
                          {this.validator.message("brokercode",this.state.brokercode,'optional')}
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                    <div className="reg-input-group">
                      <FormGroup>
                          <label className="reg-label">کلمه عبور</label>
                          <Input type="password" className="reg-input reg-input-style" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)}></Input>
                          {this.validator.message("password",this.state.password,'min:6')}
                      </FormGroup>

                    </div>
                    <div className="reg-input-group">
                      <FormGroup>
                        <label className="reg-label">تکرار کلمه عبور</label>
                        <Input type="password" className="reg-input reg-input-style" name="repassword" value={this.state.repassword} onChange={(e) => this.handleChange(e)}></Input>
                        {this.validator.message("repassword",this.state.repassword,'equalPass')}
                      </FormGroup>
                    </div>
                    <div className="reg-btn-group">'
                        <Button color="success" className="reg-btn" onClick={() => this.submitClicked()}>
                          {this.state.loading ? <div><i className="fa fa-spinner fa-spin" /> لطفا صبر کنید</div> : "ثبت نام" }
                        </Button>

                    </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
export default Register;
