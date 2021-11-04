import React from 'react';
import { Table } from 'react-bootstrap';
import { ethers } from 'ethers'

export default class TransactionList extends React.Component {
    state = {
        transactions: [],
        gasPrice: 0,
        totalSupply: 0
    }
    network = 'homestead'
    apiKey = 'UGKW1H83JWANQKJFZZ7VHH9X37A3W2KNFJ'
    address = '0x0ff80a1708191c0da8aa600fa487f7ac81d7818c'
    async getTransactionList() {
        const self = this;
        const provider = new ethers.providers.EtherscanProvider(self.network, self.apiKey)
        const param = {
            'action': 'txlist',
            'address': self.address,
            'sort': 'desc',
            'page': '1',
            'offset': '10'
        }
        const promise = provider.fetch('account', param)
        await promise.then(function (result) {
            const transactions = result;
            self.setState({ transactions });
        }).catch(function (e) {
            console.log(e);
        });

    }
    async getGasPrice() {
        const self = this;
        const provider = new ethers.providers.EtherscanProvider(self.network, self.apiKey);
        const promise = provider.perform('getGasPrice')
        await promise.then(function (result) {
            const gasPrice = ethers.utils.formatUnits(result, 'ether');
            self.setState({ gasPrice });
        }).catch(function (e) {
            console.log(e);
        });

    }
    async getEtherTotalSupply() {
        const self = this;
        const provider = new ethers.providers.EtherscanProvider(self.network, self.apiKey)
        const param = {
            'action': 'tokensupply',
            'contractaddress': self.address,
        }
        const promise = provider.fetch('stats', param);
        await promise.then(function (result) {
            const totalSupply = result;
            self.setState({ totalSupply });
        }).catch(function (e) {
            console.log(e);
        });

    }
    async componentDidMount() {
        this.getTransactionList();
        this.getGasPrice();
        this.getEtherTotalSupply();
    }
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({
            transactions: [],
            gasPrice: 0,
            totalSupply: 0
        });
        // You can also log the error to an error reporting service
        console.log(error);
    }
    render() {
        return (
            <div class="table-responsive text-nowrap">
                <h1>Gas Price: {this.state.gasPrice}</h1>
                <h1>Total Supply: {this.state.totalSupply}</h1>
                <Table striped bordered hover class="table table-striped">
                    <thead>
                        <tr>
                            <th>blockHash</th>
                            <th>blockNumber</th>
                            <th>confirmations </th>
                            <th>cumulativeGasUsed </th>
                            <th>from </th>
                            <th>gas </th>
                            <th>gasPrice </th>
                            <th>gasUsed </th>
                            <th>hash </th>
                            <th>input </th>
                            <th>isError </th>
                            <th>nonce </th>
                            <th>timeStamp </th>
                            <th>to </th>
                            <th>transactionIndex </th>
                            <th>txreceipt_status</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.transactions.map(transction =>
                                <tr>
                                    <td>{transction.blockHash}</td>
                                    <td>{transction.blockNumber}</td>
                                    <td>{transction.confirmations}</td>
                                    <td>{transction.cumulativeGasUsed}</td>
                                    <td>{transction.from}</td>
                                    <td>{transction.gas}</td>
                                    <td>{transction.gasPrice}</td>
                                    <td>{transction.gasUsed}</td>
                                    <td>{transction.hash}</td>
                                    <td>{transction.input}</td>
                                    <td>{transction.isError}</td>
                                    <td>{transction.nonce}</td>
                                    <td>{transction.timeStamp}</td>
                                    <td>{transction.to}</td>
                                    <td>{transction.transactionIndex}</td>
                                    <td>{transction.txreceipt_status}</td>
                                    <td>{transction.value}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}