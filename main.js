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
