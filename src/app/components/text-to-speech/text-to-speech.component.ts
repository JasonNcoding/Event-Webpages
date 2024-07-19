import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent {
  socket: any;
  textInput: string = "";
  audioSource: string = "";
  isSpeechReady: boolean = false;

  constructor() {
    this.socket = io();
  }

  /**
   * Send request to backend socker
   */
  sendToServer() {
    this.isSpeechReady = false
    if (this.textInput) {
      this.socket.emit("textToSpeech", {
        textInput: this.textInput
      });
      this.waitForSpeech();
    }
  }

  /**
   * Wait for backend broadcast
   */
  waitForSpeech() {
    this.socket.on("textToSpeechOutput", (output: any) => {
      let rand = Math.floor(Math.random()*200);
      this.audioSource = `${output.file}?id=${rand}`;
      this.isSpeechReady = true;
    });
  }
}
