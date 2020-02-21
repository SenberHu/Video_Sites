import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import VideoList from '../home/video-list'
import Nav from '../home/nav'
import api from './../../api'
import { Layout, Menu, Icon, DatePicker, Input, Button} from 'antd'
import DynamicFieldSet from './addtopic.jsx' 


const { Header, Content, Footer, Sider,  } = Layout;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class Person extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //navs: ['我的收藏', '我喜欢的'],
      //navId: 0,
      //lovesVideos: [],
      //collectVideos: [],

    }
  }

  componentDidMount() {
    const { userId } = this.props

    if (!userId) {
			hashHistory.push('/login')
    }
    
    this.getCollectVideos()
  }

  getLoveVideos () {
    const { userId } = this.props
    const that = this

    api.getlLoveVideosFetch(`userId=${userId}`).then(res => {
      that.setState({
        lovesVideos: res.data
      })
    })
  }


  getCollectVideos () {
    const { userId } = this.props
    const that = this

    api.getlCollectVideosFetch(`userId=${userId}`).then(res => {
      console.log(res)
      that.setState({
        collectVideos: res.data
      })
    })
  }

  changeNav (index) {
    if (index) {
      this.getLoveVideos()
    } else {
      this.getCollectVideos()
    }

    this.setState({
      navId: index
    })
  }


  render() {
    // const { navs, lovesVideos, collectVideos, navId } = this.state
    // const showVideos = navId ? lovesVideos : collectVideos

    

    // console.log(showVideos)

    return (
      <section className="person-center">
       
        <Layout>
            <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
              }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Icon type="user" />
                  <span className="nav-text">Create room</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span className="nav-text">Look back</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span className="nav-text">Scoring feedback</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="bar-chart" />
                  <span className="nav-text">Discussion</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="cloud-o" />
                  <span className="nav-text">nav 5</span>
                </Menu.Item>
                <Menu.Item key="6">
                  <Icon type="appstore-o" />
                  <span className="nav-text">nav 6</span>
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout style={{ marginLeft: 200 }}>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'left' }}>
                  
                  <br />
                    <DatePicker className="DatePicker" size="large" onChange={onChange} />    
                  <br />
                    {/* <WrappedDynamicFieldSet /> */}
                  <br />
                    <Input width="450" placeholder="Create classroom code" />
                  <br />
                  <br />
                    Topics:
                  <br />
                    <Input placeholder="Enter topic name" />
                  <br />
                  <br />
                    <Input placeholder="Enter topic name" />
                  <br />
                  <br />
                    <Input placeholder="Enter topic name" />
                  <br />
                  <br />
                    <Input placeholder="Enter topic name" />
                  <br />
                  <br />
                    <Input placeholder="Enter topic name" />
                  <br />
                  <br />
                    <Input placeholder="Enter topic name" />
                  <br />
                  <br />
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                      Clear
                    </Button>
                  <br />
                            
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  }
}

export default connect(
  mapStateToProps
)(Person)