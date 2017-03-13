import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment-timezone';


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : '',
            dueDate : '',
            priority : 'Low'
        }
    }

    addReminder(){
        console.log('this.state.dueDate', this.state.dueDate);
        this.props.addReminder(this.state.text, this.state.dueDate, this.state.priority);
    }

    deleteReminder(id){
        this.props.deleteReminder(id);
    }

    clearReminders(){
        this.props.clearReminders();
    }

    getPriority(priority){
        return 'priority-' + priority;
    }

    renderReminders(){
        const { reminders } = this.props;
        return(
            <ul className="list-group todo-list">
                <h3>Current Reminders:</h3>
                <button className="btn btn-danger"
                onClick={() => this.clearReminders()}
                >Clear All</button>
                {
                    reminders.map(reminder => {
                        return(
                            <li key={reminder.id} className={this.getPriority(reminder.priority) + ' list-group-item'}>
                                <div className="list-item">
                                    <div className="list-item-title">{reminder.text}</div>
                                    <div><strong>Due: </strong><em>{moment(reminder.dueDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</em></div>
                                </div>
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
                                <label htmlFor="">I have to:</label>
                                <input className="form-control" 
                                placeholder="Do this.." 
                                type="text"
                                onChange={event => this.setState({text : event.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Due On:</label>
                                <input className="form-control" 
                                type="datetime-local"
                                onChange={event => this.setState({dueDate : event.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="priority-select">Priority: </label>
                                <select className="form-control" 
                                id="priority-select"
                                onChange={event => this.setState({priority : event.target.value})}
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
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

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);