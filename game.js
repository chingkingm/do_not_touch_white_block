/*
 * @Author: chingkingm
 * @Date: 2020-06-22 15:10:23
 * @LastEditTime: 2020-06-23 15:46:25
 * @FilePath: \多媒体教育与娱乐\大作业\code_file\game.js
 * @Description: 
 */ 
const c = document.getElementById('can');
const ctx = c.getContext('2d');
let t = 0;
let speed = 1;
let n = [0, 0, 0, 0];
let block_color = ['black', 'black', 'black', 'black'];
let flag_pre = 0;
let flag_start = 0;//开始
let no_x = 0;
let no_y = 0;
let canvas_x = document.getElementById('div1').offsetLeft - 180;//180px是canvas元素宽度的一半
let canvas_y = c.offsetTop + document.getElementById('div1').offsetTop;
let score_c = 0;
let score_h = 0;
var vm = new Vue({
    el: '#div_f',
    data:{
        condition0: false,
        condition1: false,
        score: 0
    }
});
// var vm1 = new Vue({
//     el: '#span_new',
//     data: {
//         condition1: false
//     }
// });
function preload(){
    document.getElementById('div_ctx').addEventListener('click',showclick);
    c.style.cursor = 'pointer';
    random_block();
    flag_pre = 1;
    if (!(score_h = localStorage.getItem("score"))) {
        score_h = 0;
    }
    document.getElementById("score_h").innerText = score_h;
    game();
    ctx.fillStyle='white';
    ctx.font='35px consolas';
    ctx.textAlign='center';
    ctx.fillText('Start', 120*n[3]+60, 480+120, 120);
    ctx.fillStyle = 'black';
    flag_pre = 0;
}
window.onload = preload;
window.onresize = function(){
    //当窗口变化时重置参数。
    canvas_x = document.getElementById('div1').offsetLeft - 180;
    canvas_y = c.offsetTop + document.getElementById('div1').offsetTop;
};
function check_start(){
    if(no_y == 3 && no_x == n[3]){
        console.log('start');
        startGame();
    }
}
function startGame(){
    t0 = setInterval(game, 5);
    t1 = setInterval(higherspeed,15000);
    document.getElementsByTagName('audio')[0].play();
    flag_start = 1;
}
function higherspeed(){
    speed += 1;
}
function showclick(ev){
    let x = ev.clientX - canvas_x;
    let y = ev.clientY - canvas_y;
    cal_no([x,y]);
    check_click();
    if(flag_start==0){
        check_start();
    }
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
    if(po[1]<t){
        no_y = 0;
    }
    else if(po[1]>t && po[1] < t+240){
        no_y = 1;
    }
    else if(po[1]>t+240 && po[1]<t+480){
        no_y = 2;
    }
    else{
        no_y = 3;
    }
}
function cal_score(){
    score_c += 10;
    text = score_c;
    document.getElementById("score_c").innerText = score_c;
    if (!(score_h = localStorage.getItem("score"))) {
        score_h = 0;
    }
    if (score_c > score_h) {
        localStorage.setItem("score", score_h = score_c);
        // text += '新纪录！';
        vm.condition1 = true;
    }
    document.getElementById("score_h").innerText = score_h;
    vm.score = text;
}
function game(){
    c.width = c.width;
    draw_vertical();
    t+=speed;
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
        // alert('fail');
        console.log('游戏失败：触底。')
        // clearInterval(t0);
        // flag_start = 0;
        fail();
    }
 }
function check_click(){
    let str1 = block_color.join();
    let no = str1.lastIndexOf('b') / 6;
    switch(block_color[no]){
        case 'black':
            if(no_x == n[no] && no_y == no){
                block_color[no] = 'white';
                cal_score();
            }
            else{
                fail();
                console.log('游戏失败：点击白块。')
            }
            break;
    }
} 
function draw_vertical() { 
    /*画竖线*/
    // c.width = c.width;
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
    const block_height = [t, 240, 240, 240 - t];
    const block_position_y = [0, t, t + 240, t + 480];
    ctx.fillStyle= c ;
    /**第1行，height = t */
    /**第2行，height = 240 */
    /**第3行，height = 240 */
    /**第4行，height = 240 - t */
    if(flag_start == 1 || flag_pre == 1){
        ctx.fillRect(120 * n[m] + 1, block_position_y[m] + 1, 120 - 2, block_height[m] - 2);
    }
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
function fail(){
    clearInterval(t0);
    document.getElementsByTagName('audio')[0].pause();
    document.getElementsByTagName('audio')[0].currentTime = 0;
    document.getElementById('div_ctx').removeEventListener('click',showclick);
    c.style.cursor = 'not-allowed';
    c.width = c.width;
    for (let i = 0; i < 4; i++) {
        draw_block(i, block_color[i]);
    }
    draw_horizontal();
    draw_vertical();
    flag_start = 0;
    vm.condition0 = true;
}
function restart(){
    clearInterval(t0);
    clearInterval(t1);
    speed = 1;
    vm.condition0 = false;
    vm.condition1 = false;
    flag_start = 0;
    document.getElementsByTagName('audio')[0].pause();
    document.getElementsByTagName('audio')[0].currentTime = 0;
    t = 0;
    score_c = 0;
    document.getElementById("score_c").innerText = score_c;
    no_x = 0;
    no_y = 0;
    block_color = ['black', 'black', 'black', 'black'];
    preload();
}
    