import React, { Component } from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

export default class MyTag extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
            checked: true
        }
    }

    handleChange(checked) {
        this.setState({checked}) 
	}

    render() {
        return (
        <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange.bind(this)} />
        )
    }
}