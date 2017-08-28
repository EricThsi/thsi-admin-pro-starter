import React, { Component } from 'react'
import { Link } from 'react-router'
import { Layout, Menu, Icon, Breadcrumb } from 'antd'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import moment from 'moment'
import Header from 'vctns/HeaderContainer'

// import './Admin.scss'

const {
  Footer,
  Sider,
  Content
} = Layout

const { SubMenu } = Menu

const SiderMenuConfig = {
  '/admin': ['dash'],
  '/admin/users': ['user-list', 'users'],
  '/admin/reports': ['total-report', 'reports'],
  '/admin/reports/total': ['total-report', 'reports'],
  '/admin/settings': ['settings']
}

class Admin extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    routes: PropTypes.array,
    params: PropTypes.object,
    handleValidateToken: PropTypes.func,
    siderCollpased: PropTypes.bool,
    location: PropTypes.object,
    siderChange: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      siderKeys: SiderMenuConfig[props.location.pathname],
      thisYear: moment().format('YYYY')
    }
    this.props.handleValidateToken()
  }

  onCollapse = (collapsed) => {
    // console.log(collapsed)
    this.props.siderChange(collapsed)
  }

  itemRender = (route, params, routes, paths) => {
    const currIndex = routes.indexOf(route)
    const last = currIndex === routes.length - 1
    const first = currIndex === 0

    if (first) {
      return <Link key={currIndex} to={'/' + paths.join('/')}><Icon type='home' /></Link>
    } else {
      return last ? <span key={currIndex}>{route.path}</span>
                  : <Link key={currIndex} to={'/' + paths.join('/')}>{route.path}</Link>
    }
  }

  render () {
    const {
      children,
      siderCollpased,
      routes,
      params
    } = this.props

    const {
      siderKeys,
      thisYear
    } = this.state
    // console.log(siderKeys)
    // console.log(siderCollpased)

    return (
      <Layout className='page-layout__viewport'>
        <Helmet>
          <title>Admin</title>
        </Helmet>
        <Header />
        <Layout className='page-layout__container'>
          <Sider
            collapsible
            collapsed={siderCollpased}
            onCollapse={this.onCollapse}
            style={{
              background: '#fff'
            }}
          >
            <Menu
              defaultSelectedKeys={siderKeys}
              selectedKeys={siderKeys}
              defaultOpenKeys={siderKeys}
              inlineCollapsed={false}
              mode='inline'
            >
              <Menu.Item key='dash'>
                <Link to='/admin/dashboard'>
                  <Icon type='line-chart' />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key='users'
                title={<span><Icon type='team' /><span>Users</span></span>}
              >
                <Menu.Item key='user-list'>
                  <Link to='/admin/users'>List</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='reports'
                title={<span><Icon type='file-text' /><span>Reports</span></span>}
              >
                <Menu.Item key='total-report'>
                  <Link to='/admin/reports/total'>Total Reports</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key='settings'>
                <Link to='/admin/settings'>
                  <Icon type='setting' />
                  <span>Settings</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Breadcrumb routes={routes} params={params} itemRender={this.itemRender} />
            <Content>
              {children}
            </Content>
            <Footer style={{
              textAlign: 'center'
            }}>
              VM React Admin ©{thisYear} Created by PlusWhite
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
