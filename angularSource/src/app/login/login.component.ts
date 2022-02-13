import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentView:string = "login";
  repass:string = "";
  password:string ="";
  email:string = "";
  secret:string = "";

  constructor(private r:Router, private b:BackendService) { }

  ngOnInit(): void {
  }

  clearOthers(){
    console.log(this.email,this.password,this.repass,this.secret);
    this.password = "";
    this.repass = "";
    this.secret = "";
  }

  async login(){
    let canLogin = true;
    if(this.email.trim()=="" && canLogin){alert("Email is empyt"); canLogin=false;}
    if(this.password.trim()=="" && canLogin){alert("Password is empyt"); canLogin=false;}
    if(canLogin){
      let status = await this.b.checkLogin(this.email,this.password);
      if(status){this.r.navigate(["comment"]);}
      this.clearOthers();
    }
  }
  

  async signup(){
    let canGo = true;
    if(this.email.trim()=="" && canGo){alert("Email is empyt"); canGo=false;}
    if(this.password.trim()=="" && canGo){alert("Password is empyt"); canGo=false;}
    if(this.repass.trim()=="" && canGo){alert("Re-Password is empyt"); canGo=false;}
    if(this.secret.trim()=="" && canGo){alert("secret message is empyt"); canGo=false;}
    if(canGo){
      if(this.password==this.repass){
        await this.b.addUser(this.email,this.password,this.secret);
        this.clearOthers();
        this.currentView = "login";
      }else{
        alert("Password dosnt match");
      }
    }
  }

  async forgotpass(){
    let canGo = true;
    if(this.email.trim()=="" && canGo){alert("Email is empyt"); canGo=false;}
    if(this.secret.trim()=="" && canGo){alert("secret message is empyt"); canGo=false;}
    if(canGo){
      let staus:boolean = await this.b.checkSecret(this.email,this.secret);
      if(staus){
        this.clearOthers();
        this.currentView = "reset";
      }
    }
  }
  
  async resetpass(){
    let canGo = true;
    if(this.password.trim()=="" && canGo){alert("password is empyt"); canGo=false;}
    if(this.repass.trim()=="" && canGo){alert("Re-password is empyt"); canGo=false;}
    if(canGo){
      if(this.password==this.repass){
        let status:boolean = await this.b.restpass(this.password);
        if(status){
          this.clearOthers();
          this.r.navigate(["comment"]);
        }
      }else{
        alert("Password dosnt match");
      }
    }
  }
}
