import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumInfoEditorComponent } from './album-info-editor.component';

describe('AlbumInfoEditorComponent', () => {
  let component: AlbumInfoEditorComponent;
  let fixture: ComponentFixture<AlbumInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumInfoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
