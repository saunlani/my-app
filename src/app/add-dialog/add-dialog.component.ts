import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  addForm : FormGroup;
  header: string;
  startDate = new FormControl(new Date('01/01/1900'));
  endDate = new FormControl(new Date('12/31/9999'));

  constructor (private data: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.data.currentHeader.subscribe(header => this.header = header)
    
    this.addForm = this.fb.group({
      tenantName: '',
      startDate: '',
      endDate: '',
      rootDomain: ''
    })

    // this.addForm.setValue({
    //   tenantName: 'Test',
    //   startDate: this.date,
    //   endDate: '',
    //   rootDomain: ''
    // });

    this.addForm.valueChanges.subscribe(console.log)
  }
  newHeader() {
    this.data.changeHeader("hello");
  }
}
