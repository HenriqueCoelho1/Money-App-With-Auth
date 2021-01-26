import './auth.css'
import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {login, signup} from './authActions.js'
import Row from '../common/layout/row.jsx'
import Grid from '../common/layout/grid.jsx'
import If from '../common/operator/if.jsx'
import Messages from '../common/msg/messages.jsx'
import Input from '../common/form/input.jsx'


class Auth extends Component{
    constructor(props){
        super(props)
        this.state = {loginMode: true}
    }
    changeMode(){
        this.setState({loginMode: !this.state.loginMode})
    }

    onSubmit(values){
        const {login, signup} = this.props
        this.state.loginMode ? login(values) : signup(values)
    }

    render(){
        const {loginMode} = this.state
        const {handleSubmit} = this.state
        return(
            <div className="login-box">
                <div className="login-logo"><b> My</b> Money</div>
                <div className="login box body">
                    <p className="login-box-msg">Bem vindo!</p>
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <Field component={Input} type="input" name="name"
                        placeholder="Nome" icon='user' hide={loginMode}/>
                        <Field component={Input} type="input" name="email"
                        placeholder="Email" icon='envelope'/>
                        <Field component={Input} type="password" name="password"
                        placeholder="Senha" icon='lock'/>
                        <Field component={Input} type="password" name="confirm_password"
                        placeholder="Confirmar senha" icon='lock' hide={loginMode}/>
                        <Row>
                            <Grid cols="4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">
                                {loginMode ? 'Entrar' : 'Registrar'}
                                </button>
                            </Grid>
                        </Row>
                    </form>
                    <br/>
                    <a onClick={() => this.changeMode()}>
                        {loginMode ? 'Novo usuario? Regristre-se aqui!' : 
                        'Ja eh cadastrado? Entrar aqui'}
                    </a>
                </div>
                <Messages/>
            </div>

        )
    }
}

Auth = reduxForm({form: 'authForm'})(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({login, signup}, dispatch)
export default connect(null, mapDispatchToProps)(Auth)