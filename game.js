/*
 * @Author: chingkingm
 * @Date: 2020-06-22 15:10:23
 * @LastEditTime: 2020-06-22 16:53:24
 * @FilePath: \多媒体教育与娱乐\大作业\code_file\game.js
 * @Description: 
 */ 
const c = document.getElementById('can');
const ctx = c.getContext('2d');
let t = 0;
let n = [0, 0, 0, 0];
let flag_start = 0;//开始
function preload(){
    random_block();
    game();
}
window.onload = preload();
function startGame(){
    let t0 = setInterval(game, 10);
    flag_start = 1;
}

function game(){
    draw_vertical();
    t++;
    if(t>240){
        t = 0;
        random_block();
    }
    draw_horizontal();
    draw_block();
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
function draw_block(){
    /*画黑块 */
    ctx.fillStyle='black';
    /**第1行，height = t */
    ctx.fillRect(120*n[0],240*0,120,t);
    /**第2行，height = 240 */
    ctx.fillRect(120*n[1],t,120,240);
    /**第3行，height = 240 */
    ctx.fillRect(120*n[2],t+240,120,240);
    /**第4行，height = 240 - t */
    ctx.fillRect(120*n[3],t+480,120,240-t);
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
        }
        n[0] = Math.floor(Math.random() * 3);
    }
    
    console.log(n);
    return n;
}