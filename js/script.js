$(document).ready(function(){
	$('.carousel__inner').slick({
			speed: 1200,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 2000,
			prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
			nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>',
			responsive: [
					{
							breakpoint: 992,
							settings: {
								dots: true,
								arrows: false,
							}
						},
			]
		});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		})
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('medium');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('medium');
	})

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('medium');
		})
	})

	function valideForms(form) {
		$(form).validate( {
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите своё имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свою почту",
				  email: "Введите свою почту в формате name@domain.com"
				}
			  }
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	// Mask with position cursor

	$('input[name=phone').mask("+38 (999) 999-99-99");

	$.fn.setCursorPosition = function(pos) {
	if ($(this).get(0).setSelectionRange) {
		$(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
		var range = $(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
	};

	$('input[name=phone]').click(function(){
		$(this).setCursorPosition(5);
	  });
	
	// Mail

	$('form').submit(function(e) {
		e.preventDefault();

		if(!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('fast');

			$('form').trigger('reset');
		});
		return false;
	});

	// Scroll, pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1200) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});


	$("a[href=#up]").click(function(){

        const _href = $(this).attr("href");

        $("html, body").animate({scrollTop: $(_href).offset().top+"px"}, {
			duration: 600,   // default «400» 
			easing: "linear" // default «swing» 
		});

        return false;
    });

	new WOW().init();
});