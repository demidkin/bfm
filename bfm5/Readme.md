### Инструкция

[Описание контракта BreadCoin](https://github.com/demidkin/bfm5/blob/master/BreadCoin/Readme.md)

Впервые работю с ReactJS, поэтому не успел реализовать в dApp все функции контракта, сложно было разбираться, успел только:

* Выпуск новых токенов, только когда менье 2 учасников, когда 2 и больше участников для выпуска токенов в контракте предусмотрено голосование, это в dApp я не успел реализовать
* Отправка токенов между учатниками
* Принятие или отклонение платежа
* Просмотр списка участников
    

##### Контракт Необходимо задеплоить заново, так как досутп к контракту есть только у создателя контракта или у уже добавленных участников

Deploy contracts in Rinkeby. Start Geth:

    geth.exe --rpc --rpcport 8547 --verbosity 2 --fast --rinkeby console

Unlock account in geth console:

    personal.unlockAccount(eth.accounts[0],'<password>',1e9)

Установка контракта

    git clone https://github.com/demidkin/bfm5.git
    cd ./bfm5/BreadCoin
    npm install
    truffle migrate --reset --network rinkeby
    cd ../
    cd ./BreadCoinDAPP
    npm install

Необходимо указать верный адрес контракта для web3 тут: ./BreadCoinDAPP/src/js/index.js

    ...
    Стркоа 35: this.state.ContractInstance = MyContract.at("<new contract address>")
    ...

Сборка webpack

    webpack | http-server /dist

[Открыть сайт](http://127.0.0.1:8081)

C ipfs на локальной машине побалосвался, вроде все понятно.





