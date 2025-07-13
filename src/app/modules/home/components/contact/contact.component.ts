import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  isLoading = false;

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;

      this.isSubmitted = true;
      // this.homeService.contactMe(this.contactForm.value).subscribe(
      //   (response: any) => {
      //     console.log('Contact form submitted:', response);
      //     this.toast.success('Contact Submitted Successfully');
      //     this.contactForm.reset();
      //     this.isSubmitted = true;
      //     this.isLoading = false;
      //   }
      //   // (error) => {
      //   //   console.error('Error submitting form:', error);
      //   //   const errorMsg =
      //   //     error?.error?.errors?.message?.message || error?.error?.message;
      //   //   this.toast.error(errorMsg);
      //   //   this.isSubmitted = false;
      //   //   this.isLoading = false;
      //   // }
      // );
    }
  }
}
