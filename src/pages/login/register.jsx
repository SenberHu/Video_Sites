import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import api from './../../api'

export default class Register extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
		const { userId } = nextProps

		if (userId) {
			hashHistory.push('/')
		}
	}

	componentDidMount() {
		const { userId } = this.props

		if (userId) {
			hashHistory.push('/')
		}
	}

	register() {
		const username = this.refs.username.value
		const password = this.refs.password.value

		if (!username || !password) {
			return
		}

		api.registerFetch(`username=${username}&password=${password}`).then(res => {
			const { success, msg = '注册失败' } = res

			if (success) {
				hashHistory.push('/')
			} else {
				alert(msg)
			}
		}).catch(err => {
			console.log(res)
			alert(err)
		})
	}

	render() {
		return (
			<section className="person">
				<div className="login">
					<div className="login-box">
						<h2 className="login-h">Register</h2>
						<input type="text" className="input-item" placeholder="username" ref="username" />
						<input type="password" className="input-item" placeholder="password" ref="password" />
						<p className="age-check">
							<span>Select user type: </span>
							Lecture<input type="checkbox" className="check-box" value="0"/>
							Student<input type="checkbox" className="check-box" value="1"/>
						</p>
						<input type="submit" className="login-btn" value="Register" onClick={this.register.bind(this)} />
						<p className="login-bottom">Have account?<Link to="/login">Login now</Link></p>
					</div>
				</div>
			</section>
		)
	}
}