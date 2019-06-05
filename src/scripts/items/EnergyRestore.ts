///<reference path="Item.ts"/>
class EnergyRestore extends Item {

    type: GameConstants.EnergyRestoreSize;

    constructor(type: GameConstants.EnergyRestoreSize) {
        let basePrice = GameConstants.ItemPrice[GameConstants.EnergyRestoreSize[type]];
        let priceMultiplier = 1;
        super(GameConstants.EnergyRestoreSize[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    buy(amt: number) {
        this._increaseCount(amt);
    }

    use() {
        if (player.itemList[this.name()]() <= 0) {
            return;
        }
        if (player._mineEnergy() === player._maxMineEnergy()) {
            Notifier.notify("Your mining energy is already full!", GameConstants.NotificationOption.danger);
            return;
        }
        Underground.gainEnergyThroughItem(this.type);
        this._decreaseCount(1);
    }
}

ItemList['SmallRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore);
ItemList['MediumRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore);
ItemList['LargeRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore);