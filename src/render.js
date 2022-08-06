//UPLOAD
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
document.getElementById('myFile').addEventListener('change', foo, false);
const videoElement = document.querySelector("video");
const fs = window.require('fs');
const path = require("path")
const clearall = document.getElementById("clear");
const open_file = document.getElementById("open");
const {shell} = require('electron')

clearall.onclick =clear_all;
open_file.onclick =open_folder;
async function open_folder(){
    let dir = path.join(__dirname, '..', 'temp_video');
    shell.openPath(dir)



}
async function clear_all(){
    let dir = path.join(__dirname, '..', 'temp_video');

    fs.readdir(dir, (err, files) => {
        if (err) 
            throw err;
        
        for (const file of files) {
            // console.log(file + ' : File Deleted Successfully.');
            fs.unlinkSync(path.join(dir, file));
        
        }

    });
}

videoElement.onended = function (e) {

    videoElement.pause();
    videoElement.removeAttribute('src'); // empty source
    videoElement.load();
    document
        .getElementById('myFile')
        .value = null

   

};

async function foo(event) {
    console.log(__dirname)
    console.log(event.target.files[0].path)
    let video_path_initial = event.target.files[0].path;

    let second_path = (Math.random() + 1)
        .toString(36)
        .substring(7);
    let output_path = path.join(__dirname,"..","temp_video/output" + second_path + ".mp4");
    await ffmpeg(video_path_initial)
        .videoCodec('libx264')
        .audioCodec('libmp3lame')
        .size('50%')
        .save(output_path)
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function () {
            console.log('Processing finished !');
            
            videoElement.src = path.join(__dirname,"..","temp_video/output" + second_path + ".mp4");
            videoElement.play();
        })

}