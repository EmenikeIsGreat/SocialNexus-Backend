/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');
const hash = require('hash')

/*
error codes

1 - not enough balance
2 - not within slippage

*/

class AssetTransfer extends Contract {

    orderFee = 0;
    withDepoFee = 0;
    transferFee = 0;


    async setOrderFee(ctx, amount, feeType){
        this.orderFee = amount;
        let message = feeType + ": has been changed to " + amount;
    }


    // this is only testing
    async testing(ctx, key, value){
        value = JSON.parse(value)
        await ctx.stub.putState(key, Buffer.from(stringify(value)));
    }

        
    async setTransferFee(ctx, amount, feeType){
        this.transferFee = amount;
        let message = feeType + ": has been changed to " + amount;
    }

    async setWithDepoFee(ctx, amount, feeType){
        this.withDepoFee = amount;
        let message = feeType + ": has been changed to " + amount;
    }

    async InitContract(ctx, orderFee, withDepoFee, transferFee){
        await this.setOrderFee(ctx, orderFee);
        await this.setWithDepoFee(ctx, withDepoFee);
        await this.setTransferFee(ctx, transferFee)
        await this.createUser(ctx, "SocialNexus")
    }

    async getOrderFee(){
        return this.orderFee
    }

    async getWithDepoFee(){
        return this.withDepoFee;
    }

    async getTransferFee(){
        return this.transferFee;
    }


    async saveTxID(ctx, txID, value){
        await ctx.stub.putState(txID, Buffer.from(stringify(value)))
    }

    async getOrder(ctx, txID){

        let value = await ctx.stub.getState(txID);

        if(value.length == 0){
            return false
        }
        else{
            return JSON.parse(value);
        }
    }

    async get(ctx, id){
        let value = await ctx.stub.getState(id);
        let valueJson = JSON.parse(value);
        return valueJson
    }

    async getUser(ctx, UserID){
        let userPreJson = await ctx.stub.getState(UserID);
        let userJson = JSON.parse(userPreJson);
        return userJson
    }

    async getBalance(ctx, userID){
        let user = await this.getUser(ctx, userID)
        return user.USDSH
    }

    
    async createUser(ctx, UserID) {
        //testing remove later
        let balanceObj = {
            USDSH : {
                balance : 0
            }
        }


        await ctx.stub.putState(UserID, Buffer.from(stringify(balanceObj)));

        balanceObj.userID = UserID;

        let createUserEvent = {
            Type:"CreateUser",
            UserID: UserID,
            status: true
        }
       await ctx.stub.setEvent('event', Buffer.from(stringify(createUserEvent)));
    }


    async createAsset(ctx, AssetID, UserID){

        let assetObj = {
            Creator : UserID,
            amountRaised : 0,
            fees: 0,
            Bidders : {

            }
        }

        let createAssetEvent = {
            Type:"CreateAsset",
            UserID: UserID,
            AssetID: AssetID, 
        }
        await ctx.stub.setEvent('CreatedAsset', Buffer.from(stringify(createAssetEvent)));
        await ctx.stub.putState(AssetID, Buffer.from(stringify(assetObj)));

    }




    async getAsset(ctx, AssetID){
        let AssetPreJson = await ctx.stub.getState(AssetID);
        let AssetJson = JSON.parse(AssetPreJson);
        return AssetJson
    }

    
    
    async hasBalance(ctx, UserID, amount){
        amount = parseFloat(amount);
        let userBal = await this.getUser(ctx, UserID);
        
        if(userBal.USDSH.balance < amount){
            return false
        }

        else{
            return true
        }
    }
  
    async deposit(ctx, txID, userID,amount, modify){

        amount = parseFloat(amount);
        if(typeof modify === 'string'){
            if(modify == "true"){
                modify = true
            }

            else{
                modify = false
            }
        
        }
        let userJson = await this.getUser(ctx, userID);
        if(modify){

            let fee = amount*this.withDepoFee
            userJson.USDSH.balance = userJson.USDSH.balance + (amount - fee)

            let externalEvent = {
                UserID:userID,
                Type: "External",
                
                Transaction:{
                    External: "deposit",
                    USDSHAmount: amount,
                    fee: fee
                },
            
                UserBalance:userJson.USDSH
            }

            if(userID == "SocialNexus"){
                return
            }
            await ctx.stub.putState(txID, Buffer.from(stringify(externalEvent)));
            await ctx.stub.putState(userID, Buffer.from(stringify(userJson)));
            return
        }

        else{
            userJson.USDSH.balance = userJson.USDSH.balance + amount;
            return userJson;
        }
        

    }


    async withdraw(ctx, txID, userID, amount, modify){

        amount = parseFloat(amount)
        let fee = amount*this.withDepoFee;

        if(typeof modify === 'string'){
            if(modify == "true"){
                modify = true
            }

            else{
                modify = false
            }
        
        }
        

        let userJson = await this.getUser(ctx, userID);    

        let bal = await this.hasBalance(ctx, userID, amount)
        

        userJson.USDSH.balance = userJson.USDSH.balance - (amount - fee)
        
        let externalEvent = {
            UserID:userID,
            Type: "External",
            
            Transaction:{
                External: "withdraw",
                USDSHAmount: amount,
                fee: fee,
                valid: false
            }
        }

        if(!modify){
            userJson.USDSH.balance = userJson.USDSH.balance - amount
            return userJson
        }

        else{
            if(!bal){
                await ctx.stub.putState(txID, Buffer.from(stringify(externalEvent)));
                return
            }

            else{
                externalEvent.UserBalance = userJson.USDSH
                externalEvent.Transaction.valid = true
                //await this.deposit(ctx, "SocialNexus", fee, true)
                await ctx.stub.setEvent('event', Buffer.from(stringify(externalEvent)))
                await ctx.stub.putState(txID, Buffer.from(stringify(externalEvent)));
                await ctx.stub.putState(userID, Buffer.from(stringify(userJson)));
                return
            }
        }

    }


    async userBid(ctx, assetID, orders){
        let asset = await this.getAsset(ctx, assetID)
        orders = JSON.parse(orders)
        for(let i = 0; i < orders.length; i++){

    
            let id = orders[i].id
            let userID = orders[i].userID;
            let assetID = orders[i].assetID
            let usdsn = orders[i].usdsn

            let user = await this.getUser(ctx, userID)

            if(asset.Creator == userID){
                let val = {
                    action: "userBid",
                    errorCode: 3
                }
                await this.saveTxID(id,val)
                return
            }

            let fee = usdsn * this.orderFee
            let totalCost = fee + usdsn

            let hasBalance = await this.hasBalance(ctx, userID, totalCost)
            
            if(!hasBalance){
                let val = {
                    action: "userBid",
                    errorCode: 1
                }
                await this.saveTxID(id,val)
                return
            }

            user.USDSH.balance = user.USDSH.balance - totalCost
            asset.amountRaised = asset.amountRaised + usdsn;
            asset.fees = asset.fees + fee

            let usersNewBid = {Bid:usdsn}

            user[assetID] = usersNewBid

    

            if(asset.Bidders[userID] != undefined){
                asset.Bidders[userID].Bid = asset.Bidders[userID].Bid + usdsn;
            }
            
            else{
                
                let userBid = {
                    Bid : usdsn
            
                }
                asset.Bidders[userID] = userBid;
            }

            await ctx.stub.putState(userID, Buffer.from(stringify(user)));
            

            let bidEvent = {
                UserID:userID,
                Type: "Bid",
                Transaction:{
                    BidID: id,
                    AssetID: assetID,
                    USDSHAmount: usdsn,
                    fees: fee,
                    fee: this.orderFee
                },
                UserBalance: user
            }
            
            await ctx.stub.setEvent('event', Buffer.from(stringify(bidEvent)));

        }

        await ctx.stub.putState(assetID, Buffer.from(stringify(asset)));
    }


    async initalizeAssets(ctx, AssetID){
        
        // this needs to be tested 
        let poolAllocation = 0.01
        let totalSupply = 1000;

        let asset = await this.getAsset(ctx, AssetID);
        
        let amountRaised = asset.amountRaised;
        
        let AssetAllocatedToPool = totalSupply * poolAllocation;
        let USDSHAllocatedToPool = amountRaised * poolAllocation;
        let k = AssetAllocatedToPool * USDSHAllocatedToPool;
        
        let LP = {
            "Asset" : AssetAllocatedToPool,
            "USDSH" : USDSHAllocatedToPool,
            "K_Constant": k
        }

        asset.LP = LP
        await ctx.stub.putState(AssetID, Buffer.from(stringify(asset)));


        totalSupply = totalSupply - AssetAllocatedToPool;
        amountRaised = amountRaised - USDSHAllocatedToPool;
        let tokenPerDollar = totalSupply/amountRaised;
        let strikePrice = amountRaised/totalSupply

    
        for (const key in asset.Bidders){
            let user = await this.getUser(ctx, key);
            let UsersTokens = parseFloat(asset.Bidders[key].Bid) * tokenPerDollar;
        
            
            let balanceOBj = {
                balance : UsersTokens
            }
            user[AssetID] = balanceOBj;
            await ctx.stub.putState(key, Buffer.from(stringify(user)));


            let assetEvent = {
                UserID:key,
                Type: "RecievedAssetFromInit",
                Transaction:{
                    Type:"InitAsset",
                    AssetID: AssetID,
                    AssetAmount: UsersTokens,
                    USDSHAmount: asset.Bidders[key].Bid,
                    StrikePrice: strikePrice,
                },
                UserBalance:user
            }

            let initializeAsset = {
                Type: "AssetInit",
                UserID: asset.Creator,
                AssetID:AssetID
            }

            await ctx.stub.setEvent('event', Buffer.from(stringify(assetEvent)));
        }

    }


    Liquity_Pool_Math(LP_Obj, TokenTrasnactionAmount, tx_Status, modify){
        TokenTrasnactionAmount = parseFloat(TokenTrasnactionAmount);
        if(typeof modify === 'string'){
            if(modify == "true"){
                modify = true
            }

            else{
                modify = false
            }
        
        }
    
        // this is subject to change
        let Asset = LP_Obj.Asset
        let USDSH = LP_Obj.USDSH
        let k = LP_Obj.K_Constant
        
        let payment;
        if(tx_Status == "Buy"){
            let payment = (k/(Asset - TokenTrasnactionAmount)) - USDSH;
            //console.log("you need to pay $" + payment)


            if(modify == true){
                LP_Obj.Asset = Asset - TokenTrasnactionAmount;
                LP_Obj.USDSH = USDSH + payment;

            }
            
            let returnVar = {
                amount: payment,
                LP: LP_Obj

            }
            return returnVar
        }
    
        else{
            let payment = USDSH - (k/(Asset + TokenTrasnactionAmount));
            
            if(modify == true){
                LP_Obj.Asset = Asset + TokenTrasnactionAmount;
                LP_Obj.USDSH = USDSH - payment;
   
            }


            let returnVar = {
                amount: payment,
                LP: LP_Obj

            }
            return returnVar
        }
    }

    async test_LP_Math(ctx, AssetID, TokenTrasnactionAmount, tx_Status, modify){
        let asset = await this.getAsset(ctx, AssetID);
        let lpObj = asset.LP;

        let LP = this.Liquity_Pool_Math(lpObj, TokenTrasnactionAmount, tx_Status, modify)

        return LP


    }



    async getPrice(ctx, assetIDs){

 
        
        assetIDs = JSON.parse(assetIDs);
  
    
        let returnVal = []
        
        for(let i = 0; i < assetIDs.length; i++){

            
            let asset = await this.getAsset(ctx, assetIDs[i]);
            let price = asset.LP.USDSH/asset.LP.Asset
            

            returnVal.push({asset:assetIDs[i],price:price})

        
        }



        return returnVal

    }

    async executeOrder(ctx, assetID, orders){

        let asset = await this.getAsset(ctx, assetID)
        orders = JSON.parse(orders)
        for(let i = 0; i < orders.length; i++){

    
            let id = orders[i].id
            let userID = orders[i].userID;
            let assetID = orders[i].assetID
            let orderType = orders[i].orderType
            let tokenAmount = orders[i].tokenAmount
            let strikePrice = orders[i].strikePrice
            let slippage = orders[i].slippage



            let user = await this.getUser(ctx, userID)
            let LP = asset.LP
            


            let orderEvent = {
                UserID:assetID,
                Type: "Order",
                Transaction:{
                    Type:"Buy",
                    orderID: id,
                    AssetID: assetID,
                    AssetAmount: tokenAmount,
                    USDSHAmount: "test",
                    StrikePrice: "test",
                    fee: "test",
                    NewPriceOfAsset:"test",
                }
            }


            if(orderType == "Buy"){
                let USDSH_Amount = this.Liquity_Pool_Math(LP, tokenAmount, "Buy", false).amount;

                let oldLP = this.Liquity_Pool_Math(LP, tokenAmount, "Buy", false);

                let oldPrice = oldLP.LP.USDSH/oldLP.LP.Asset
                orderEvent.Transaction.StrikePrice = oldPrice


                let SH_Cut = USDSH_Amount*this.orderFee;
                let newUSDSH_Amount = USDSH_Amount + SH_Cut;
                
                
                if(!(USDSH_Amount <= strikePrice*(1+slippage) && USDSH_Amount >= strikePrice/(1+slippage))){

                    let val = {
                        action: "Order",
                        errorCode: 2
                    }
                    await this.saveTxID(id,val)
                    return
                }
                
                let hasBal = await this.hasBalance(ctx, userID, newUSDSH_Amount)
                if(!hasBal){
                    
                    let val = {
                        action: "Order",
                        errorCode: 3
                    }
                    await this.saveTxID(id,val)
                    return
                }

            
                let payment = this.Liquity_Pool_Math(LP, tokenAmount, "Buy", true)
                
                let newPrice = payment.LP.USDSH/payment.LP.Asset
                orderEvent.Transaction.NewPriceOfAsset = newPrice
                
                let totalWithdraw = payment.amount + SH_Cut
                orderEvent.Transaction.USDSHAmount = payment.amount
                orderEvent.Transaction.fee = SH_Cut

                asset.LP = payment.LP


                user.USDSH.balance = user.USDSH.balance - totalWithdraw
                asset.fees = asset.fees + SH_Cut

                if(user[assetID] == undefined || user[assetID] == null){
                    let asset = {
                        balance: tokenAmount
                    }
                    user[assetID] = asset
            
                }
        
                else{
                    user[assetID].balance = user[assetID].balance + tokenAmount
                
                }


            }

            if(orderType == "Sell"){

                
                let USDSH_Amount = this.Liquity_Pool_Math(LP, tokenAmount, "Sell", false).amount;
                let SH_Cut = USDSH_Amount*this.orderFee;


                let oldLP = this.Liquity_Pool_Math(LP, tokenAmount, "Buy", false);
                let oldPrice = oldLP.LP.USDSH/oldLP.LP.Asset
                orderEvent.Transaction.StrikePrice = oldPrice


                if(!(USDSH_Amount <= strikePrice*(1+slippage) && USDSH_Amount >= strikePrice/(1+slippage))){
                    let val = {
                        action: "Order",
                        errorCode: 2
                    }
                    await this.saveTxID(id,val)
                    return
                }
                

                let payment = this.Liquity_Pool_Math(LP, tokenAmount, "Sell", true)
                let userPayment = payment.amount - SH_Cut
                
                orderEvent.Transaction.USDSHAmount = payment.amount

                let newPrice = payment.LP.USDSH/payment.LP.Asse
                orderEvent.Transaction.NewPriceOfAsset = newPrice
                
    
                asset.LP = payment.LP
                orderEvent.Transaction.fee = SH_Cut


                user.USDSH.balance = user.USDSH.balance + userPayment
                asset.fees = asset.fees + SH_Cut


                let zeroBalance = user[assetID].balance - tokenAmount
                


                if(zeroBalance <= 0){
                    delete user[assetID]
                
                }
                
                else{
                    user[assetID].balance = zeroBalance
            
                }

            }
           
            await ctx.stub.putState(userID, Buffer.from(stringify(user)));

            await ctx.stub.setEvent('event', Buffer.from(stringify(orderEvent)));
        }
        
        await ctx.stub.putState(assetID, Buffer.from(stringify(asset)));

    }
}

module.exports = AssetTransfer;