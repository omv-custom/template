        $(document).ready(function() {
            // Mobile menu toggle
            $('#mobile-menu-toggle').click(function() {
                $('#sidebar').toggleClass('active');
            });
            
            // Toggle sidebar on mobile
            $('.toggle-sidebar').click(function() {
                $('.sidebar').toggleClass('collapsed');
                $('.main-content').toggleClass('expanded');
            });

            // Ulepszone toggle submenu
            $('.menu-item > a').on('click', function(e) {
                if ($(this).siblings('.submenu').length) {
                    e.preventDefault();
                    var parent = $(this).parent();
                    var submenu = $(this).siblings('.submenu');
                    
                    // Zamknij wszystkie inne submenu
                    $('.menu-item').not(parent).removeClass('open');
                    $('.submenu').not(submenu).slideUp(200);
                    
                    // Przełącz obecne submenu
                    parent.toggleClass('open');
                    //submenu.slideToggle(200);
                }
            });

            // Inicjalizacja - otwórz aktywne menu
            $('.submenu-item.active').parents('.menu-item').addClass('open');
            $('.submenu-item.active').parents('.submenu').show();

            // Theme switcher
            $('#theme-toggle').change(function() {
                if ($(this).is(':checked')) {
                    $('body').attr('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    $('body').removeAttr('data-theme');
                    localStorage.setItem('theme', 'light');
                }
            });

            // Check for saved theme preference
            if (localStorage.getItem('theme') === 'dark') {
                $('#theme-toggle').prop('checked', true).trigger('change');
            }
            
             // Automatyczne ukrywanie menu na małych ekranach
            function handleResize() {
                if ($(window).width() <= 992) {
                    $('.sidebar').addClass('collapsed');
                    $('.main-content').addClass('expanded');
                } else {
                    $('.sidebar').removeClass('collapsed');
                    $('.main-content').removeClass('expanded');
                }
            }

            // Wywołaj przy ładowaniu i zmianie rozmiaru
            $(window).on('load resize', handleResize);

            // Simulate live data updates
            setInterval(function() {
                // Update CPU usage
                const cpuUsage = Math.floor(Math.random() * 20) + 60;
                $('.dashboard-card:nth-child(1) .progress').css('width', cpuUsage + '%');
                $('.dashboard-card:nth-child(1) .card-footer span:first').text(cpuUsage + '% Utilization');
                
                // Update CPU temperature
                const cpuTemp = Math.floor(Math.random() * 5) + 40;
                $('.dashboard-card:nth-child(1) .card-value').text(cpuTemp + '°C');
                
                // Update RAM usage
                const ramUsage = Math.floor(Math.random() * 15) + 70;
                $('.dashboard-card:nth-child(2) .progress').css('width', ramUsage + '%');
                $('.dashboard-card:nth-child(2) .card-footer span:first').text(ramUsage + '% of 16 GB');
                
                // Update free RAM
                const freeRam = (16 - (16 * ramUsage / 100)).toFixed(1);
                $('.dashboard-card:nth-child(2) .card-footer span:last').text(freeRam + ' GB free');
            }, 3000);
        });
        
	// Auto-lock after inactivity
	let inactivityTimer;
	const lockAfter = 300000; // 5 minutes (in milliseconds)

	function resetInactivityTimer() {
	    clearTimeout(inactivityTimer);
	    inactivityTimer = setTimeout(lockScreen, lockAfter);
	}

	function lockScreen() {
	    // In a real app, you would redirect to the lock screen
	    console.log('Screen locked due to inactivity');
	    // window.location.href = "screenlock.html";
	}

	// Set up event listeners for user activity
	['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
	    document.addEventListener(event, resetInactivityTimer);
	});

	// Start the timer when page loads
	resetInactivityTimer();

	// Manual lock function (can be called from other pages)
	window.lockScreen = function() {
	    window.location.href = "screenlock.html";
	};
        
 window.Dialog = {
    alert: function(title, message, callback) {
        const dialog = $('<div class="dialog-overlay active">' +
            '<div class="dialog">' +
            '<div class="dialog-header">' +
            `<h3 class="dialog-title">${title}</h3>` +
            '<button class="dialog-close">&times;</button>' +
            '</div>' +
            '<div class="dialog-body">' +
            `<p>${message}</p>` +
            '</div>' +
            '<div class="dialog-footer">' +
            '<button class="dialog-btn dialog-btn-primary dialog-ok-btn">OK</button>' +
            '</div>' +
            '</div>' +
            '</div>');
        
        $('body').append(dialog);
        
        dialog.find('.dialog-close, .dialog-ok-btn').click(function() {
            dialog.remove();
            if (callback) callback();
        });
        
        dialog.click(function(e) {
            if ($(e.target).hasClass('dialog-overlay')) {
                dialog.remove();
                if (callback) callback();
            }
        });
    },

    confirm: function(title, message, confirmCallback, cancelCallback) {
        const dialog = $('<div class="dialog-overlay active">' +
            '<div class="dialog">' +
            '<div class="dialog-header">' +
            `<h3 class="dialog-title">${title}</h3>` +
            '<button class="dialog-close">&times;</button>' +
            '</div>' +
            '<div class="dialog-body">' +
            `<p>${message}</p>` +
            '</div>' +
            '<div class="dialog-footer">' +
            '<button class="dialog-btn dialog-btn-secondary dialog-cancel-btn">Cancel</button>' +
            '<button class="dialog-btn dialog-btn-primary dialog-confirm-btn">Confirm</button>' +
            '</div>' +
            '</div>' +
            '</div>');
        
        $('body').append(dialog);
        
        dialog.find('.dialog-close, .dialog-cancel-btn').click(function() {
            dialog.remove();
            if (cancelCallback) cancelCallback();
        });
        
        dialog.find('.dialog-confirm-btn').click(function() {
            dialog.remove();
            if (confirmCallback) confirmCallback();
        });
        
        dialog.click(function(e) {
            if ($(e.target).hasClass('dialog-overlay')) {
                dialog.remove();
                if (cancelCallback) cancelCallback();
            }
        });
    }
};


function showCardLoading(cardElement) {
    $(cardElement).find('.card-loading-bar, .card-loading-content').show();
    $(cardElement).find('.card-header, .card-body, .card-footer').hide();
}

function hideCardLoading(cardElement) {
    $(cardElement).find('.card-loading-bar, .card-loading-content').hide();
    $(cardElement).find('.card-header, .card-body, .card-footer').show();
}

$(document).ready(function() {
    // Pokaż stan ładowania dla wszystkich kart
    $('.dashboard-card').each(function() {
        showCardLoading($(this));
    });
    
    // Symulacja ładowania danych - ukryj loader po 3 sekundach dla wszystkich kart
    setTimeout(function() {
        $('.dashboard-card').each(function() {
            hideCardLoading($(this));
        });
    }, 3000);
    
    // W rzeczywistej aplikacji użyj osobnych zapytań dla każdej karty:
    /*
    // Dla karty CPU
    fetchCpuData().then(function() {
        hideCardLoading($('.dashboard-card').eq(0));
    });
    
    // Dla karty RAM
    fetchRamData().then(function() {
        hideCardLoading($('.dashboard-card').eq(1));
    });
    
    // ... i tak dalej dla innych kart
    */
});
