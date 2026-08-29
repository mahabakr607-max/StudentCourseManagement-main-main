import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnrolledCourse {
  enrollmentId: string;

  course: {
    _id: string;
    title: string;
    description: string;
    instructor: string;
    price: number;
    duration: string;
    image?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl =
    'http://localhost:3000/enrollments';

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }

  enroll(courseId: string): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      {
        courseId
      },
      {
        headers: this.getHeaders()
      }
    );

  }

  getMyCourses():
    Observable<{ courses: EnrolledCourse[] }> {

    return this.http.get<{
      courses: EnrolledCourse[]
    }>(
      `${this.apiUrl}/my-courses`,
      {
        headers: this.getHeaders()
      }
    );

  }

  cancelEnrollment(
    enrollmentId: string
  ): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${enrollmentId}`,
      {
        headers: this.getHeaders()
      }
    );

  }

}