import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

const now = moment();
console.log(now.format("MMM Do, YYYY"));

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            description: props.expense ? props.expense.description : "",
            amount: props.expense ? (props.expense.amount / 100).toString() : "",
            note: props.expense ? props.expense.note : "",
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calenderFocused: false,
            error: ""
        };
    }
    
    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    onAmountChange(e) {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }

    onNoteChange(e) {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    onDateChange(createdAt) {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }

    onFocusChange({ focused }) {
        this.setState(() => ({ calenderFocused: focused }));
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: "Please provide description and amount." }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            });
        }
    }

    render() {
        return ( 
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Description"
                    autoFocus
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    placeholder="Amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calenderFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    placeholder="Add a note for your expense (optional)"
                    className="textarea"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    }
}