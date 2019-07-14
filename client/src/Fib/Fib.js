import React from 'react';
import axios from 'axios';

class Fib extends React.Component {
    constructor() {
        super();
        this.state = {
            seenIndexes: [],
            values: {},
            index: ''
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        console.log(values);
        this.setState((prev) => ({
            ...prev,
            values: values.data
        }));
    }

    async fetchIndexes() {
        const indexes = await axios.get('/api/values/all');
        this.setState((prev) => ({
            ...prev,
            seenIndexes: indexes.data
        }));
    }

    onSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });

        this.setState({index: ''});

        await this.fetchData();
    }

    seenIndexes() {
        return (<span>{this.state.seenIndexes.map(x => x.number).join(', ')}</span>);
    }

    caluclatedValues() {
        const entries = Object.entries(this.state.values);

        return entries.map(([index, value]) => (
            <div key={index}>
                For index: {index} I calculated {value}
            </div>
        ));
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <label htmlFor="index">Enter your index: </label>
                    <input
                        name="index"
                        value={this.state.index}
                        onChange={(event) => this.setState({index: event.target.value})}
                    />
                    <button type="submit">Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.seenIndexes()}

                <h3>Caluclated Values:</h3>
                {this.caluclatedValues()}
            </div>
        );
    }
}

export default Fib;