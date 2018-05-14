pragma solidity 0.4.23;

import "zeppelin-solidity/contracts/math/SafeMath.sol";

/*
TZ: contract creator becomes the first superuser. Then he adds new users and superusers. Every superuser can add new users and superusers;
If user sends ether, his balance is increased. Then he can withdraw eteher from his balance;
ТЗ: 
	создатель контракта становится первым суперпользователем. 
	Затем он добавляет новых пользователей и суперпользователей. 
	Каждый суперпользователь может добавлять новых пользователей и суперпользователей;
	Если пользователь отправляет эфир, его баланс увеличивается. Затем он может вывести из себя равновесие;
*/


contract VulnerableOne {
    using SafeMath for uint;

    struct UserInfo {
        uint256 created;
		uint256 ether_balance;
    }

    mapping (address => UserInfo) public users_map;
	mapping (address => bool) is_super_user;
	//ограничить лимит пользователей, для предотвращения атаки по лимиту газа
	address[] users_list;

	modifier onlySuperUser() {
        require(is_super_user[msg.sender] == true);
        _;
    }

    event UserAdded(address new_user);

    constructor() public {
		set_super_user(msg.sender);
		add_new_user(msg.sender);
	}
//Любой пользователь может сделать супер пользователя, нужна проверка onlySuperUser
	function set_super_user(address _new_super_user) public {
		is_super_user[_new_super_user] = true;
	}
//вообще не понятно что это такое? msg.value
	function pay() public payable {
		require(users_map[msg.sender].created != 0);
		users_map[msg.sender].ether_balance += msg.value;
	}
// не выполняеться событие добавления пользователя
	function add_new_user(address _new_user) public onlySuperUser {
		require(users_map[_new_user].created == 0);
		users_map[_new_user] = UserInfo({ created: now, ether_balance: 0 });
		users_list.push(_new_user);
		emit UserAdded(msg.sender);
	}
	//атака по лимиту газа
	//кто угодно может удалять полльзователей, добавим проверку на овнера
	//может еще из суперпользователей удалять?
	function remove_user(address _remove_user) public {
		require(users_map[msg.sender].created != 0);
		//поидеи просто сбросит к базовому значению
		delete(users_map[_remove_user]);
		bool shift = false;
		for (uint i=0; i<users_list.length; i++) {
			if (users_list[i] == _remove_user) {
				shift = true;
			}
			//удаляемый просто заменяеться следующим пользователем
			//нет проверки если удаляемый последний пользователь?
			if (shift == true) {
				users_list[i] = users_list[i+1];
			}
		}
	}
	// для тестов, разбираюсь с масивами
	function getArray() public returns (uint){
		address[] sta;
		sta.push(1);
		sta.push(2);
		sta.push(3);
		sta.push(4);
		sta.push(5);
		sta.push(6);
		sta.push(7);
		sta.push(8);
		sta.push(9);
		//sta.push(10);
		return sta.length;
	}

	//Reentrancy Attacks
	function withdraw() public {
		uint256 balance = users_map[msg.sender].ether_balance;
		users_map[msg.sender].ether_balance = 0;
        msg.sender.transfer(balance);
	}

	function get_user_balance(address _user) public view returns(uint256) {
		return users_map[_user].ether_balance;
	}

}