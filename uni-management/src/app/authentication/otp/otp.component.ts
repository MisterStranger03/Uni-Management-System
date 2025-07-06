import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
  standalone: false, // This is the default behavior, so you can omit it
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;
  userEmail: string | null = null;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // To read the email from the URL
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    // Get the email from the route parameters
    this.userEmail = this.route.snapshot.paramMap.get('email');
    if (!this.userEmail) {
      // If no email is present, something is wrong. Go back to signup.
      this.router.navigate(['/authentication/signup']);
    }

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.otpForm.invalid || !this.userEmail) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    try {
      const payload = {
        email: this.userEmail,
        otp: this.otpForm.value.otp
      };
      const response = await this.profileService.verifyOtp(payload);
      this.successMessage = response.message;

      // Redirect to login after successful verification
      setTimeout(() => this.router.navigate(['/authentication/login']), 2000);

    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Verification failed.';
    } finally {
      this.isLoading = false;
    }
  }
}