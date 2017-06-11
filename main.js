    var itemNameArray = [];
    var itemPriceArray = [];
    var itemName;
    var itemPrice;
    var sum;
    // let itemPriceConst = $(this).data('price');
    var total;
    //document ready
    $(function() {
        var budget = prompt(`What's your budget?`);
        $('h4.budget').text('$' + budget);
        $('button').on('click', function(e) {
            //prevent submit button from refreshing the page
            e.preventDefault();
            itemName = $(this).data('item');
            var itemQuantity = prompt('Enter a quantity');
            var itemQuantityLeft = $(this).data('quantity') - itemQuantity;
            itemPrice = $(this).data('price');
            //convert string to a number
            itemPrice = parseFloat(itemPrice);
            itemPrice += itemPrice * itemQuantity;
            total = 0;
            total = total + itemPrice;
            //let's push itemNames and itemPrices into an array
            itemNameArray.push(itemName);
            itemPriceArray.push(itemPrice);
            if(itemQuantity >= $(this).data('quantity')) {
                alert('You have purchased too many! Try again.');
            } else {
                alert('Added to cart!');
            }
            sum = itemPriceArray.reduce(function(a, b) {
                return a + b;
            });
            // sum += parseFloat(sum);
            $('div.total span').text('$'+sum);
            underOrOverBudget();
            if(itemName.match(/o$/)) {
                $('ul.cartList').append('<li data-newprice=' + total + '">You have ' + itemQuantity + ' ' + itemName + '(es). It will cost you ' + '$'+total + '.' + ' There are ' + itemQuantityLeft + ' ' + itemName + '(es)' + ' left. </li>');
            } else {
                $('ul.cartList').append('<li data-newprice=' + total + '">You have ' + itemQuantity + ' ' + itemName + '(s). It will cost you ' + '$'+total + '.' + ' There are ' + itemQuantityLeft + ' ' + itemName + '(s)' + ' left. </li>');
            }
        });//button onclick event
        function underOrOverBudget() {
            if(sum >= budget) {
                $('h3.statusMsg').text('You are over budget! Please remove some items by clicking on an item.');
                $('h3.statusMsg').css('color', '#FC3C2D');
            } else {
                $('h3.statusMsg').text('You are under budget!');
                $('h3.statusMsg').css('color', '#00B28B');
            }
        }
        //removing items
        $('ul.cartList').on('click', 'li', function(e){
            e.preventDefault;
            $(this).remove();
            var newprice = $(this).data('newprice');
            newprice = parseFloat(newprice);
            sum = sum - newprice;
            $('div.total span').text('$'+sum);
            underOrOverBudget();
        });
    });//end document ready
