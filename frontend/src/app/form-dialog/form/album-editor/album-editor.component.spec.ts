import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumEditorComponent } from './album-editor.component';

describe('AlbumEditorComponent', () => {
  let component: AlbumEditorComponent;
  let fixture: ComponentFixture<AlbumEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
