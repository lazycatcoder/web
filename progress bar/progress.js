$(function() {
  var $pb = $('.progress-bar'),
  percent = parseInt($pb.data('percent')),
  deg = 360 * percent / 100,
  isAnimating = false;
  $('#complete').hide();  
  $('.progress-bar').fadeIn();
  if (percent > 50) {
    $pb.addClass('next-part');
  }
  $('.progress-fill').css('transform','rotate('+ deg +'deg)');
  $('.percents span').html(percent+'%');

  $('#btn').click(function() {
    if (!isAnimating) {
      isAnimating = true;
      $('.percents-wrapper > span').css('color', '#eaee00'); 
      $('#complete').fadeOut();
      $('.progress-bar').fadeIn();
      $(this).hide();
      $pb.data('percent', 0);
      percent = 0;
      deg = 0;
      $pb.removeClass('next-part');
      $('.progress-fill').css('transform','rotate('+ deg +'deg)');
      $('.percents span').html(percent+'%');
      
      var interval = setInterval(function() {
        percent += 1;
        deg += 3.6;
        if (percent > 50) {
          $pb.addClass('next-part');
        }
        $('.progress-fill').css('transform','rotate('+ deg +'deg)');
        $('.percents span').html(percent+'%');
        if (percent >= 100) {
          clearInterval(interval);
          isAnimating = false;
          $('#complete').fadeIn(); 

          setTimeout(function() {
            $('#complete').fadeOut();
            percent = 0;
            deg = 0;
            $pb.removeClass('next-part');
            $('.progress-fill').css('transform','rotate('+ deg +'deg)');
            $('.percents span').html(percent+'%');
            $('.percents-wrapper > span').css('color', 'white').fadeIn();
            $pb.removeClass('next-part');
            $('#btn').fadeIn();
          }, 5000);
        }
      }, 50);
    }
  });
});