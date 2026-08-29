import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';


export interface Course {

  _id?: string;

  title: string;

  description: string;

  instructor: string;

  price: number;

  duration: string;

  image?: string;
}


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl =
    'http://localhost:3000/courses';


  constructor(
    private http: HttpClient
  ) {}


  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token') || '';

    return new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });
  }


  getCourses():
    Observable<{ courses: Course[] }> {

    return this.http.get<{
      courses: Course[]
    }>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );
  }


  addCourse(
    course: Course
  ): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      course,
      {
        headers: this.getHeaders()
      }
    );
  }


  updateCourse(
    id: string,
    course: Course
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      course,
      {
        headers: this.getHeaders()
      }
    );
  }


  deleteCourse(
    id: string
  ): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }
}