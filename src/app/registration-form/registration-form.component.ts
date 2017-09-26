import { Component, OnInit, ChangeDetectorRef, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { User, Contact } from './user';
import { StudentService } from './userdata.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  private bsize: any;
  private asize: any;
  private imageBackend: string;
  private imageLocal: string;
  private spinner: number = 0;
  private model: User;
  public contacts: Array<Contact>;
  private uploader: string = "1";
  private length : number;

  private nativeElement: Node;

  regTypeSelectedOption: string = "";
  selectedNav: any;
  navs = ['Home address', 'Company address'];
  @ViewChild('input') input: ElementRef
  @ViewChild('interests') interests: ElementRef

  path = '';
  public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];
  private n: number;
  constructor(private changeDetectorRef: ChangeDetectorRef, private studata: StudentService, private el: ElementRef) {

    this.nativeElement = el.nativeElement
    this.contacts = [];
  }
  ngOnInit() {
    this.model = new User();
    this.selectedNav = 'select value';
    this.model.age = 33
  }

  upload() {
    this.model.userImg = "";
    this.uploader = "1";
    this.input.nativeElement.click();
  }

  reUpload() {
    this.uploader = "0";
  }

  addContact(name) {
    this.model.interests.push(name)
    this.interests.nativeElement.value="";
    console.log("interests", this.model.interests)
  }

  removeContact(contact) {
    let index = this.model.interests.indexOf(contact);
    this.model.interests.splice(index, 1);
  }

  plainValueChanged(event, container: any) {
    var el = this.getElement(container);
    // el.innerText = event.startValue;
  }

  setNav(nav: any) {
    this.selectedNav = nav;
    if (this.selectedNav == "Home address") {
      this.regTypeSelectedOption = "Home address";
    }
    else if (this.selectedNav == "Company address") {
      this.regTypeSelectedOption = "Company address";
    }
  }

  getElement(data) {
    if (typeof (data) == 'string') {
      return document.getElementById(data);
    }
    if (typeof (data) == 'object' && data instanceof Element) {
      return data;
    }
    return null;
  }

  fun() {

    console.log("sree")

  }

  fileChange(input) {
    this.file_srcs = new Array;
    this.spinner = 1;
    this.readFiles(input.files);
    console.log("input called")
  }
  readFile(file, reader, callback) {
    console.log("readfile beg called")
    reader.onload = () => {
      callback(reader.result);
      this.model.userImg = reader.result;
      this.asize = this.model.userImg;
      console.log("read file end:");
    }
    reader.readAsDataURL(file);
  }
  readFiles(files, index = 0) {
    console.log("read files called")
    // Create the file reader  
    let reader = new FileReader();
    // If there is a file  
    if (index in files) {
      // Start reading this file  
      this.readFile(files[index], reader, (result) => {
        // Create an img element and add the image file data to it  
        var img = document.createElement("img");
        img.src = result;
        this.bsize = img.src

        this.resize(img, 250, 250, (resized_jpeg, before, after) => {
          // For debugging (size in bytes before and after)  
          this.debug_size_before.push(before);
          this.debug_size_after.push(after);
          // Add the resized jpeg img source to a list for preview  
          // This is also the file you want to upload. (either as a  
          // base64 string or img.src = resized_jpeg if you prefer a file).  
          this.file_srcs.push(resized_jpeg);
          this.model.userImg = this.file_srcs[0];
          // console.log("user image",this.model.userImg)
          // this.model.userImg.push(resized_jpeg);
          // Read the next file;  
          this.readFiles(files, index + 1);
        });
      });
    } else {
      // When all files are done This forces a change detection  
      this.changeDetectorRef.detectChanges();
      console.log("else called")
      this.spinner = 0;
    }
  }
  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
    console.log("resize called")
    // This will wait until the img is loaded before calling this function  
    return img.onload = () => {
      // Get the images current width and height  
      var width = img.width;
      var height = img.height;
      // Set the WxH to fit the Max values (but maintain proportions)  
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      // create a canvas object  
      var canvas = document.createElement("canvas");
      // Set the canvas to the new calculated dimensions  
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      // Get this encoded as a jpeg  
      // IMPORTANT: 'jpeg' NOT 'jpg'  
      var dataUrl = canvas.toDataURL('image/jpeg');
      // callback with the results  
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }
  studentSubmit() {
    console.log(this.model)
    if (this.model.subscribe == true) {
      this.model.subscribeDesc = ". And please send me the news letters"
    } else {
      this.model.subscribeDesc = "";
    }
    console.log("age", this.model.age)
    if (this.model.age == 0) {
      this.model.ageRange = "above 13 years"
    } else if (this.model.age == 33) {
      this.model.ageRange = "above 20 years"
    } else if (this.model.age == 66) {
      this.model.ageRange = "above 30 years"
    } else if (this.model.age == 99) {
      this.model.ageRange = "above 45 years"
    }
console.log("age desc", this.model.ageRange)
if(this.model.interests.length == 0){
  console.log("interests nil");
} 
this.length = this.model.interests.length
  }


  alert() {
    alert("Registration successful");
  }

}
