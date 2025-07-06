// src/app/home/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode'; // You might need to install this: npm install jwt-decode

// Define an interface for the JWT payload to get strong typing
interface UserPayload {
  user: {
    id: string;
    role: 'student' | 'professor';
  };
  // The 'email' might not be in the payload depending on your backend JWT creation.
  // We'll decode it manually for this example.
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false, // This is the default behavior, so you can omit it
})
export class DashboardComponent implements OnInit {
  
  // Property to hold the decoded user information
  userPayload: UserPayload | null = null;
  userEmail: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        // Decode the token to get payload
        this.userPayload = jwtDecode<UserPayload>(token);
        // The standard JWT payload has an 'email' field if you added it on the backend
        const decoded: any = jwtDecode(token);
        this.userEmail = decoded.email || 'User'; // Fallback to 'User'
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle error, maybe log out user
        this.authService.logout();
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}