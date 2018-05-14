pragma solidity ^0.4.22;

import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";


contract BreadCoin is ERC20, DetailedERC20 {
    using SafeMath for uint256;

    address TokenOwner;
    uint256 TotalSupply;
    uint membersCount;
    uint transactionIndex;
    mapping (address => uint256) balances;
    mapping (address => uint) whiteListIds;
    mapping (uint => address) whiteListAddress;

    mapping (address => mapping (address => uint256)) internal allowed;

    //непринятый баланс, кому, Id транзакции = сколько
    mapping (uint => uint256) internal unpaymentBalance;
    //резерв средств для блокировки, отправитель = сколько отправлено всего средств
    mapping (address => uint256) totalUnpaymentBalance;
    //количество входящих транзакций
    mapping (address => uint) internal tracsactionCount;
    //Ид транцакции = от кого
    mapping (uint => address) internal transactionOwner;
    //Ид транзакции = кому
    mapping (uint => address) internal transactionRecipient;
    
    //адрес отправителя, порядковй номер транзакции = Id транзакции
    mapping (address => mapping (uint => uint)) myTrancaction;


//MODEIER---------------------------------------------------------------------  
    modifier inWhiteList(address _member){
        require(whiteListIds[_member]>0);
        _;
    }
    modifier isOwner(){
        require(msg.sender == TokenOwner);
        _;
    }
    modifier haveMoney(address _owner, uint256 _value){
        require(_value <= balances[msg.sender]-totalUnpaymentBalance[msg.sender]);
        _;
    }



//CONSTRUCTOR------------------------------------------------------------------
    constructor() public DetailedERC20("BreadCoin", "BREAD", 18){
        TokenOwner = msg.sender;
        TotalSupply = 0;
        membersCount = 0;
        transactionIndex = 0;
    }


//BreadCoin Function
    function mint(address _to, uint256 _value) 
        public 
        inWhiteList(_to)
        isOwner()
        returns (bool)
    {
        require(_value > 0);
        require(_to != address(0));

        balances[_to] = balances[_to].add(_value);
        TotalSupply = TotalSupply.add(_value);
        emit Transfer(address(0), _to, _value);
        return true;
    }

    function addToWhiteList(address _member) 
        public 
        isOwner()
        returns (bool)
    {
        require(_member != address(0));
        require(membersCount<256);
        membersCount++;
        whiteListIds[_member] = membersCount;
        whiteListAddress[membersCount] = _member;
        return true;
    }

    function getCoinName() public view returns (string){
        return name;
    }

    function getMemberStatus(address _member) public inWhiteList(_member) view returns (bool){
        return true;
    }

    //для тестов
    function getTokenOwner() public view returns (address){
        return TokenOwner;
    }

//VOTING
    function initNewTransfer(address _to, uint256 _value)
        internal
        inWhiteList(_to)
        inWhiteList(msg.sender)
        haveMoney(msg.sender, _value)        
        returns (bool)
    {
        transactionIndex++;

        transactionOwner[transactionIndex] = msg.sender;
        transactionRecipient[transactionIndex] = _to;
        tracsactionCount[_to] = tracsactionCount[_to].add(1);
        myTrancaction[_to][tracsactionCount[_to]] = transactionIndex;
        unpaymentBalance[transactionIndex] = _value;
        totalUnpaymentBalance[msg.sender] = totalUnpaymentBalance[msg.sender].add(_value);
        return true;
    }
    function getMyTransactionCount() public view returns (uint){
        return tracsactionCount[msg.sender];
    }
    function getMyTransactionByIndex(uint txIndex) public view returns (uint){
        require(txIndex <= getMyTransactionCount());
        require(txIndex > 0);
        return MyTransacion[msg.sender][txIndex];
    }

//ERC20 ------------------------------------------------------------------------------
    function allowance(address _owner, address _spender) public view returns (uint256){
        return allowed[_owner][_spender];
    }

    function approve(address _spender, uint256 _value) public returns (bool){
        require(_value > 0);
        require(whiteListIds[msg.sender] > 0);
        require(whiteListIds[_spender] > 0);

        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    function totalSupply() public view returns (uint256){
        return TotalSupply;
    }

    function balanceOf(address _who) public view returns (uint256){
        return balances[_who];
    }

    function transfer(address _to, uint256 _value) 
        public 
        inWhiteList(_to)
        inWhiteList(msg.sender)
        haveMoney(msg.sender, _value)
        returns (bool)
    {
        require(_value > 0);
        require(initNewTransfer(_to, _value));
        //balances[msg.sender] = balances[msg.sender].sub(_value);
        //balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }





    function transferFrom(address _from, address _to, uint256 _value) public returns (bool){
        require(_to != address(0));
        require(whiteListIds[_from] > 0);
        require(whiteListIds[_to] > 0);
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);


        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }
//ERC20 ------------------------------------------------------------------------------

}





