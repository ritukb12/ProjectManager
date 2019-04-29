import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import User from '../User';
import { mockProjects } from '../mockdata/Projects.mock'
import { ProjectService } from './project.service'
import { Observable } from 'rxjs/Rx';


describe('ProjectService', () => {
    
    let injector: TestBed;
    let projectService: ProjectService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [ProjectService]
        });
        injector = getTestBed();
        projectService = injector.get(ProjectService);
        httpMock = injector.get(HttpTestingController);
      });
      afterEach(() => {
        httpMock.verify();
      });

      it('Get Projects should return an Observable<Projects[]>', () => {    
        projectService.getAllProjects().subscribe(projects => {
          expect(projects.length).toBe(2);
          expect(projects).toEqual(mockProjects);
        });    
        const req = httpMock.expectOne(`${projectService.uri}/getallprojects`);
        expect(req.request.method).toBe("GET");
        req.flush(mockProjects);
      });



      it('Sort Projects should return an Observable<Projects[]>', () => {    
        projectService.sortdata('Project_name').subscribe(projects => {
          expect(projects.length).toBe(2);
          expect(projects).toEqual(mockProjects);
        });    
        const req = httpMock.expectOne(`${projectService.uri}/sortprojects/Project_name`);
        expect(req.request.method).toBe("GET");
        req.flush(mockProjects);
      });

      it('Suspend Project should return an Observable<Projects[]>', () => {    
        projectService.suspendProject(1).subscribe(projects => {
          expect(projects.length).toBe(2);
          expect(projects).toEqual(mockProjects);
        });    
        const req = httpMock.expectOne(`${projectService.uri}/suspendproject/1`);
        expect(req.request.method).toBe("POST");
        req.flush(mockProjects);
      });

      it('Update Project should return an Observable<Projects[]>', () => {    
        projectService.updateProject('abc','1','12-12-1985',
        '12-12-1985','50','1').subscribe(projects => {
          expect(projects.length).toBe(2);
          expect(projects).toEqual(mockProjects);
        });    
        const req = httpMock.expectOne(`${projectService.uri}/updateproject/1`);
        expect(req.request.method).toBe("POST");
        req.flush(mockProjects);
      });

});