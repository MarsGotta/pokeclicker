class buyKeyItem extends Item {
    
        type: GameConstants.KeyItemType;
    
        constructor(type: GameConstants.KeyItemType, price: number = 1000) {
            let basePrice = price;
            let priceMultiplier = 1;
            super(GameConstants.KeyItemType[type], basePrice, priceMultiplier, GameConstants.Currency.questPoint);
            this.type = type;
            this.totalPrice = ko.computed(function(){return this.basePrice}, this);
        }
    
        buy(amt: number) {
            player.gainKeyItem(GameConstants.KeyItemType[this.type].replace("_", " "))
        }
    
        use() {
        }
    }
    
    
    ItemList['Dungeon_ticket'] = new buyKeyItem(GameConstants.KeyItemType.Dungeon_ticket, 250);