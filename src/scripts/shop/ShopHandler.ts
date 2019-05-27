///<reference path="Shop.ts"/>
class ShopHandler {
    static shopObservable: KnockoutObservable<Shop> = ko.observable(new Shop([]));
    static selected: KnockoutObservable<number> = ko.observable(0);
    static amount: KnockoutObservable<number> = ko.observable(1);

    public static showShop(shop: Shop) {
        ShopHandler.amount(1);
        Game.gameState(GameConstants.GameState.idle);
        this.shopObservable(shop);

        for (let i = 0; i < shop.items().length; i++) {
            let item: Item = shop.items()[i];
            item.price(Math.round(item.basePrice * player.itemMultipliers[item.name()]));
        }

        Game.gameState(GameConstants.GameState.shop);
    }

    public static setSelected(i: number) {
        this.selected(i);
    }

    public static buyItem() {
        if (this.amount() < 1) {
            return;
        }
        let item: Item = this.shopObservable().items()[ShopHandler.selected()];

        let multiple = this.amount() > 1 ? "s" : "";

        if (player.hasCurrency(item.totalPrice(), item.currency)) {
            player.payCurrency(item.totalPrice(), item.currency);
            item.buy(this.amount());
            item.increasePriceMultiplier(this.amount());
            Notifier.notify("You bought " + this.amount() + " " + item.name() + multiple, GameConstants.NotificationOption.success)
        } else {
            let curr = "currency";
            switch (item.currency) {
                case GameConstants.Currency.money:
                    curr = "money";
                    break;
                case GameConstants.Currency.questPoint:
                    curr = "quest points";
                    break;
                case GameConstants.Currency.dungeontoken:
                    curr = "dungeon tokens";
                    break;
            }
            Notifier.notify(`You don't have enough ${curr} to buy ${this.amount()} ${item.name() + multiple}`, GameConstants.NotificationOption.danger)
        }

        ShopHandler.resetAmount();

    }

    public static resetAmount() {
        let input = $("input[name='amountOfItems']");
        input.val(1).change();
    }

    public static increaseAmount(n: number) {
        let input = $("input[name='amountOfItems']");
        let newVal = (parseInt(input.val().toString()) || 0) + n;
        input.val(newVal > 1 ? newVal : 1).change();
    }

    public static ownKeyItem(name: string): boolean {
        let keyItem = GameConstants.KeyItemType[name];
        return !(keyItem != undefined && player.hasKeyItem(name.replace("_", " ")));
    }

    public static calculateCss(i: number): string {
        if (this.selected() == i) {
            return "shopItem clickable btn shopItemSelected"
        } else {
            return "shopItem clickable btn"
        }
    }

    public static calculateButtonCss(): string {
        let item: Item = this.shopObservable().items()[ShopHandler.selected()];

        if (item && !player.hasCurrency(item.totalPrice(), item.currency) || this.amount() < 1) {
            return "btn btn-danger smallButton smallFont"
        } else {
            return "btn btn-success smallButton smallFont"
        }
    }
}
