jQuery(document).ready(function($) {

  var c = $('#canvas');
  var ctx = c[0].getContext('2d');
  var pen = $('aside img').eq(0);
  var eraser = $('aside img').eq(1);
  var clear = $('aside button').eq(0);
  var isDrawing = false;
  var isPen = true;
  var x0,y0;

  pen.click(function() {
    if (eraser.hasClass('highlight')) {
      c.removeClass('eraser');
      c.addClass('pen');
      pen.toggleClass('highlight');
      eraser.toggleClass('highlight');
      isPen = true;
    }
  });
  eraser.click(function() {
    if (pen.hasClass('highlight')) {
      c.removeClass('pen');
      c.addClass('eraser');
      pen.toggleClass('highlight');
      eraser.toggleClass('highlight');
      isPen = false;
    }
  });
  clear.click(function() {
    ctx.clearRect(0,0,c[0].width,c[0].height);
  });

  c.mousedown(function(event) {
    x0 = event.clientX - c.offset().left;
    y0 = event.clientY - c.offset().top;
    if (isPen == true) {
      ctx.strokeStyle = $('input').val();
      ctx.lineWidth = 3;
    } else {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 10;
    }
    isDrawing = true;
  });
  c.mouseup(function() {
    isDrawing = false;
    ctx.closePath();
  });
  c.mouseleave(function() {
    isDrawing = false;
    ctx.closePath();
  });
  c.mousemove(function(event) {
    if (isDrawing) {
      var x1 = event.clientX - c.offset().left;
      var y1 = event.clientY - c.offset().top;
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.lineTo(x1,y1);
      ctx.stroke();

      x0 = x1;
      y0 = y1;
    }
  });


});