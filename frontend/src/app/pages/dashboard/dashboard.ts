import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CourseService,
  Course
} from '../../services/course.service';

import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Footer
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {


  courses: Course[] = [];

  searchTerm: string = '';

  loading: boolean = false;


  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.loadCourses();

  }


  loadCourses(): void {

    this.loading = true;

    this.courseService
      .getCourses()
      .subscribe({

        next: (response) => {

          console.log(
            'Dashboard courses:',
            response
          );

          this.courses =
            response?.courses || [];

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Dashboard courses error:',
            error
          );

          this.courses = [];

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }


  searchCourses(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    if (!search) {

      this.loadCourses();

      return;

    }


    this.loading = true;


    this.courseService
      .getCourses()
      .subscribe({

        next: (response) => {

          const allCourses =
            response?.courses || [];


          this.courses =
            allCourses.filter(
              (course: Course) =>

                course.title
                  .toLowerCase()
                  .includes(search)

            );


          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Search error:',
            error
          );

          this.courses = [];

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }


  get totalCourses(): number {

    return this.courses.length;

  }

}