formatPrice = function(number) {
    let str = ''+number, res = 'руб';
    let i = str.length-3, q;
    for (; ; i-=3) {
        q = i + 3 <= str.length ? i + 3 : str.length;
        i = i > 0 ? i : 0;
        res = str.substr(i, q)+'&nbsp;'+res;
        if (i <= 0) {
            break;
        }
    }
    return res;
}
$(function () {
    $('.dropright').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(0).css({
          opacity: 0.0,
          display: "block",
          position: "absolute",
          transform: "translate3d("+($(this).width()+parseInt($(this).find('.dropdown-toggle')
              .attr("data-offset").split(",")[1]))+"px, 0px, 0px)",
          "will-change": "transform",
          top: 0,
          left: 0,
      }).animate({
          opacity: 1.0,
      }, 120);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(0).animate({
              opacity: 0.0,
          }, {
              duration: 120,
              complete: function(){$(this).css({
                  display: "none",
                  position: "",
                  transform: "",
                  top: "",
                  left: "",
                  "will-change": "",
              });}
          });
    });
    $('.goods-card__to-cart-button').mouseenter(function (ev) {
        $(this).parents('.goods-card').addClass('goods-card_active');
    }).mouseleave(function (ev) {
        $(this).parents('.goods-card').removeClass('goods-card_active');
    })/*.click(function (ev) {
        ev.preventDefault();
        let productCard = $(this).parents('.goods-card');
        let price = parseInt(productCard.find('.goods-card__price').text().replace(' ', '').replace('\n', ''));
        let quantity = parseInt(productCard.find('.goods-card__quantity').attr('value'));
        let numberWidget = $('.shopping-cart__number');
        let number = parseInt(numberWidget.text().replace(' ', '').replace('\n', ''));
        numberWidget.html(formatPrice(number+price*quantity));
    })*/;
    $('.goods-card__quantity-minus, .goods-card__quantity-plus').one('mouseenter', function(ev) {
            $(this).data('inc', $.proxy(function (d) {
                let quantityInputField = $(this).siblings('.goods-card__quantity');
                let result = parseInt(quantityInputField.val()) + d;
                if (result >= 0) {
                    quantityInputField.val(result);
                    quantityInputField.attr('value', result);
                }
            }, this));
    }).mousedown(function (ev) {
        let d = $(this).is('.goods-card__quantity-plus') ? 1: -1;
        $(this).data('timeout', setTimeout(() => {
            $(this).data('ranged-input', true);
            $(this).data('interval', setInterval(() => {
                $(this).data('inc')(d);
            }, 100));
        }, 300));
    }).on('mouseout mouseup', function (ev) {
        clearTimeout($(this).data('timeout'));
        if ($(this).data('interval') !== undefined) {
            clearInterval($(this).data('interval'));
        }
    }).click(function (ev) {
        if ($(this).data('ranged-input')) {
            $(this).data('ranged-input', false);
            return;
        }
        $(this).data('inc')($(this).is('.goods-card__quantity-plus') ? 1: -1);
    });
});
