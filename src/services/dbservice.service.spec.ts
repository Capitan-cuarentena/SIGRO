import { TestBed } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbserviceService } from './dbservice.service';

describe('DbserviceService', () => {
  let service: DbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
