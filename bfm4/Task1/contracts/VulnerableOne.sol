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
	address[] users_list;

	modifier onlySuperUser(){
        require(is_super_user[msg.sender] == true);
        _;
    }

    event UserAdded(address new_user);
// Принудительно прописываем суперполльзователя в конструкторе
    constructor() public {
		is_super_user[msg.sender] = true; 
		//set_super_user(msg.sender);
		add_new_user(msg.sender);
	}

//1. Любой пользователь может сделать супер пользователя, добавим модификатор onlySuperUser
//2. Наверно нужно добавить пользователя в список пользователей (users_list), если его еще там нет
//3. ограничение списка пользователей до 255 (gaslimit)
	function set_super_user(address _new_super_user) 
		public 
		onlySuperUser()
	{
		require(users_list.length<256);
		is_super_user[_new_super_user] = true;
		add_new_user(_new_super_user);
	}

//вообще не понял что это такое? msg.value, добавил проверку msg.value > 0
	function pay() public payable {
		require(users_map[msg.sender].created != 0);
		if (msg.value > 0) users_map[msg.sender].ether_balance += msg.value;
	}

// 5. Не выполняеться событие добавления пользователя
// 6. + ограничение списка пользователей до 255 (gaslimit)
	function add_new_user(address _new_user) public onlySuperUser {
		require(users_map[_new_user].created == 0);
		require(users_list.length<256);
		users_map[_new_user] = UserInfo({ created: now, ether_balance: 0 });
		users_list.push(_new_user);
		emit UserAdded(_new_user);
	}
//Возможна атака по лимиту газа, ограничили список пользователей до 255.
//7. кто угодно может удалять полльзователей, добавим модификатор onlySuperUser
//8. может еще из суперпользователей удалять?
//9. Нет проверки если удаляемый последний пользователь в массиве
//10. Не изменяеться дилина масива
	function remove_user(address _remove_user) public onlySuperUser {
		require(users_map[msg.sender].created != 0);
		delete(users_map[_remove_user]);
		delete(is_super_user[_remove_user]);
		if (users_list[users_list.length-1] == _remove_user){
			delete users_list[users_list.length-1];
        	users_list.length--;
		} 
		else 
		{
			bool shift = false;
			for (uint i=0; i<users_list.length-1; i++) 
			{
				if (!shift && users_list[i] == _remove_user)
				{
					shift = true;
				}
			
				if (shift == true) 
				{
					users_list[i] = users_list[i+1];
				}
			}

			if (shift == true)
			{
				delete users_list[users_list.length-1];
        		users_list.length--;
			}	
		}			
	}

	//11. Reentrancy Attacks
	function withdraw() public {
		uint256 balance = users_map[msg.sender].ether_balance;
		users_map[msg.sender].ether_balance = 0;
        msg.sender.transfer(balance);
	}

	function get_user_balance(address _user) public view returns(uint256) {
		return users_map[_user].ether_balance;
	}

	//Функции для тестов, проверка корректности удаления из users_list
	function getUsers() public view returns (address[]){
		return users_list;
	}

}