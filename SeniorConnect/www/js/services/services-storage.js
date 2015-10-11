saService.service('chatUnreadCountService', function(){
    this.count = 0;
});

saService.service('localIdentifier', function(){
    this.id = 0;
    this.inc = function(){
        this.id += 1;
    }
});