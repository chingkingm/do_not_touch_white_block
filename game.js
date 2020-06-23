/*
 * @Author: chingkingm
 * @Date: 2020-06-22 15:10:23
 * @LastEditTime: 2020-06-23 09:10:13
 * @FilePath: \多媒体教育与娱乐\大作业\code_file\game.js
 * @Description: 
 */ 
const c = document.getElementById('can');
const ctx = c.getContext('2d');
let t = 0;
let n = [0, 0, 0, 0];
let block_color = ['black', 'black', 'black', 'black'];
const block_height = [t, 240, 240, 240 - t];
const block_position_y = [0, t, t + 240, t + 480];
let flag_start = 0;//开始
let no_x = 0;
let no_y = 0;
let canvas_x = document.getElementById('div1').offsetLeft - 180;
let canvas_y = c.offsetTop + document.getElementById('div1').offsetTop;
function preload(){
    random_block();
    game();
    ctx.fillStyle='white';
    ctx.font='35px consolas';
    ctx.textAlign='center';
    ctx.fillText('Start', 120*n[3]+60, block_position_y[3]+120, 120);
}
window.onload = preload;
window.onresize = function(){
    //当窗口变化时重置参数。
    canvas_x = document.getElementById('div1').offsetLeft - 180;
    canvas_y = c.offsetTop + document.getElementById('div1').offsetTop;
};
function startGame(){
    t0 = setInterval(game, 5);
    flag_start = 1;
}
function showclick(ev){
    let x = ev.clientX - canvas_x;
    let y = ev.clientY - canvas_y;
    cal_no([x,y]);
    check_click();
}
function cal_no(po){
    if(po[0]<120){
        no_x = 0;
    }
    else if(po[0]>120&&po[0]<240){
        no_x = 1;
    }
    else{
        no_x = 2;
    }
}
function game(){
    draw_vertical();
    t++;
    if(t>240){
        t = 0;
        random_block();
        check_fail();
    }
    draw_horizontal();
    for (let i = 0;i<4;i++){
        draw_block(i,block_color[i]);
    }
}
function check_fail() { 
    if(block_color[3]=='black'){
        alert('fail');
        clearInterval(t0);
    }
 }
function check_click(){
    let str1 = block_color.join();
    let no = str1.lastIndexOf('b') / 6;
    switch(block_color[no]){
        case 'black':
            if(no_x == n[no]){
                block_color[no] = 'white';
            }
            break;
    }
} 
function draw_vertical() { 
    /*画竖线*/
    c.width = c.width;
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 720);
    ctx.moveTo(240, 0);
    ctx.lineTo(240, 720);
    ctx.stroke();
 }
function draw_horizontal() { 
    /*画横线*/
    for (let i = t; i < 720; i = i + 240) {
        ctx.moveTo(0, i);
        ctx.lineTo(360, i);
        ctx.stroke();
    }
 }
function draw_block(m,c){
    /*画黑块 */
    ctx.fillStyle= c ;
    /**第1行，height = t */
    /**第2行，height = 240 */
    /**第3行，height = 240 */
    /**第4行，height = 240 - t */
    ctx.fillRect(120 * n[m],block_position_y[m],120,block_height[m]);
}
function random_block() { 
    /*生成随机数，决定同一行哪一块黑 */
    if (flag_start == 0){
        for (let j = 0; j < 4; j++) {
            n[j] = Math.floor(Math.random() * 3);
        }
    }
    else{
        for (let k = 3;k > 0;k--){
            n[k] = n[k-1];
            block_color[k] = block_color[k-1];
        }
        n[0] = Math.floor(Math.random() * 3);
        block_color[0] = 'black';
    }
    return n;
}