//game.js
    'use strict'
    
    let rows = 26, 
        columns = 23, 
        pacmanX = 11, 
        pacmanY = 15, 
        score = 0,
        beans = 0,
        moveTghost,
        gameRunning = true,
        numOfGhosts = 0;
    
    for(let j = 0; j < rows; j++){
        
        
        for(let i=0; i<columns; i++){
            let xCoord = i;
            let yCoord = j; 
            let square = $('<div>').addClass('grid-square').attr('id', xCoord+'-'+yCoord);
            $('#grid-container').append(square);
    
        } //end inner loop
    }//end outer loop;
    
    let boxW = $('.grid-square').outerWidth(); 
    let boxH = $('.grid-square').outerHeight();
    
    $('#grid-container').css({width: boxW * columns, height:boxH * rows}) 
    
    $('#'+pacmanX+'-'+pacmanY).addClass('pacman');
    $('#0-0, #1-0, #2-0, #3-0, #4-0, #5-0, #6-0, #7-0, #8-0, #9-0, #10-0, #11-0, #12-0, #13-0, #14-0, #15-0, #16-0, #17-0, #18-0, #19-0, #20-0, #21-0, #22-0, #0-1, #11-1, #22-1, #0-2, #2-2, #3-2, #4-2, #6-2, #7-2, #8-2, #9-2, #11-2, #13-2, #14-2, #15-2, #16-2, #18-2, #19-2, #20-2, #22-2, #0-3, #2-3, #3-3, #4-3, #6-3, #7-3, #8-3, #9-3, #11-3, #13-3, #14-3, #15-3, #16-3, #18-3, #19-3, #20-3, #22-3, #0-4, #2-4, #3-4, #4-4, #6-4, #7-4, #8-4, #9-4, #11-4, #13-4, #14-4, #15-4, #16-4, #18-4, #19-4, #20-4, #22-4, #0-5, #22-5, #0-6, #2-6, #3-6, #4-6, #6-6, #7-6, #9-6, #10-6, #11-6, #12-6, #13-6, #15-6, #16-6, #18-6, #19-6, #20-6, #22-6, #0-7, #2-7, #3-7, #4-7, #6-7, #7-7, #9-7, #10-7, #11-7, #12-7, #13-7, #15-7, #16-7, #18-7, #19-7, #20-7, #22-7, #0-8, #6-8, #7-8, #10-8, #11-8, #12-8, #15-8, #16-8, #22-8, #0-9, #1-9, #2-9, #3-9, #4-9, #6-9, #8-9, #7-9, #10-9, #11-9, #12-9, #14-9, #15-9, #16-9, #18-9, #19-9, #20-9, #21-9, #22-9, #0-10, #1-10, #2-10, #3-10, #4-10, #6-10, #7-10, #8-10, #10-10, #11-10, #12-10, #14-10, #15-10, #16-10, #18-10, #19-10, #20-10, #21-10, #22-10, #0-11, #1-11, #2-11, #3-11, #4-11, #6-11, #7-11, #15-11, #16-11, #18-11, #19-11, #20-11, #21-11, #22-11, #0-12, #1-12, #2-12, #3-12, #4-12, #6-12, #7-12, #9-12, #10-12, #12-12, #13-12,#15-12, #16-12, #18-12, #19-12, #20-12, #21-12, #22-12, #9-13, #13-13, #0-14, #1-14, #2-14, #3-14, #4-14, #6-14, #7-14, #9-14, #10-14, #11-14, #12-14, #13-14, #15-14, #16-14, #18-14, #19-14, #20-14, #21-14, #22-14, #0-15, #1-15, #2-15, #3-15, #4-15, #6-15, #7-15,#15-15, #16-15, #18-15, #19-15, #20-15, #21-15, #22-15, #0-16, #1-16, #2-16, #3-16, #4-16, #6-16, #7-16, #9-16, #10-16, #11-16, #12-16, #13-16, #15-16, #16-16, #18-16, #19-16, #20-16, #21-16, #22-16, #0-17, #1-17, #2-17, #3-17, #4-17, #6-17, #7-17, #9-17, #10-17, #11-17, #12-17, #13-17, #15-17, #16-17, #18-17, #19-17, #20-17, #21-17, #22-17, #0-18, #6-18, #7-18, #10-18, #11-18, #12-18, #15-18, #16-18, #22-18, #0-19, #2-19, #3-19, #4-19, #5-19, #5-19, #6-19, #7-19, #8-19, #10-19, #11-19, #12-19, #14-19, #15-19, #16-19, #17-19, #18-19, #19-19, #20-19,#22-19, #0-20, #2-20, #3-20, #4-20, #5-20, #5-20, #6-20, #7-20, #8-20, #10-20, #11-20, #12-20, #14-20, #15-20, #16-20, #17-20, #18-20, #19-20,#20-20, #22-20, #0-21, #10-21, #11-21, #12-21, #22-21, #0-22, #1-22, #2-22, #4-22, #5-22, #17-22, #18-22, #20-22, #21-22, #22-22, #0-23, #1-23, #2-23, #4-23, #5-23, #6-23, #7-23, #8-23, #9-23, #10-23, #11-23, #12-23, #13-23, #14-23, #15-23, #16-23, #17-23, #18-23, #20-23, #21-23, #22-23,#22-24, #0-25, #1-25, #2-25, #3-25, #4-25, #5-25, #6-25, #7-25, #8-25, #9-25, #10-25, #11-25, #12-25, #13-25, #14-25,#15-25, #16-25, #17-25, #18-25, #19-25, #20-25, #21-25, #22-25, #0-24').addClass('wall');
    
    let redGCoords = '#12-13'
    let greenGCoords = '#11-12'
    let blueGCoords = '#10-13'
    let pinkGCoords = '#11-13'

    $(greenGCoords+','+blueGCoords+','+pinkGCoords+','+redGCoords).addClass('ghost');
    $(greenGCoords).addClass('green start'); 
    $(blueGCoords).addClass('blue start');
    $(pinkGCoords).addClass('pink start');
    $(redGCoords).addClass('red start');

    
    $('#1-1, #3-1,#4-1,#5-1,#6-1,#7-1,#8-1,#9-1,#10-1,#12-1,#13-1,#14-1,#15-1,#16-1,#17-1,#18-1,#19-1,#21-1,#1-2,#5-2,#10-2,#12-2,#17-2,#21-2, #1-3,#5-3,#10-3,#12-3,#17-3,#21-3, #1-4,#5-4,#10-4,#12-4, #17-4,#21-4, #1-5,#2-5,#3-5,#4-5,#5-5,#6-5,#7-5,#8-5,#9-5,#10-5,#11-5,#12-5,#13-5,#14-5,#15-5,#16-5,#17-5,#18-5,#19-5,#20-5,#21-5, #1-6,#5-6,#8-6,#14-6,#17-6,#21-6, #1-7,#5-7,#8-7,#14-7,#17-7,#21-7, #1-8,#2-8,#3-8,#4-8,#5-8,#8-8,#9-8,#13-8,#14-8,#17-8,#18-8,#19-8,#20-8,#21-8, #5-9,#9-9,#13-9,#17-9, #5-10,#9-10,#13-10,#17-10, #5-11,#8-11,#9-11,#10-11,#11-11,#12-11,#14-11, #13-11,#17-11, #5-12,#8-12,#14-12,#17-12, #1-13,#2-13,#3-13,#4-13,#5-13,#6-13,#7-13,#8-13,#14-13,#15-13,#16-13,#17-13,#18-13,#19-13,#20-13,#21-13, #5-14,#8-14,#14-14,#17-14, #5-15,#8-15,#9-15,#10-15,#12-15,#13-15,#14-15,#17-15, #5-16,#8-16,#14-16,#17-16, #5-17,#8-17,#14-17,#17-17, #1-18,#2-18,#3-18,#4-18,#5-18,#8-18,#9-18,#13-18,#14-18,#17-18,#18-18,#19-18,#20-18,#21-18, #1-19,#9-19,#13-19,#21-19, #1-20,#9-20,#13-20,#21-20, #1-21,#2-21,#3-21,#4-21,#5-21,#6-21,#7-21,#8-21,#9-21,#13-21,#14-21,#15-21,#16-21,#17-21,#18-21,#19-21,#20-21,#21-21, #3-22,#6-22,#7-22,#8-22,#9-22,#10-22,#11-22,#12-22,#13-22,#14-22,#15-22,#16-22,#19-22, #3-23,#19-23, #1-24,#3-24,#4-24,#5-24,#6-24,#7-24,#8-24,#9-24,#10-24,#11-24,#12-24,#13-24,#14-24,#15-24,#16-24,#17-24,#18-24,#19-24, #0-13, #22-13, #2-24, #20-24, #2-1, #20-1, #21-24').addClass('beans');
    
    $('#1-3, #21-3, #1-21, #21-21').addClass('power');
    
    //end setup
    
    $(document).keydown( function(e){
        if(gameRunning == true){

        let tempX = pacmanX, 
            tempY = pacmanY;
    //like the boundaries from dragonflight we need to check the value of the square the pacman is moving into before we move the pacman into it so we store the temp value of the potential x-y coordinate.
    
        if(e.which == 38){
            //move up
            tempY = tempY-1;
            /*other examples:
            tempY-=1
            tempY--
            */
        }
    
        if(e.which == 40){
            //move down
            tempY = tempY+1;
        }
    
        if(e.which == 37){
            //move left
            tempX = tempX-1;
        }
    
        if(e.which == 39){
            //move right
            tempX = tempX+1;
        }
        let update = false;
    
        if(tempX == 23 && tempY == 13 ){
            //.passthrough
            tempX = 0;
            update = true;
            if($('#'+tempX+'-'+tempY).hasClass('beans')){
                score+=50;
                $('#'+tempX+'-'+tempY).removeClass('beans')
            }
        }else if(tempX == -1 && tempY == 13 ){
        //other passthrough         
            tempX = 22;
            update = true;
            if($('#'+tempX+'-'+tempY).hasClass('beans')){
                score+=50;
                $('#'+tempX+'-'+tempY).removeClass('beans')
            }
        }else if($('#'+tempX+'-'+tempY).hasClass('ghosty')){
            console.log('player gets to eats ghost. returns to start position')
            update = true;
            
            let color = '';
            //think about a more elegent solution....

            if($('#'+tempX+'-'+tempY).hasClass('pink')){
                color = 'pink'
            }
            if($('#'+tempX+'-'+tempY).hasClass('blue')){
                color = 'blue'
            }
            if($('#'+tempX+'-'+tempY).hasClass('green')){
                color = 'green'
            }
            if($('#'+tempX+'-'+tempY).hasClass('red')){
                color = 'red'
            }



            console.log($('#'+tempX+'-'+tempY).attr('class'))
            $('#'+tempX+'-'+tempY).removeClass('ghost ghosty');
            score+=300;

            let pos = $('#'+tempX+'-'+tempY).position();
            genFloatGhost(pos.top, pos.left, color)

        }else if($('#'+tempX+'-'+tempY).hasClass('ghost')){
            //player has run into ghost
            console.log('has made contact with ghost');
            gameOver();
            return false; //exits the function
    
        }else if(tempY < 0 || tempX < 0 || tempY > rows -1 || tempX > columns-1 || $('#'+tempX+'-'+tempY).hasClass('wall') ){
            //illegal squares. do nothing except.... //passthrough:21-13, 22-13 if column is added 0-13
        
        }else{
            update = true;
    
            if($('#'+tempX+'-'+tempY).hasClass('power')){
                $('#'+tempX+'-'+tempY).removeClass('power');
                score+=100;
                //make ghosts turn ghosty...
                getGhosts();

    
                $('.score span').text(score);
                //have all power been gathered up?
                
            }
            if($('#'+tempX+'-'+tempY).hasClass('beans')){
                $('#'+tempX+'-'+tempY).removeClass('beans');
                score+=50;
                
                $('.score span').text(score);   
            }
    
        }
    
        if($('.power').length < 1 && $('.beans').length < 1 ){
            gameOver('win');
        }
    
            if(update){
                
                        pacmanX = tempX;
                        pacmanY = tempY;
    
            }
    
            $('.grid-square').removeClass('pacman');
            $('#'+pacmanX+'-'+pacmanY).addClass('pacman');
    
            

            }else{
                //gameRunning not true
                if(e.which == 27 ){
                    //esc key has been pressed
                 $('.overlay').trigger('click');   
                 //acts as if we clicked on the overlay which closes the modal window
                }

            } 
    
    }); //end keydown
    
    
    
        function moveghost(){
            let ghostX,
                ghostY;
    
            $('.ghost').each( function(){
                
                let ghost = $(this);
                let ghostClasses = ghost.attr('class');
                ghostClasses = ghostClasses.replace('grid-square', '')
                ghostClasses = ghostClasses.replace('beans', '')
                ghostClasses = ghostClasses.replace('power', '')
                ghostClasses = ghostClasses.replace('start', '')
        
                let ghostId = ghost.attr('id'); 
                ghostId = ghostId.split('-');
                ghostX = ghostId[0]*1; 
                ghostY = ghostId[1]*1;
                let dir = getRandomInt(1,4);
    
                let eTempX = ghostX; 
                let eTempY = ghostY; 
    
                if(dir == 1){
                    //up
                    eTempY--;
                }
    
                if(dir == 2){
                    //down
                    eTempY++;
                }
                if(dir == 4){
                    //left
                    eTempX--;
                }
    
                if(dir == 3){
                    //right
                    eTempX++;
                }
    
                //check if new square is illegal for ghost
                if( eTempY < 0 || eTempX < 0 || eTempX > columns-1 || eTempY > rows-1 || $('#'+eTempX+'-'+eTempY).hasClass('wall') || $('#'+eTempX+'-'+eTempY).hasClass('ghost')){
                    //ghost cannot move.

                    //need to find open square: dir 1 is up, dir 2 is down, dir 3 right, dir 4 is left
    
                }else if($('#'+eTempX+'-'+eTempY).hasClass('pacman') && !(ghost.hasClass('ghosty'))){
                    console.log ('regular ghost has hit pacman')
                    gameOver();
                }else{

                    if(ghost.hasClass('ghosty') && $('#'+eTempX+'-'+eTempY).hasClass('pacman') ){
                        console.log('ghost moved into PacMan')
                        let color = '';
                        //think about a more elegent solution....

                        if(ghost.hasClass('pink')){
                            color = 'pink'
                        }
                        if(ghost.hasClass('blue')){
                            color = 'blue'
                        }
                        if(ghost.hasClass('green')){
                            color = 'green'
                        }
                        if(ghost.hasClass('red')){
                            color = 'red'
                        }

                        console.log(ghost.attr('class'))
                        ghost.removeClass('ghost ghosty '+color);
                        score+=300;

                        let pos = ghost.position();
                        genFloatGhost(pos.top, pos.left, color)


                    }else{
                    $('#'+ghostX+'-'+ghostY).removeClass(ghostClasses);
                    ghostX = eTempX;
                    ghostY = eTempY;
                    $('#'+ghostX+'-'+ghostY).addClass(ghostClasses);    
                    }


                }
    
            })
    
            moveTghost = setTimeout(moveghost, 200)
    
        } //end moveghost

    
    function gameOver(result = 'lose'){
        gameRunning = false;
    //result will specify if win or lose, lose is default
        clearTimeout(moveTghost);
        let message = '';
        console.log(result);
    
        if(result == 'win'){
            message = '<h2>You Win!!!</h2>';
        }else{
            message = '<h2>You Lose.</h2>'
        }
        console.log(message);
        $('#grid-container').html(message); //empties the grid of its squares and inserts the html from message instead
        $('#grid-container').append('<div class="option button">Click here to log your score!</div>');
        $('.option').click(function() {
                  //open modal window. Because the button did not exist on this page until now, we have to write the evend listener on that button here. Where since our modal window already existed, we can write event listeners for it outside of this function and in its own JS function
                $('.overlay, .modal').addClass('active');
                $('input[name="score"]').val(score) 
                 
        });
    }   
    
    function getRandomInt(min = 1, max = 100){
        return Math.floor(Math.random() * (max - min + 1 ) + min);
    }
    
    moveghost();

    function getGhosts(){
        //turns the ghosts into things pacman can eat.
        $('.ghost').addClass('ghosty');
        setTimeout( function(){
            $('.ghosty').removeClass('ghosty');
        },10000)
    }

let pendingColors = []; //stores colors of ghosts that have not yet respawned?

    function genFloatGhost(top = 1, left = 1, color = ''){
        let floaty = $('<div>').addClass('floaty').html('<div class="inside">').css({top:top, left:left})
        $('body').append(floaty);
        let gCoords = '';

        switch(color){
            case 'pink':
            gCoords = pinkGCoords;
            break;
            case 'blue':
            gCoords = blueGCoords;
            break;

            case 'green':
            gCoords = greenGCoords;
            break;
            case 'red':
            gCoords = redGCoords;
            break;
        }

        let aniTop = $(gCoords).position().top;
        let aniLeft = $(gCoords).position().left;
        console.log(aniTop, aniLeft)
        $(floaty).animate({top:aniTop-11, left:aniLeft-5}, 500, function(){
            $(floaty).remove(); //need to replace proper ghost in the coordinate square.
            $('.'+color).removeClass(color); //taken care of in previous function
            if($(gCoords).hasClass('ghost')){
                console.log('original not okay')
                let inserted = false
                $('.start').each( function(){
                    //scan the start spaces, put the ghost into the first item in source order.
                    let space = $(this);
                    if(!(space.hasClass('ghost'))&& !inserted){
                        //there are 4 start spaces. If the original does not get inserted, then this scans all the spaces with the class of start. Checks to see if there is a ghost in it. the nature of each is that it does this for each one. We need a way to check if this had already been done the inserted variable makes sure that this only gets done once and not three times... imagine getting 3 more ghosts.... lol
                        console.log('scanning...')
                        inserted = true;
                        space.addClass(color + ' ghost') 
                        console.log(space.attr('id'))
                    }

            })

           }else{
            console.log('coords okay')
            $(gCoords).addClass(color + ' ghost')               
           }

            
        });
    }
/* 
TODO: 
create function to add cherry and have it follow a path... 
refactor the movement checks and see if we can put them into one function
*/

//function for event listeners on the modal window:
$('.overlay').click(function(){
    $('.overlay, .modal').removeClass('active');
})
