import { Component } from '@angular/core';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {
  translateInput: string = "";
  targetLanguage: string = "";
  textTranslate: string = "";
  finalTargetLanguage: string = "";
  translateOutput: string = "";

 
  socket: any;


  constructor() {
    this.socket = io();
    this.serverTranslate();
  }

  serverTranslate() {
    if (this.translateInput != "" && this.targetLanguage != "") {
      this.socket.emit("translator", { 
        translateInput: this.translateInput, 
        targetLanguage: this.targetLanguage
      }) 
      this.socket.on("translationOutput", (translateOutput:any) => {
        this.textTranslate = this.translateInput
        this.finalTargetLanguage = this.targetLanguage + " ("+ translateOutput.finalTargetLanguage + ")"
        this.translateOutput = translateOutput.translateOutput[0];
      })
    } else {
      this.translateOutput = ""
    } 
    
  }
}
