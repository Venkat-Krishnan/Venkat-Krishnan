import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent implements OnInit {
  commentListObj:any = [];
  constructor(private b:BackendService){
    
  }
  ngOnInit(): void {
    this.startComments();
    this.user = this.b.currentUser.email;
  }

  async startComments(){
    this.commentListObj=[];
    let commentList = await this.b.getComment();
    if(commentList){
      this.commentListObj=commentList;
    }
  }

  comment:string = "";
  user:string = "";
  added:string = "";
  filterFlag:string = "Filter";

  async post(){
    this.added = "";
    let status:boolean = await this.b.addComment(this.comment);
    if(status){
      this.added = "Comment '" + this.comment+"' added successfully";
    }
    this.startComments();
  }

  async filter(){
    if(this.filterFlag=="Filter"){
      this.commentListObj = this.commentListObj.filter((val:any)=>{
        if(val && val.email == this.b.currentUser.email){
          return true;
        }else{
          return false;
        }
      });
      this.filterFlag="Remove Filter";
    }else{
      this.startComments();
      this.filterFlag="Filter";
    }
  }

}
