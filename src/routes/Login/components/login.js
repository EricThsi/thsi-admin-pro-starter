import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import {
  Layout,
  Spin,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message
} from 'antd'
import { Helmet } from 'react-helmet'
import Header from 'vctns/HeaderContainer'
import Footer from 'vcms/Footer'

import './login.scss'

const { Content } = Layout
const FormItem = Form.Item

class Login extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    handleLogin: PropTypes.func.isRequired,
    form: PropTypes.object,
    redirectPath: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    intl: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      focused1: false,
      redirectPath: props.redirectPath
    }
    // console.log(props.intl)
  }

  componentWillMount = () => {
    const { redirectPath } = this.state
    if (this.props.isAuthenticated) {
      if (redirectPath) {
        browserHistory.push(redirectPath)
      } else {
        browserHistory.push('/')
      }
    }
  }

  handleLoginSubmit = (evt) => {
    const { redirectPath } = this.state
    evt.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        this.props.handleLogin(values, () => {
          if (redirectPath) {
            browserHistory.push(redirectPath)
          } else {
            browserHistory.push('/admin/dashboard')
          }
        }, (msg) => {
          message.error(msg)
        })
      }
    })
  }

  render () {
    const {
      isLoading,
      form,
      intl
    } = this.props

    const {
      getFieldDecorator
    } = form

    const {
      formatMessage
    } = intl

    // console.log(this.props)

    return (
      <Layout className='layout'>
        <Helmet>
          <title>
            {formatMessage({
              id: 'login.title'
            })}
          </title>
        </Helmet>
        <Header />
        <Content>
          <div className='page-layout__viewport'>
            <Row>
              <Col xs={0} md={8} />
              <Col md={8}>
                <h2 className='page-title'>
                  {formatMessage({
                    id: 'login.title'
                  })}
                </h2>
                <div className='login-form-wrapper'>
                  <Spin spinning={isLoading}>
                    <Form onSubmit={this.handleLoginSubmit} className='login-form'>
                      <FormItem>
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            }
                          ],
                        })(
                          <Input prefix={<Icon type='mail' style={{ fontSize: 13 }} />} placeholder='Email' />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [{
                            required: true,
                            message: 'Please input your Password!'
                          }],
                        })(
                          <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='Password' />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('remember', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(
                          <Checkbox>Remember me</Checkbox>
                        )}
                        <Link className='login-form-forgot' to='/reset-psw'>Forgot password</Link>
                        <Button type='primary' htmlType='submit' className='login-form-button'>
                          Login
                        </Button>
                        Or <Link to='/register'>register now!</Link>
                      </FormItem>
                    </Form>
                  </Spin>
                </div>
              </Col>
              <Col xs={0} md={8} />
            </Row>
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm
