import React, { Component } from 'react';
import Web3 from 'web3';

class App extends React.Component{
    
    constructor(prop){
        super(prop)
        this.state = {  Name: "",
                        Mail: "",
                        UserToken_head: ["#", "Token"],
                        UserToken_rows: []
                    }

        let web3 = window.web3
        if(typeof window.web3 != 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
          }else{
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }
          
          var abi = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "_operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "_approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_data",
                        "type": "string"
                    }
                ],
                "name": "createNewToken",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    },
                    {
                        "name": "_data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "_approved",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_symbol",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "exists",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getApproved",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getMyToken",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ownerOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_index",
                        "type": "uint256"
                    }
                ],
                "name": "tokenByIndex",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_index",
                        "type": "uint256"
                    }
                ],
                "name": "tokenOfOwnerByIndex",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "tokenURI",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
        this.contractAddress = "0x49905E685e1144A6eA2DC70f1Fc7d8444B4B3bA0";
        const MyContract = web3.eth.contract(abi)
         this.state.ContractInstance = MyContract.at(this.contractAddress)
    }

    componentDidMount(){
        this.updateState()
        this.setupListeners()
        setInterval(this.updateState.bind(this), 10e3)
    }

    // addMember(e){
    //     this.state.ContractInstance.addMember(this.state.NewMemberAddress,'1234567890',(err, result) => {
    //         if(result != null){
    //             this.setState({ ConsoleMessage: result })
    //             this.setState({ NewMemberAddress: "" }) 
    //         }
    //     })
    // }
    // MintTo(){
    //     this.state.ContractInstance.mint(this.state.MintTo, parseInt(this.state.MintValue * 10e17), (err, result) => {
    //         if(result != null){
    //             this.setState({ ConsoleMessage: result })
    //             this.setState({ MintValue: "" }) 
    //         }
    //     })
    // }
    // PayTo(){
    //     this.state.ContractInstance.payTo(this.state.PayTo, parseInt(this.state.PayValue * 10e17), (err, result) => {
    //         if(result != null){
    //             this.setState({ ConsoleMessage: result })
    //             this.setState({ PayValue: "" }) 
    //         }
    //     })
    // }
    // AcceptPayFrom(){
    //     this.state.ContractInstance.acceptPayment(this.state.SenderAddressToPay, (err, result) => {
    //         if(result != null){
    //             this.setState({ ConsoleMessage: result })
    //             this.setState({ SenderAddressToPay: "" })
    //         }
    //     })
    // }
    BuyToken(){
        let data = this.state.Name + " " + this.state.Mail
        var functionData = this.state.ContractInstance.createNewToken.getData(data);
        this.web3.eth.sendTransaction({
            to: this.contractAddress,
            from: this.web3.eth.accounts[0],
            data: functionData,
            value: this.web3.toWei(10, "finney")
        },
            function (error) {
                console.log(error);
            }
        )
    }

    onChangeUserName(e){
        this.setState({ Name: e.target.value })
    }
    onChangeMail(e){
        this.setState({ Mail: e.target.value })
    }

    updateState(){
        this.state.ContractInstance.getMyToken((err, result) => {
            console.log(result)
            if(result != null){
                let rows = [];
                for (let i=0; i < result.length; i++){
                    console.log(result[i])
                    rows.push([i+1, result[i].toString()]);
                }
                this.setState({ UserToken_rows: rows })
            }
        })
    }

    setupListeners(){
    }

    render(){
        return (
            <div class="container">
                <br/>
                <div className="block">
                <b>Name:</b> &nbsp;
                <span><input type="text" class="form-control" placeholder="User name" aria-label="User name" aria-describedby="basic-addon2" value={this.state.Name} onChange={(e) => this.onChangeUserName(e)}/></span>
                </div>
                <div className="block">
                <b>Mail:</b> &nbsp;
                <span><input type="text" class="form-control" placeholder="Mail" aria-label="Mail" aria-describedby="basic-addon2" value={this.state.Mail} onChange={(e) => this.onChangeMail(e)}/></span>
                </div>
                <br/>
                <button type="button" class="btn btn-success btn-lg btn-block" onClick={(e) => this.BuyToken(e)}>Buy</button>
                <hr />
                <b>Your tokens:</b> &nbsp;
                <div>
                    <Table head={this.state.UserToken_head} rows={this.state.UserToken_rows} />
                </div>  
                
            </div>  
        )
    }
}

class Table extends React.Component {
    render() {
      return (
        <table class="table table-hover">
          <thead>
            {this.genHead()}
          </thead>
          <tbody>
            {this.genRow()}
          </tbody>
        </table>
      );
    }
  
    genHead() {
      var head = this.props.head;
  
      return head.map(function(v, i) {
        return (
          <th key={'th' + i} scope="col">
            {v}
          </th>
        );
      });
    }
  
    genRow() {
      var rows = this.props.rows;
  
      return rows.map(function(v, i) {
        var tmp = v.map(function(v2, j) {
          return (
            <td key={'td' + i + '_' + j}>
              {v2}
            </td>
          );
        });
  
        return (
          <tr key={'tr' + i}>
            {tmp}
          </tr>
        )
      });
    }
}

export default App;
