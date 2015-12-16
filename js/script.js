
// Random number function provided with Assignment
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
// click counter still adds even after money is gone

var array = [{name: "apple", clicks: 0, moneySpent: 0, purchasedCount: 0}, {name: "orange", clicks: 0, moneySpent: 0, purchasedCount: 0},
{name: "banana", clicks: 0, moneySpent: 0, purchasedCount: 0}, {name: "pear", clicks: 0, moneySpent: 0, purchasedCount: 0}];

// Randomly change all current prices + / - .50
$(function(){
		$('.notenough').hide();

		// Array of current fruit price
		var fruitPrices = [5,5,5,5];
		var userMoney = 100;;

		function randPrices(){
			for(var i = 0; i < fruitPrices.length; i++){
				fruitPrices[i] += (randomNumber(1, 51) - randomNumber(1, 50)) * 0.01;

				if(fruitPrices[i] >= 9.99){
					fruitPrices[i] = 9.99;
				}
				if(fruitPrices[i] <= 0.50){
					fruitPrices[i] = 0.50;
				}
				fruitPrices[i] = Math.round(fruitPrices[i] * 100)/100;

				$('#' + array[i]['name']).text('Current ' + array[i]['name'] + ' cost: $' + fruitPrices[i].toFixed(2));
				};

			}
		var repeatStocks = setInterval(function(){
			randPrices();
		}, 15000);

		function specificBuySellClick(fruitbuy, fruitsell, arraynum){
			$('#'+fruitbuy).on('click', function() {
				ifZero(fruitbuy, arraynum);
			});
			$('#'+fruitsell).on('click', function(){
				sellFruit(arraynum);
			});
		};

		specificBuySellClick('appleBuy', 'appleSell', '0');
		specificBuySellClick('orangeBuy', 'orangeSell', '1');
		specificBuySellClick('bananaBuy', 'bananaSell', '2');
		specificBuySellClick('pearBuy', 'pearSell', '3');
	

	setTimeout(function(){
			clearInterval(repeatStocks);

			for(i=0; i < fruitPrices.length; i++){
				userMoney += array[i]['purchasedCount'] * fruitPrices[i];
			};
		
			$('body').append('<div id="endscore"><h1>You ended with: $' + Math.round(userMoney*100)/100 + '</h1><br><br><button id="resetgame">Restart</button></div>');
			$('#resetgame').on('click', function(){
				location.reload();
			});

	}, 300000);

		function ifZero(buttonName, arraynum){
			if(userMoney <= 0){
				$('#'+buttonName).prop('disabled', true);
				userMoney = 0;
				$('.cash').text('Total Available Cash: $' + userMoney);
			} else {
				buyFruit(arraynum);
			}

		}

		function buyFruit(foo) {
			if (userMoney < fruitPrices[foo]){
				$('.notenough').fadeIn('slow', function(){$(this).delay(1000).fadeOut('slow')})
			} else {
				array[foo]['moneySpent'] += fruitPrices[foo];
				array[foo]['clicks']++;
				array[foo]['purchasedCount']++;
				$('.' + array[foo]['name'] + 'avgcost').text('Average ' + array[foo]['name'] + ' cost: ' + Math.round((array[foo]['moneySpent'] / array[foo]['purchasedCount']) * 100)/100);
				userMoney -= fruitPrices[foo];
				$('.cash').text('Total Available Cash: $' + Math.round(userMoney*100)/100);
				if(userMoney <= 0){
					userMoney = 0;
					$('.cash').text('Total Available Cash: $' + userMoney);
				}
				$('.' + array[foo]['name'] + 'count').text(array[foo]['clicks']);
			}
		};

		function sellFruit(fooTwo) {
			if(array[fooTwo]['clicks'] > 0){
				array[fooTwo]['clicks']--;
				$('.' + array[fooTwo]['name'] + 'count').text(array[fooTwo]['clicks']);
				userMoney += fruitPrices[fooTwo];
				$('.cash').text('Total Available Cash: $' + Math.round(userMoney*100)/100);
			};
			if(userMoney > 0){
				$('#pearBuy, #bananaBuy, #orangeBuy, #appleBuy').prop('disabled', false);
			}
		};
});
