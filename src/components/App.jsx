import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder } from '../actions';



class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : '',
            dueDate : ''
        }
    }

    addReminder(){
        console.log('this.state.dueDate', this.state.dueDate);
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id){
        this.props.deleteReminder(id);
    }

    renderReminders(){
        const { reminders } = this.props;
        return(
            <ul className="list-group">
                <h3>Current Reminders:</h3>
                {
                    reminders.map(reminder => {
                        return(
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">{reminder.text}</div>
                                <div className="list-item delete-button"
                                onClick={() => this.deleteReminder(reminder.id)}>&#x2715;</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render(){
        return(
            <div className="app row">
                <div className="col-md-4 no-margin-left">
                    <div className="side-bar">
                        <div className="title">
                            React Reminders
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <input className="form-control" 
                                placeholder="I have to.." 
                                type="text"
                                onChange={event => this.setState({text : event.target.value})}
                                />
                                <input className="form-control" 
                                type="datetime-local"
                                onChange={event => this.setState({dueDate : event.target.value})}
                                />
                            </div>
                            <button type="button" 
                            className="btn btn-success"
                            onClick={() => this.addReminder()}
                            >Add Reminder</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 side-bar-right">
                    { this.renderReminders() }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        reminders : state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder })(App);