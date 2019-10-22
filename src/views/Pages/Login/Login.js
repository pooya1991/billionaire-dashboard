import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ForgetPassword from './ForgetPassword'
import SnackBar from "../../Snack/Snack";
import {
    Button,
    Dropdown, DropdownItem, DropdownMenu,
    DropdownToggle,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label, Modal,
    ModalBody, ModalFooter,
    ModalHeader
} from 'reactstrap'
import SimpleReactValidator from "simple-react-validator";
import '../../../scss/login.scss'
import '../../../scss/_custom.scss'

class Login extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.validator = new SimpleReactValidator({
        element: message => <div className="invalid-custom-feedback">{message}</div>,
        messages:{
        email:'لطفا ایمیل را صحیح وارد کنید',
        min:'کلمه عبور حداقل باید ۶ حرف باشد'
      }
    })
    this.state = {
      messageSnack:'',
      typeSnack:'',
      openSnack:false,
      showModalForget:false,
      isAuthenticated: false,
      email: '',
      password: '',
    }
    this.setOpenSnack = this.setOpenSnack.bind(this)
    this.setTypeSnack = this.setTypeSnack.bind(this)
    this.setMessageSnack = this.setMessageSnack.bind(this)
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




  handleClick() {

    var data = {
      email: this.state.email,
      password: this.state.password,
    }
    
    fetch('api/SignIn/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((r) => r.json()).then(r => {
        if(r.meta.StatusCode == 200) {
          this.props.onTokenReceived(r.data.Token)
          this.setState({
            isAuthenticated: true
          })
        }
        else{
          throw r.meta;
        }
      }
    ).catch(r => {
        this.setOpenSnack(true)
        this.setMessageSnack(r.messageFa)
        this.setTypeSnack("error")
      })
  }
  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/" />
    }
    return (
      <div className="container-fluid">
        <SnackBar message={this.state.messageSnack} type={this.state.typeSnack}
                  open={this.state.openSnack} setOpen={this.setOpenSnack}/>
        <div className="row no-gutter">
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-5 text-center">ورود به حساب کاربری</h3>
                    <Form>
                      <div>
                        <FormGroup className="form-label-group">
                          <Input type="username" id="email" name="email" value={this.state.email} className="form-control" required autoFocus onChange={(e) => this.handleChange(e)}/>
                          <Label for="email">ایمیل</Label>
                          {this.validator.message("email",this.state.email,'email')}

                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup className="form-label-group">
                          <Input type="password" id="password" name="password" value={this.state.password} className="form-control" required onChange={(e) => this.handleChange(e)}/>
                          <Label for="password">کلمه عبور</Label>
                          {this.validator.message("password",this.state.password,'min:6')}
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup  className="custom-control custom-checkbox mb-3 ml-3">
                          <Input type="checkbox" className="custom-control-input" id="rememberPass"/>
                          <Label className="custom-control-label" for="rememberPass">مرا به خاطر داشته باش</Label>
                        </FormGroup>
                      </div>
                      <Button color="success" className="btn-block btn-login font-weight-bold mb-2" onClick={this.handleClick}>ورود</Button>
                      <div className="text-center mt-4">
                        <a className="small forgetPass-link" onClick={() =>{this.setState({showModalForget: !this.state.showModalForget})}}>کلمه عبور خود را فراموش کرده اید؟</a>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        </div>
        <ForgetPassword name="email"
                        setMessageSnack={this.setMessageSnack} setTypeSnack={this.setTypeSnack} setOpenSnack={this.setOpenSnack}
                        onChange={this.handleChange} toggle={() =>{this.setState({showModalForget: !this.state.showModalForget})}} isOpen={this.state.showModalForget}/>
      </div>

    );
  }
}

export default Login;
